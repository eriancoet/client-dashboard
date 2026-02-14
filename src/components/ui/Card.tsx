export function Card({
  className = "",
  children
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={[
        "rounded-2xl border border-border bg-surface",
        "shadow-[0_1px_2px_rgba(16,24,40,0.06)]",
        className
      ].join(" ")}
    >
      {children}
    </div>
  );
}
