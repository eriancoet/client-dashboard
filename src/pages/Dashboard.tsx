import { Card } from "../components/ui/Card";

export function Dashboard() {
  const kpis = [
    { label: "Total Clients", value: "24", sub: "+3 this week" },
    { label: "Active Projects", value: "12", sub: "+1 today" },
    { label: "Overdue Tasks", value: "3", sub: "-2 resolved" },
    { label: "Revenue", value: "$14,200", sub: "+8%" }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted dark:text-mutedDark mt-2">
          Overview of client activity and performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpis.map((k) => (
          <Card key={k.label} className="p-6">
            <div className="text-xs text-muted dark:text-mutedDark">{k.label}</div>
            <div className="mt-2 text-3xl font-semibold">{k.value}</div>
            <div className="mt-2 text-xs text-muted dark:text-mutedDark">{k.sub}</div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <button className="text-sm text-muted dark:text-mutedDark hover:text-text dark:hover:text-textDark">
            View all
          </button>
        </div>

        <div className="space-y-4 text-sm">
          {[
            ["Ignite Careers project created", "2h ago"],
            ["Northwind invoice sent", "5h ago"],
            ["Atlas task marked complete", "Yesterday"]
          ].map(([label, time]) => (
            <div key={label} className="flex items-center justify-between">
              <span>{label}</span>
              <span className="text-muted dark:text-mutedDark">{time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
