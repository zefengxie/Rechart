// ✅ ComposedChartWidget.tsx (modular component format)
import React from "react";
import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from "recharts";

interface Props {
  data: any[];
}

export default function ComposedChartWidget({ data }: Props) {
  return (
    <div className="chart-box mobile-order-2">
      <h3 className="chart-title">Impressions and Clicks</h3>
      <p className="chart-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data} margin={{ bottom: 30 }}>
          <CartesianGrid stroke="#444" />
          <XAxis dataKey="date" angle={-45} textAnchor="end" height={60} stroke="#ccc" />
          <YAxis
            yAxisId="left"
            stroke="#ccc"
            tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k`}
            label={{ value: "Impressions", angle: -90, position: "insideLeft", offset: 5 }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#ccc"
            label={{ value: "Clicks", angle: 90, position: "insideRight", offset: 5 }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#333", color: "#fff" }}
            formatter={(value: number | string, name: string) =>
              name === "impressions"
                ? [`${Math.round(Number(value) / 1000)}k`, "Impressions"]
                : name === "clicks"
                ? [value, "Clicks"]
                : value
            }
          />
          <Bar yAxisId="left" dataKey="impressions" fill="#cfd8dc" barSize={18} name="Impressions" />
          <Line yAxisId="right" dataKey="clicks" stroke="#26a69a" strokeWidth={2.5} dot={{ r: 3 }} name="Clicks" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
