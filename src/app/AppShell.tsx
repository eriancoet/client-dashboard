import { NavLink } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import type { PropsWithChildren } from "react";

function NavItem({ to, label }: { to: string; label: string }) {
  return (
     <NavLink
                to={to}
                end={to === "/"}
                 className={({ isActive }) =>
  [
    "block w-full px-4 py-2.5 rounded-xl text-sm transition-colors",
    isActive
      ? "bg-gray-100 text-text font-medium"
      : "text-muted hover:bg-gray-100 hover:text-text"
  ].join(" ")
}

           


            

    >
      {label}
    </NavLink>
  );
}

export function AppShell({ children }: PropsWithChildren) {
  return (
<div className="min-h-screen bg-app text-text">
      <Toaster position="top-right" />

      <div className="flex min-h-screen">
        {/* Sidebar */}
<aside className="w-72 border-r border-border bg-sidebar flex flex-col">
          <div className="px-5 py-4 border-b border-border">
            <div className="text-lg font-semibold tracking-wide">RYVEN</div>
            <div className="text-xs text-muted">Client Admin</div>
          </div>

          <nav className="p-3 space-y-1">
            <NavItem to="/" label="Dashboard" />
            <NavItem to="/clients" label="Clients" />
            <NavItem to="/tasks" label="Tasks" />
          </nav>

          <div className="mt-auto p-3 border-t border-border">
            <NavItem to="/settings" label="Settings" />
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col">
          {/* Topbar */}
          <header className="h-16 border-b border-border bg-app/60 backdrop-blur flex items-center gap-3 px-5">
            <div className="flex-1">
              <input
                className="w-full max-w-xl rounded-xl border border-border bg-surface/60 px-4 py-2 text-sm text-text placeholder:text-muted outline-none focus:ring-2 focus:ring-accent/30"
                placeholder="Search"
              />
            </div>

            <div className="flex items-center gap-2">
              <button className="h-9 w-9 rounded-xl border border-border bg-surface/40 hover:bg-white/5" />
              <button className="h-9 w-9 rounded-xl border border-border bg-surface/40 hover:bg-white/5" />
              <div className="ml-2 flex items-center gap-2 rounded-xl border border-border bg-surface/40 px-3 py-2">
                <div className="h-6 w-6 rounded-full bg-white/10" />
                <div className="leading-tight">
                  <div className="text-xs font-medium">UI Engineer</div>
                  <div className="text-[11px] text-muted">you@email.com</div>
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
      {/* Page content */}
<div className="flex-1 px-10 py-8 overflow-auto bg-app">
  <div className="max-w-6xl mx-auto">
    {children}
  </div>
</div>


        
        </main>
      </div>
    </div>
  );
}
