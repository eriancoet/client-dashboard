import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { clients, clientUsers } from "../data/mock";
import toast from "react-hot-toast";

const tabs = [
  "Timeline",
  "Details",
  "Users",
  "Projects",
  "Files",
  "Financial",
  "Notes"
] as const;

type Tab = (typeof tabs)[number];

function clientStatusClass(s: string) {
  if (s === "Active") return "status-active";
  if (s === "Pending") return "status-pending";
  return "status-paused";
}

export function ClientDetails() {
  const { id } = useParams();
  const client = clients.find((c) => c.id === id);

  const [activeTab, setActiveTab] = useState<Tab>("Users");

  const users = useMemo(
    () => clientUsers.filter((u) => u.clientId === id),
    [id]
  );

  if (!client) {
    return (
      <Card className="p-10">
        <div className="text-lg font-semibold">Client not found</div>
        <div className="text-sm text-muted dark:text-mutedDark mt-2">
          Check the URL or go back to Clients.
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-semibold">Clients - {client.name}</div>
          <div className="text-xs text-muted dark:text-mutedDark mt-1">
            APP / CLIENTS
          </div>
        </div>

        <button
          className={[
            "px-4 py-2 rounded-xl border text-sm transition",
            "border-border bg-surface hover:bg-black/[0.03]",
            "dark:border-white/5 dark:bg-white/5 dark:hover:bg-white/10",
          ].join(" ")}
          onClick={() => toast.success("Action clicked (wire real actions later)")}
        >
          Quick Action
        </button>
      </div>

      {/* Tabs */}
      <div className="rounded-2xl border border-border bg-surface shadow-sm px-4 dark:border-white/5 dark:bg-surfaceDark dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)] dark:ring-1 dark:ring-white/5">
        <div className="flex gap-6 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={[
                "py-4 text-sm font-medium border-b-2 -mb-px whitespace-nowrap transition-colors",
                activeTab === t
                  ? "border-black text-text dark:border-white/60 dark:text-textDark"
                  : "border-transparent text-muted hover:text-text dark:text-mutedDark dark:hover:text-textDark"
              ].join(" ")}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT CARD */}
        <Card className="p-6 xl:col-span-1">
          {/* Top band */}
          <div className="rounded-xl px-4 py-3 font-semibold bg-black text-white dark:bg-white/10 dark:text-textDark">
            {client.name}
          </div>

          {/* Avatar + basic info */}
          <div className="mt-5 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-black/10 dark:bg-white/10" />
            <div>
              <div className="font-semibold">{client.email}</div>
              <div className="text-xs text-muted dark:text-mutedDark">
                {client.category}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted dark:text-mutedDark">Client Name</span>
              <span className="font-medium">{client.name}</span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-muted dark:text-mutedDark">Phone</span>
              <span className="font-medium">{client.phone}</span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-muted dark:text-mutedDark">Category</span>
              <span className="font-medium">{client.category}</span>
            </div>

            {/* Tags + Status */}
            <div className="pt-3">
              <div className="text-xs text-muted dark:text-mutedDark mb-2">
                Tags
              </div>

              <div className="flex gap-2 flex-wrap items-center">
                {client.tags.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}

                <span className={clientStatusClass(client.status)}>
                  {client.status}
                </span>
              </div>
            </div>

            {/* Contact Section */}
            <div className="pt-4 border-t border-border dark:border-white/5">
              <div className="text-xs text-muted dark:text-mutedDark mb-2">
                Contact
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-muted dark:text-mutedDark">Email</span>
                  <span className="font-medium">{client.email}</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-muted dark:text-mutedDark">Phone</span>
                  <span className="font-medium">{client.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* RIGHT CARD */}
        <Card className="p-6 xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold">
              {activeTab === "Users" ? "Users" : activeTab}
            </div>

            <button
              className={[
                "px-4 py-2 rounded-xl border text-sm transition",
                "border-border bg-surface hover:bg-black/[0.03]",
                "dark:border-white/5 dark:bg-white/5 dark:hover:bg-white/10",
              ].join(" ")}
              onClick={() => toast("Open modal here (next step)")}
            >
              + Add
            </button>
          </div>

          {/* Non-users tabs */}
          {activeTab !== "Users" ? (
            <div className="rounded-2xl border border-border bg-app p-10 text-center dark:border-white/5 dark:bg-white/5">
              <div className="text-base font-semibold">{activeTab} coming next</div>
              <div className="mt-2 text-sm text-muted dark:text-mutedDark">
                We’ll build this tab after Tasks.
              </div>
            </div>
          ) : users.length === 0 ? (
            <div className="rounded-2xl border border-border bg-app p-10 text-center dark:border-white/5 dark:bg-white/5">
              <div className="text-base font-semibold">No users yet</div>
              <div className="mt-2 text-sm text-muted dark:text-mutedDark">
                Invite a user to collaborate with this client.
              </div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-border dark:border-white/5">
              <table className="w-full text-sm text-text dark:text-textDark">
                <thead className="bg-app text-xs text-muted dark:bg-white/5 dark:text-mutedDark">
                  <tr className="border-b border-border dark:border-white/5">
                    <th className="py-3 px-4 text-left font-semibold">Name</th>
                    <th className="py-3 px-4 text-left font-semibold">Email</th>
                    <th className="py-3 px-4 text-left font-semibold">Phone</th>
                    <th className="py-3 px-4 text-right font-semibold">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((u) => (
                    <tr
                      key={u.id}
                      className="border-b border-border last:border-b-0 hover:bg-black/[0.02] transition-colors dark:border-white/5 dark:hover:bg-white/5"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-black/10 dark:bg-white/10" />
                          <div className="font-medium">{u.name}</div>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-muted dark:text-mutedDark">
                        {u.email}
                      </td>

                      <td className="py-4 px-4 text-muted dark:text-mutedDark">
                        {u.phone}
                      </td>

                      <td className="py-4 px-4 text-right">
                        <span className={clientStatusClass(u.status)}>
                          {u.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
