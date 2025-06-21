// src/components/BarChartStageWidget.tsx
import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

interface RawDataItem {
  date: string;
  stage: string;
  groupA: number;
  groupB: number;
  make?: string;
}

interface Props {
  rawData: RawDataItem[];
  visibleDates: Set<string>;
  visibleMakes: Set<string>;
}

export default function BarChartStageWidget({ rawData, visibleDates, visibleMakes }: Props) {
  const barStageData = useMemo(() => {
    const filteredData = rawData.filter(
      (d) => visibleDates.has(d.date) && (!d.make || visibleMakes.has(d.make))
    );

    const grouped: Record<string, { stage: string; groupA: number; groupB: number }> = {};
    filteredData.forEach((d) => {
      if (!grouped[d.stage]) {
        grouped[d.stage] = { stage: d.stage, groupA: 0, groupB: 0 };
      }
      grouped[d.stage].groupA += d.groupA;
      grouped[d.stage].groupB += d.groupB;
    });

    return Object.values(grouped);
  }, [rawData, visibleDates, visibleMakes]);

  return (
    <div className="chart-box">
      <h3 className="chart-title">Audience Buyer Journey Stages</h3>
      <p className="chart-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart layout="vertical" data={barStageData} margin={{ left: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis type="number" stroke="#ccc" />
          <YAxis type="category" dataKey="stage" stroke="#ccc" />
          <Tooltip />
          <Legend />
          <Bar dataKey="groupA" fill="#26c6da" barSize={10} />
          <Bar dataKey="groupB" fill="#66bb6a" barSize={10} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}