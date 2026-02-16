import React from "react";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "outline";

type Props = React.PropsWithChildren<{
  variant?: BadgeVariant;
  className?: string;
}>;

function cx(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

export function Badge({ variant = "default", className, children }: Props) {
  const base =
    "inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold border";

  // Neutral chip (matches your dark UI)
  const neutral =
    "bg-surface/40 border-border text-muted " +
    "dark:bg-surfaceDark/40 dark:border-borderDark dark:text-mutedDark";

  // Colored chips: dark background + subtle border + colored text (like Clients page)
  const variants: Record<BadgeVariant, string> = {
    default: neutral,

    outline:
      "bg-transparent border-border text-text " +
      "dark:border-borderDark dark:text-textDark",

    success:
      "bg-emerald-500/10 border-emerald-500/25 text-emerald-700 " +
      "dark:bg-emerald-400/10 dark:border-emerald-300/20 dark:text-emerald-200",

    warning:
      "bg-amber-500/12 border-amber-500/25 text-amber-800 " +
      "dark:bg-amber-400/10 dark:border-amber-300/20 dark:text-amber-200",

    danger:
      "bg-rose-500/10 border-rose-500/25 text-rose-700 " +
      "dark:bg-rose-400/10 dark:border-rose-300/20 dark:text-rose-200",
  };

  return (
    <span className={cx(base, variants[variant], className)}>
      {children}
    </span>
  );
}
