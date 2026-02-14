import React from "react";

type Variant = "default" | "success" | "warning" | "danger";

const variants: Record<Variant, string> = {
  default: "bg-white/5 text-text border-border",
  success: "bg-emerald-500/15 text-emerald-200 border-emerald-500/20",
  warning: "bg-amber-500/15 text-amber-200 border-amber-500/20",
  danger: "bg-rose-500/15 text-rose-200 border-rose-500/20"
};

export function Badge({
  variant = "default",
  className = "",
  children
}: React.PropsWithChildren<{ variant?: Variant; className?: string }>) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium",
        variants[variant],
        className
      ].join(" ")}
    >
      {children}
    </span>
  );
}
