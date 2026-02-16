import React, { useMemo, useState } from "react";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { DataTable } from "../components/ui/DataTable";
import type { Column } from "../components/ui/DataTable";
import { clients, tasks } from "../data/mock";
import type { Task, TaskStatus } from "../types";
import toast from "react-hot-toast";

type ViewMode = "table" | "kanban";

function statusVariant(s: TaskStatus) {
  if (s === "Done") return "success";
  if (s === "In Progress") return "warning";
  if (s === "Blocked") return "danger";
  return "default";
}

export function Tasks() {
  const [view, setView] = useState<ViewMode>("table");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return tasks;
    return tasks.filter((x) => x.title.toLowerCase().includes(t));
  }, [q]);

  const columns: Column<Task>[] = [
    {
      key: "title",
      header: "Task",
      render: (t) => (
        <div className="font-medium text-text dark:text-textDark">
          {t.title}
        </div>
      ),
      sortValue: (t) => t.title
    },
    {
      key: "client",
      header: "Client",
      render: (t) => {
        const c = clients.find((c) => c.id === t.clientId);
        return (
          <span className="text-muted dark:text-mutedDark">
            {c?.name ?? "—"}
          </span>
        );
      },
      sortValue: (t) => clients.find((c) => c.id === t.clientId)?.name ?? ""
    },
    {
      key: "status",
      header: "Status",
      render: (t) => (
        <Badge variant={statusVariant(t.status) as any}>
          {t.status}
        </Badge>
      ),
      sortValue: (t) => t.status
    },
    {
      key: "priority",
      header: "Priority",
      render: (t) => (
        <span className="text-muted dark:text-mutedDark">
          {t.priority}
        </span>
      ),
      sortValue: (t) => t.priority
    },
    {
      key: "due",
      header: "Due",
      render: (t) => (
        <span className="text-muted dark:text-mutedDark">
          {t.dueDate}
        </span>
      ),
      sortValue: (t) => t.dueDate
    }
  ];

  const lanes: TaskStatus[] = ["Todo", "In Progress", "Blocked", "Done"];
  const laneTasks = (s: TaskStatus) => filtered.filter((t) => t.status === s);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xl font-semibold text-text dark:text-textDark">
            Tasks
          </div>
          <div className="text-xs text-muted mt-1 dark:text-mutedDark">
            Table + Kanban view toggle
          </div>
        </div>

        <div className="flex gap-2">
          <button
            className={[
              "px-3 py-2 rounded-xl border text-sm transition",
              view === "table"
                ? "bg-accent/20 border-accent/30"
                : "bg-surface/40 border-border hover:bg-white/5 dark:bg-surfaceDark/40 dark:border-borderDark dark:hover:bg-white/[0.04]"
            ].join(" ")}
            onClick={() => setView("table")}
          >
            Table
          </button>

          <button
            className={[
              "px-3 py-2 rounded-xl border text-sm transition",
              view === "kanban"
                ? "bg-accent/20 border-accent/30"
                : "bg-surface/40 border-border hover:bg-white/5 dark:bg-surfaceDark/40 dark:border-borderDark dark:hover:bg-white/[0.04]"
            ].join(" ")}
            onClick={() => setView("kanban")}
          >
            Kanban
          </button>

          <button
            className="px-3 py-2 rounded-xl border border-border bg-surface/40 text-sm hover:bg-white/5 transition
                       dark:border-borderDark dark:bg-surfaceDark/40 dark:hover:bg-white/[0.04]"
            onClick={() => toast("Open Create Task modal next")}
          >
            + Add Task
          </button>
        </div>
      </div>

      {/* Search */}
      <Card className="p-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search tasks..."
          className="w-full rounded-xl border border-border bg-surface/60 px-4 py-2 text-sm text-text placeholder:text-muted outline-none focus:ring-2 focus:ring-accent/30
                     dark:border-borderDark dark:bg-surfaceDark/60 dark:text-textDark dark:placeholder:text-mutedDark"
        />
      </Card>

      {/* Table or Kanban */}
      {view === "table" ? (
        <DataTable rows={filtered} columns={columns} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {lanes.map((lane) => (
            <Card
              key={lane}
              className="p-4 bg-surface/40 border border-border
                         dark:bg-surfaceDark/40 dark:border-borderDark"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold text-text dark:text-textDark">
                  {lane}
                </div>
                <Badge variant={statusVariant(lane) as any}>
                  {laneTasks(lane).length}
                </Badge>
              </div>

              <div className="space-y-3">
                {laneTasks(lane).length === 0 ? (
                  <div className="rounded-xl border border-border bg-surface/40 p-4 text-sm text-muted
                                  dark:border-borderDark dark:bg-surfaceDark/40 dark:text-mutedDark">
                    Nothing here
                  </div>
                ) : (
                  laneTasks(lane).map((t) => (
                    <div
                      key={t.id}
                      className="rounded-xl border border-border bg-surface/40 p-3 hover:bg-white/[0.04] transition
                                 dark:border-borderDark dark:bg-surfaceDark/40 dark:hover:bg-white/[0.04]"
                    >
                      <div className="font-medium text-text dark:text-textDark">
                        {t.title}
                      </div>
                      <div className="mt-2 text-xs text-muted dark:text-mutedDark flex justify-between">
                        <span>
                          {clients.find((c) => c.id === t.clientId)?.name ?? "—"}
                        </span>
                        <span>{t.dueDate}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
