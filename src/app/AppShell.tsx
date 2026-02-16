import type { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  Moon,
  CalendarDays,
  MessageCircle,
  Plus,
  Bell,
  Globe,
  Search,
} from "lucide-react";


   function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        [
        "flex items-center justify-between w-full px-4 py-1.5 rounded-lg text-sm transition",
          "border border-transparent",

          isActive
            ? [
                // Light
                "bg-black/5 text-text",
                // Dark (no white pill)
                "dark:bg-white/10 dark:text-textDark",
              ].join(" ")
            : [
                "text-muted hover:bg-black/5 hover:text-text",
                "dark:text-mutedDark dark:hover:bg-white/5 dark:hover:text-textDark",
              ].join(" "),
        ].join(" ")
      }
    >
      {label}
    </NavLink>
  );
}


export function AppShell({ children }: PropsWithChildren) {
  const toggleTheme = () => {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");

    if (isDark) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <div className="min-h-screen bg-app text-text dark:bg-appDark dark:text-textDark relative overflow-hidden">
      {/* subtle premium glow in dark mode */}
      <div className="pointer-events-none absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_60%)]" />

      <Toaster position="top-right" />

      <div className="relative flex min-h-screen items-start">
        {/* Sidebar */}
<aside
  className={[
    "w-72 m-6 flex flex-col rounded-2xl",
    "h-[92vh] max-h-[900px]",   // 👈 control visual height here
    "bg-surface border border-border shadow-sm",
    "dark:bg-surfaceDark dark:border-borderDark",
    "dark:shadow-[0_16px_40px_rgba(0,0,0,0.45)]",
  ].join(" ")}
>



          <div className="px-5 py-4 border-b border-border dark:border-borderDark">
            <div className="text-lg font-semibold tracking-wide">MICAH</div>
            <div className="text-xs text-muted dark:text-mutedDark">
              Client Admin
            </div>
          </div>

          <nav className="p-3 space-y-1">
            <NavItem to="/" label="Dashboard" />
            <NavItem to="/clients" label="Clients" />
            <NavItem to="/tasks" label="Tasks" />
          </nav>

          <div className="mt-auto p-3 border-t border-border dark:border-borderDark">
            <NavItem to="/settings" label="Settings" />
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col">
          {/* Topbar */}
          <header className="mx-6 mt-6 topbar">
            {/* Search */}
            <div className="flex-1">
              <div className="search-pill max-w-2xl">
                <Search size={18} className="opacity-70" />
                <input placeholder="Search" />
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-2">
              <button className="icon-btn" onClick={toggleTheme} title="Theme">
                <Moon size={18} />
              </button>

              <button className="icon-btn" title="Calendar">
                <CalendarDays size={18} />
              </button>

              <button className="icon-btn" title="Messages">
                <MessageCircle size={18} />
              </button>

              <button className="icon-btn" title="New">
                <Plus size={18} />
              </button>

              <button className="icon-btn relative" title="Notifications">
                <Bell size={18} />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
              </button>

              <button className="icon-btn" title="Language">
                <Globe size={18} />
              </button>

              {/* Profile */}
              <div className="ml-2 flex items-center gap-3 rounded-full border border-border bg-surface px-3 py-2 dark:border-borderDark dark:bg-surfaceDark">
                <div className="h-8 w-8 rounded-full bg-black/10 dark:bg-white/10" />
                <div className="leading-tight">
                  <div className="text-sm font-semibold">UI Engineer</div>
                  <div className="text-xs text-muted dark:text-mutedDark">
                    you@email.com
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <div className="flex-1 px-6 py-6 overflow-auto bg-app dark:bg-appDark">
            <div className="max-w-6xl mx-auto">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
