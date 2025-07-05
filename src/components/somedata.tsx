import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { composedData } from "../Data/data";


interface Props {
  title?: string;
  dataKey: string;
  barColor?: string;
}

export default function CustomBarChart({
  title = "Some Data",
  dataKey,
  barColor = "#f47d27"
}: Props) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>{title}</h3>
      <ResponsiveContainer>
        <BarChart
          data={composedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey={dataKey} fill={barColor} barSize={60} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
