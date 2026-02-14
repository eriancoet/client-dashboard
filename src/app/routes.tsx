import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "./AppShell";
import { Dashboard } from "../pages/Dashboard";
import { Clients } from "../pages/Clients";
import { ClientDetails } from "../pages/ClientDetails";
import { Tasks } from "../pages/Tasks";

function Shell({ children }: React.PropsWithChildren) {
  return <AppShell>{children}</AppShell>;
}

export const router = createBrowserRouter([
  { path: "/", element: <Shell><Dashboard /></Shell> },
  { path: "/clients", element: <Shell><Clients /></Shell> },
  { path: "/clients/:id", element: <Shell><ClientDetails /></Shell> },
  { path: "/tasks", element: <Shell><Tasks /></Shell> }
]);
