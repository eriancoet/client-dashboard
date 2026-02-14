export type ClientStatus = "Active" | "Pending" | "Paused";
export type TaskStatus = "Todo" | "In Progress" | "Blocked" | "Done";
export type Priority = "Low" | "Medium" | "High";

export type Client = {
  id: string;
  name: string;
  category: string;
  status: ClientStatus;
  tags: string[];
  email: string;
  phone: string;
  createdAt: string;
};

export type ClientUser = {
  id: string;
  clientId: string;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Invited";
};

export type Task = {
  id: string;
  title: string;
  clientId: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: string;
};
