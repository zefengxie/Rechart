import React, { useMemo, useState } from "react";
import { composedData } from "../Data/data";

type Row = { audienceName: string; totalUIDs: number };

const fmt = (n: number) =>
  n.toLocaleString(undefined, { maximumFractionDigits: 0 });

export default function SegmentsPage() {

  const allRows = useMemo<Row[]>(
    () =>
      composedData.map((d) => ({
        audienceName: `AF/a360/${d.make}/${d.name}/1f ${d.size}d`,
        totalUIDs: Number(d.impressions ?? 0),
      })),
    []
  );


  const pageSize = 100;
  const [page, setPage] = useState(1);
  const total = allRows.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const end = Math.min(page * pageSize, total);
  const pageRows = allRows.slice(start, end);

  const goto = (p: number) => {
    const next = Math.min(Math.max(1, p), pageCount);
    setPage(Number.isFinite(next) ? next : 1);
  };

  return (
    <div className="qlik-page">
      <div className="qlik-card">

        <div className="qlik-title">Monthly Segment Size</div>


        <div className="qlik-toolbar">

          <div className="qlik-hint-paint">
            <span className="hint-text">
              The table shows audience’s accumulative monthly averages.
            </span>
  
              <path
                d="M20,80 
                   C120,40 200,30 320,60 
                   S560,140 720,120 
                   S900,40 980,80
                   L980,160 
                   C880,180 760,170 640,150
                   S360,140 220,160
                   S80,170 20,150
                   Z"
                fill="#fde047"
              />

          </div>

          <div className="qlik-toolbar-left">
            <button
              className="qlik-icon-btn"
              onClick={() => goto(1)}
              disabled={page === 1}
              aria-label="First page"
              title="First page"
            >
              «
            </button>
            <button
              className="qlik-icon-btn"
              onClick={() => goto(page - 1)}
              disabled={page === 1}
              aria-label="Previous page"
              title="Previous page"
            >
              ‹
            </button>
          </div>
          <div className="qlik-toolbar-center">
            <input
              value={page}
              onChange={(e) => goto(Number(e.target.value) || 1)}
              aria-label="Current page"
            />
            <span className="sep">-</span>
            <span className="total">
              {fmt(end)} / {fmt(total)}
            </span>
          </div>

          <div className="qlik-toolbar-right">
            <button
              className="qlik-icon-btn"
              onClick={() => goto(page + 1)}
              disabled={end >= total}
              aria-label="Next page"
              title="Next page"
            >
              ›
            </button>
            <button
              className="qlik-icon-btn"
              onClick={() => goto(pageCount)}
              disabled={end >= total}
              aria-label="Last page"
              title="Last page"
            >
              »
            </button>
          </div>
        </div>

        <div className="qlik-scroll">
          <table className="qlik-table">
            <thead>
              <tr>
                <th>Audience Name</th>
                <th className="num">Total UIDs</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((r, i) => (
                <tr key={start + i}>
                  <td className="name-cell">{r.audienceName}</td>
                  <td className="num">{fmt(r.totalUIDs)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
