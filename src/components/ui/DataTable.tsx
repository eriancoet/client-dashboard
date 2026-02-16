import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

export type Column<T> = {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  sortValue?: (row: T) => string | number;
  className?: string;
};

type Props<T> = {
  rows: T[];
  columns: Column<T>[];
  pageSize?: number;
  onRowClick?: (row: T) => void;
  emptyTitle?: string;
  emptyDescription?: string;
};

type Sort = { key: string; dir: "asc" | "desc" } | null;

export function DataTable<T>({
  rows,
  columns,
  pageSize = 8,
  onRowClick,
  emptyTitle = "No results",
  emptyDescription = "Try adjusting your filters or add new items."
}: Props<T>) {
  const [sort, setSort] = useState<Sort>(null);
  const [page, setPage] = useState(1);

  const sorted = useMemo(() => {
    if (!sort) return rows;

    const col = columns.find((c) => c.key === sort.key);
    if (!col?.sortValue) return rows;

    const copy = [...rows];
    copy.sort((a, b) => {
      const av = col.sortValue!(a);
      const bv = col.sortValue!(b);
      if (av < bv) return sort.dir === "asc" ? -1 : 1;
      if (av > bv) return sort.dir === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [rows, columns, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const toggleSort = (key: string) => {
    setPage(1);
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, dir: "asc" };
      if (prev.dir === "asc") return { key, dir: "desc" };
      return null;
    });
  };

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-10 text-center shadow-sm dark:border-white/5 dark:bg-surfaceDark dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)] dark:ring-1 dark:ring-white/5">
        <div className="text-base font-semibold text-text dark:text-textDark">
          {emptyTitle}
        </div>
        <div className="mt-2 text-sm text-muted dark:text-mutedDark">
          {emptyDescription}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm dark:border-white/5 dark:bg-surfaceDark dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)] dark:ring-1 dark:ring-white/5">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-text dark:text-textDark">
          {/* Header */}
          <thead className="bg-app/60 text-xs text-muted dark:bg-white/5 dark:text-mutedDark">
            <tr className="border-b border-border dark:border-white/5">
              {columns.map((c) => {
                const isSorted = sort?.key === c.key;
                const canSort = !!c.sortValue;

                return (
                  <th
                    key={c.key}
                    className={[
                      "py-3 px-4 text-left font-semibold select-none whitespace-nowrap",
                      canSort
                        ? "cursor-pointer hover:text-text dark:hover:text-textDark"
                        : "",
                      c.className || ""
                    ].join(" ")}
                    onClick={canSort ? () => toggleSort(c.key) : undefined}
                  >
                    <div className="flex items-center gap-2">
                      <span>{c.header}</span>
                      {isSorted && (
                        <span className="text-[11px] text-muted dark:text-mutedDark">
                          {sort?.dir === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* Rows */}
          <tbody>
            {paged.map((row, idx) => (
              <tr
                key={idx}
                className={[
                  "border-b border-border last:border-b-0",
                  "hover:bg-black/[0.02] transition-colors",
                  "dark:border-white/5 dark:hover:bg-white/5",
                  onRowClick ? "cursor-pointer" : ""
                ].join(" ")}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((c) => (
                  <td key={c.key} className="py-3.5 px-4 align-middle">
                    {c.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 bg-surface border-t border-border dark:bg-surfaceDark dark:border-white/5">
        <div className="text-xs text-muted dark:text-mutedDark">
          Page{" "}
          <span className="text-text font-medium dark:text-textDark">
            {page}
          </span>{" "}
          of{" "}
          <span className="text-text font-medium dark:text-textDark">
            {totalPages}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            className="px-3 py-2 rounded-xl border border-border bg-surface text-sm hover:bg-black/[0.03] disabled:opacity-50 transition dark:border-white/5 dark:bg-surfaceDark dark:hover:bg-white/5"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </button>
          <button
            className="px-3 py-2 rounded-xl border border-border bg-surface text-sm hover:bg-black/[0.03] disabled:opacity-50 transition dark:border-white/5 dark:bg-surfaceDark dark:hover:bg-white/5"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
