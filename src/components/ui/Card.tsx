export function Card({
  className = "",
  children
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={[
        "rounded-2xl border",
        "border-border bg-surface",
        "shadow-[0_1px_2px_rgba(16,24,40,0.06)]",

        // Baseline text colors for ALL content inside the card
        "text-text [&_p]:text-muted",
        "dark:bg-surfaceDark dark:border-borderDark",
        "dark:text-textDark dark:[&_p]:text-mutedDark",
        "dark:shadow-[0_10px_30px_rgba(0,0,0,0.45)]",

        className
      ].join(" ")}
    >
      {children}
    </div>
  );
}

