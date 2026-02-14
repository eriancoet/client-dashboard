import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { clients, clientUsers } from "../data/mock";
import toast from "react-hot-toast";

const tabs = ["Timeline", "Details", "Users", "Projects", "Files", "Financial", "Notes"] as const;

export function ClientDetails() {
  const { id } = useParams();
  const client = clients.find((c) => c.id === id);

  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Users");

  const users = useMemo(
    () => clientUsers.filter((u) => u.clientId === id),
    [id]
  );

  if (!client) {
    return (
      <div className="rounded-2xl border border-border bg-surface/40 p-10">
        <div className="text-lg font-semibold">Client not found</div>
        <div className="text-sm text-muted mt-2">Check the URL or go back to Clients.</div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xl font-semibold">Clients – {client.name}</div>
          <div className="text-xs text-muted mt-1">APP / CLIENTS</div>
        </div>
        <button
          className="px-3 py-2 rounded-xl border border-border bg-surface/40 text-sm hover:bg-white/5"
          onClick={() => toast.success("Action clicked (wire real actions later)")}
        >
          Quick Action
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={[
              "px-3 py-2 rounded-xl text-sm border",
              t === activeTab
                ? "bg-accent/20 border-accent/30 text-text"
                : "bg-surface/30 border-border text-muted hover:text-text hover:bg-white/5"
            ].join(" ")}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-5">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/10" />
            <div>
              <div className="font-semibold">{client.name}</div>
              <div className="text-xs text-muted">{client.category}</div>
            </div>
          </div>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between text-muted">
              <span>Email</span>
              <span className="text-text">{client.email}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Phone</span>
              <span className="text-text">{client.phone}</span>
            </div>

            <div className="pt-2">
              <div className="text-xs text-muted mb-2">Tags</div>
              <div className="flex gap-2 flex-wrap">
                {client.tags.map((t) => <Badge key={t}>{t}</Badge>)}
                <Badge variant={client.status === "Active" ? "success" : client.status === "Pending" ? "warning" : "danger"}>
                  {client.status}
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold">
              {activeTab === "Users" ? "Users" : activeTab}
            </div>
            <button
              className="px-3 py-2 rounded-xl border border-border bg-surface/40 text-sm hover:bg-white/5"
              onClick={() => toast("Open modal here (next step)")}
            >
              + Add
            </button>
          </div>

          {activeTab !== "Users" ? (
            <div className="rounded-2xl border border-border bg-surface/40 p-10 text-center">
              <div className="text-base font-semibold">{activeTab} coming next</div>
              <div className="mt-2 text-sm text-muted">We’ll build this tab after Tasks.</div>
            </div>
          ) : users.length === 0 ? (
            <div className="rounded-2xl border border-border bg-surface/40 p-10 text-center">
              <div className="text-base font-semibold">No users yet</div>
              <div className="mt-2 text-sm text-muted">Invite a user to collaborate with this client.</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-muted">
                  <tr className="border-b border-border">
                    <th className="py-3 text-left font-medium">Name</th>
                    <th className="py-3 text-left font-medium">Email</th>
                    <th className="py-3 text-left font-medium">Phone</th>
                    <th className="py-3 text-right font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-border/70 hover:bg-white/[0.03]">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-white/10" />
                          <div className="font-medium">{u.name}</div>
                        </div>
                      </td>
                      <td className="py-3 text-muted">{u.email}</td>
                      <td className="py-3 text-muted">{u.phone}</td>
                      <td className="py-3 text-right">
                        <Badge variant={u.status === "Active" ? "success" : "warning"}>{u.status}</Badge>
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
