import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clients } from "../data/mock";
import { Card } from "../components/ui/Card";
import { DataTable } from "../components/ui/DataTable";
import type { Column } from "../components/ui/DataTable";
import type { Client } from "../types";

function statusClass(s: Client["status"]) {
  if (s === "Active") return "status-active";
  if (s === "Pending") return "status-pending";
  return "status-paused";
}

export function Clients() {
  const nav = useNavigate();
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return clients;
    return clients.filter((c) =>
      [c.name, c.category, c.status, c.email].some((x) =>
        x.toLowerCase().includes(t)
      )
    );
  }, [q]);

  const columns: Column<Client>[] = [
    {
      key: "name",
      header: "Client",
      render: (c) => (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-black/10 dark:bg-white/10" />
          <div>
            <div className="font-medium">{c.name}</div>
            <div className="text-xs text-muted dark:text-mutedDark">
              {c.category}
            </div>
          </div>
        </div>
      ),
      sortValue: (c) => c.name
    },
    {
      key: "status",
      header: "Status",
      render: (c) => <span className={statusClass(c.status)}>{c.status}</span>,
      sortValue: (c) => c.status
    },
    {
      key: "tags",
      header: "Tags",
      render: (c) => (
        <div className="flex gap-2 flex-wrap">
          {c.tags.slice(0, 2).map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      )
    },
    {
      key: "createdAt",
      header: "Created",
      render: (c) => (
        <span className="text-muted dark:text-mutedDark">{c.createdAt}</span>
      ),
      sortValue: (c) => c.createdAt
    }
  ];

  return (
    <div className="space-y-5">
      <div>
        <div className="text-xl font-semibold">Clients</div>
        <div className="text-xs text-muted dark:text-mutedDark mt-1">
          Search, sort, and open client details
        </div>
      </div>

      <Card className="p-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search clients..."
          className={[
            "w-full rounded-xl border px-4 py-2 text-sm outline-none transition",
            "border-border bg-surface/60 text-text placeholder:text-muted",
            "focus:ring-2 focus:ring-black/10",
            "dark:border-white/5 dark:bg-white/5 dark:text-textDark dark:placeholder:text-mutedDark",
            "dark:focus:ring-white/10"
          ].join(" ")}
        />
      </Card>

      <DataTable
        rows={filtered}
        columns={columns}
        onRowClick={(row) => nav(`/clients/${row.id}`)}
        emptyTitle="No clients found"
        emptyDescription="Try a different search term."
      />
    </div>
  );
}
