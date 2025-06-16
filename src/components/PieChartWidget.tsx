// src/components/PieChartWidget.tsx
import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface RawDataItem {
  date: string;
  make?: string;
  name: string; // "New" or "Used"
  value: number;
}

interface Props {
  rawData: RawDataItem[];
  visibleDates: Set<string>;
  visibleMakes: Set<string>;
  colors?: string[];
}

const DEFAULT_COLORS = ["#26c6da", "#66bb6a"];

export default function PieChartWidget({ rawData, visibleDates, visibleMakes, colors = DEFAULT_COLORS }: Props) {
  const pieData = useMemo(() => {
    const filteredData = rawData.filter(
      (d) => visibleDates.has(d.date) && (!d.make || visibleMakes.has(d.make))
    );

    const result = { New: 0, Used: 0 };
    filteredData.forEach((d) => {
      if (d.name === "New") result.New += d.value;
      else if (d.name === "Used") result.Used += d.value;
    });

    return [
      { name: "New", value: result.New },
      { name: "Used", value: result.Used },
    ];
  }, [rawData, visibleDates, visibleMakes]);

  return (
    <div className="chart-box">
      <h4>New vs Used Audiences</h4>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Tooltip />
          <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={70} label>
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
