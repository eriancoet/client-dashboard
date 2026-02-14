import type { Client, ClientUser, Task } from "../types";

export const clients: Client[] = [
  {
    id: "ignite",
    name: "Ignite Careers",
    category: "Retained Customer",
    status: "Active",
    tags: ["Ignite", "Careers"],
    email: "hello@ignitecareers.com",
    phone: "+27 00 000 0000",
    createdAt: "2026-02-01"
  },
  {
    id: "northwind",
    name: "Northwind Traders",
    category: "Subscription",
    status: "Pending",
    tags: ["B2B", "Retail"],
    email: "ops@northwind.com",
    phone: "+27 00 000 0000",
    createdAt: "2026-02-06"
  },
  {
    id: "atlas",
    name: "Atlas Studio",
    category: "One-off",
    status: "Paused",
    tags: ["Design", "Brand"],
    email: "team@atlas.studio",
    phone: "+27 00 000 0000",
    createdAt: "2026-01-20"
  }
];

export const clientUsers: ClientUser[] = [
  { id: "u1", clientId: "ignite", name: "Jayceon Clayton", email: "jayceon@example.com", phone: "+27 00 000 0000", status: "Active" },
  { id: "u2", clientId: "ignite", name: "Ivanna Fletcher", email: "ivanna@example.com", phone: "+27 00 000 0000", status: "Invited" },
  { id: "u3", clientId: "northwind", name: "Douglas Massey", email: "douglas@example.com", phone: "+27 00 000 0000", status: "Active" }
];

export const tasks: Task[] = [
  { id: "t1", title: "Kickoff call + scope", clientId: "ignite", status: "Todo", priority: "High", dueDate: "2026-02-20" },
  { id: "t2", title: "Wireframes review", clientId: "ignite", status: "In Progress", priority: "Medium", dueDate: "2026-02-18" },
  { id: "t3", title: "Fix invoice template", clientId: "northwind", status: "Blocked", priority: "High", dueDate: "2026-02-16" },
  { id: "t4", title: "Deploy v1", clientId: "atlas", status: "Done", priority: "Low", dueDate: "2026-02-10" }
];
