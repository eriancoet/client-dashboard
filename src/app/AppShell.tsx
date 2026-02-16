import type { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import {
  Moon,
  CalendarDays,
  MessageCircle,
  Plus,
  Bell,
  Globe,
  Search,
  Menu,
  X,
} from "lucide-react";

function NavItem({
  to,
  label,
  onClick,
}: {
  to: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      onClick={onClick}
      className={({ isActive }) =>
        [
          "flex items-center w-full px-4 py-2 rounded-lg text-sm transition",
          "border border-transparent",
          isActive
            ? "bg-black/5 text-text dark:bg-white/10 dark:text-textDark"
            : "text-muted hover:bg-black/5 hover:text-text dark:text-mutedDark dark:hover:bg-white/5 dark:hover:text-textDark",
        ].join(" ")
      }
    >
      {label}
    </NavLink>
  );
}

export function AppShell({ children }: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  // close drawer when resizing to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-app text-text dark:bg-appDark dark:text-textDark relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_60%)]" />

      <Toaster position="top-right" />

      <div className="relative flex min-h-screen">
        {/* Overlay (mobile only) */}
        {sidebarOpen && (
          <button
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          />
        )}

        {/* Sidebar */}
        <aside
          className={[
            "z-50 flex flex-col",
            "bg-surface border border-border shadow-sm",
            "dark:bg-surfaceDark dark:border-borderDark",
            "dark:shadow-[0_16px_40px_rgba(0,0,0,0.45)]",

            // mobile drawer base
            "fixed inset-y-0 left-0 w-[82vw] max-w-[320px] rounded-none",
            "transition-transform duration-200 ease-out",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",

            // desktop: always visible and floating
            "lg:static lg:translate-x-0 lg:w-72 lg:m-6 lg:rounded-2xl",
          ].join(" ")}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border dark:border-borderDark">
            <div>
              <div className="text-lg font-semibold tracking-wide">MICAH</div>
              <div className="text-xs text-muted dark:text-mutedDark">
                Client Admin
              </div>
            </div>

            <button
              className="icon-btn lg:hidden"
              onClick={closeSidebar}
              aria-label="Close menu"
              title="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Nav */}
          <nav className="p-3 space-y-0.5 overflow-y-auto">
            <NavItem to="/" label="Dashboard" onClick={closeSidebar} />
            <NavItem to="/clients" label="Clients" onClick={closeSidebar} />
            <NavItem to="/tasks" label="Tasks" onClick={closeSidebar} />
          </nav>

          {/* Bottom */}
          <div className="mt-auto p-3 border-t border-border dark:border-borderDark">
            <NavItem to="/settings" label="Settings" onClick={closeSidebar} />
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Topbar */}
          <header className="mx-4 sm:mx-6 mt-4 sm:mt-6 flex items-center justify-between gap-4">
            {/* Left */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <button
                className="icon-btn lg:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
                title="Menu"
              >
                <Menu size={18} />
              </button>

              <div className="flex-1 min-w-0">
                <div className="search-pill w-full max-w-2xl">
                  <Search size={18} className="opacity-70" />
                  <input placeholder="Search" className="w-full" />
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
              <button className="icon-btn" onClick={toggleTheme} title="Theme">
                <Moon size={18} />
              </button>

              <button className="icon-btn hidden sm:inline-flex" title="Calendar">
                <CalendarDays size={18} />
              </button>

              <button className="icon-btn hidden sm:inline-flex" title="Messages">
                <MessageCircle size={18} />
              </button>

              <button className="icon-btn hidden md:inline-flex" title="New">
                <Plus size={18} />
              </button>

              <button
                className="icon-btn relative hidden sm:inline-flex"
                title="Notifications"
              >
                <Bell size={18} />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
              </button>

              <button className="icon-btn hidden md:inline-flex" title="Language">
                <Globe size={18} />
              </button>

              <div className="ml-2 flex items-center gap-3 rounded-full border border-border bg-surface px-3 py-2 dark:border-borderDark dark:bg-surfaceDark">
                <div className="h-8 w-8 rounded-full bg-black/10 dark:bg-white/10" />
                <div className="leading-tight hidden sm:block">
                  <div className="text-sm font-semibold">UI Engineer</div>
                  <div className="text-xs text-muted dark:text-mutedDark">
                    you@email.com
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <div className="flex-1 px-4 sm:px-6 py-4 sm:py-6 overflow-auto bg-app dark:bg-appDark">
            <div className="max-w-6xl mx-auto">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
