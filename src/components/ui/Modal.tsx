import React from "react";

export function Modal({
  open,
  title,
  children,
  onClose
}: React.PropsWithChildren<{ open: boolean; title: string; onClose: () => void }>) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-2xl border border-border bg-surface shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div className="font-semibold">{title}</div>
            <button
              className="h-9 w-9 rounded-xl border border-border bg-surface/40 hover:bg-white/5"
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div className="p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
