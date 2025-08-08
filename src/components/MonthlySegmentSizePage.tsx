import React, { useMemo, useState } from "react";

type Align = "left" | "center" | "right";

export type Column<T extends Record<string, any>> = {
  key: keyof T | string;
  label: string;
  align?: Align;
  width?: number | string;
  render?: (row: T, rowIndex: number) => React.ReactNode;
};

export type DataTableProps<T extends Record<string, any>> = {
  rows: T[];
  columns: Column<T>[];
  pageSize?: number;
  page?: number;
  total?: number;
  onPageChange?: (page: number) => void;
  stickyHeader?: boolean;
  zebra?: boolean;
  maxHeight?: number | string;
  toolbarStart?: React.ReactNode;
  toolbarEnd?: React.ReactNode;
  className?: string;
};

function cls(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default function DataTable<T extends Record<string, any>>({
  rows,
  columns,
  pageSize = 100,
  page,
  total,
  onPageChange,
  stickyHeader = true,
  zebra = true,
  maxHeight = "calc(100vh - 260px)",
  toolbarStart,
  toolbarEnd,
  className,
}: DataTableProps<T>) {
  const controlled = typeof page === "number" && !!onPageChange;
  const [innerPage, setInnerPage] = useState(1);

  const currentPage = controlled ? (page as number) : innerPage;
  const totalCount = typeof total === "number" ? total : rows.length;

  const pageRows = useMemo(() => {
    if (typeof total === "number") return rows;
    const startIdx = (currentPage - 1) * pageSize;
    return rows.slice(startIdx, startIdx + pageSize);
  }, [rows, total, currentPage, pageSize]);

  const startIdx = (currentPage - 1) * pageSize + 1;
  const endIdx = Math.min(startIdx + pageRows.length - 1, totalCount);
  const totalPages =
    totalCount === 0 ? 1 : Math.max(1, Math.ceil(totalCount / pageSize));

  const goPrev = () => {
    if (currentPage <= 1) return;
    controlled ? onPageChange!(currentPage - 1) : setInnerPage((p) => p - 1);
  };
  const goNext = () => {
    if (currentPage >= totalPages) return;
    controlled ? onPageChange!(currentPage + 1) : setInnerPage((p) => p + 1);
  };

  return (
    <div className={cls("dt-card", className)}>
      {(toolbarStart || toolbarEnd) && (
        <div className="dt-toolbar">
          <div className="dt-toolbar-start">{toolbarStart}</div>
          <div className="dt-toolbar-end">{toolbarEnd}</div>
        </div>
      )}

      <div className="dt-table-wrap" style={{ maxHeight }}>
        <table className="dt-table">
          <thead className={stickyHeader ? "dt-sticky" : undefined}>
            <tr>
              {columns.map((col, i) => (
                <th
                  key={i}
                  style={{ width: col.width }}
                  className={cls(
                    col.align === "right" && "right",
                    col.align === "center" && "center"
                  )}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={zebra ? "dt-zebra" : undefined}>
            {pageRows.map((row, rIdx) => (
              <tr key={rIdx}>
                {columns.map((col, cIdx) => {
                  const value =
                    col.render?.(row, rIdx) ??
                    (row[col.key as keyof T] as React.ReactNode);
                  return (
                    <td
                      key={cIdx}
                      className={cls(
                        col.align === "right" && "right",
                        col.align === "center" && "center"
                      )}
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))}
            {pageRows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="center muted">
                  No data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="dt-pagination">
        <button className="dt-nav-btn" onClick={goPrev} disabled={currentPage <= 1}>
          &lt;
        </button>
        <button
          className="dt-nav-btn"
          onClick={goNext}
          disabled={currentPage >= totalPages}
        >
          &gt;
        </button>

        <div className="dt-page-indicator">
          <span className="dt-page-current">{currentPage}</span>
          <span className="dt-page-sep">-</span>
          <span className="dt-range">
            {startIdx.toLocaleString()} - {endIdx.toLocaleString()} /{" "}
            {totalCount.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
