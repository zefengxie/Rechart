import React from "react";
import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from "recharts";
import { Loader, Center } from "@mantine/core";


interface BarConfig {
  key: string;
  color: string;
  label?: string;
}

interface LineConfig {
  key: string;
  color: string;
  label?: string;
}

interface Props {
  title: string;
  description?: string;
  data: any[];
  isLoading?: boolean;
  xKey: string;
  bars?: BarConfig[];
  lines?: LineConfig[];
  leftYAxisLabel?: string;
  rightYAxisLabel?: string;
}

export default function ComposedChartTemplate({
  title,
  description,
  data,
  isLoading = false,
  xKey,
  bars = [],
  lines = [],
  leftYAxisLabel = "Left Axis",
  rightYAxisLabel = "Right Axis"
}: Props) {
  return (
    <div className="chart-box mobile-order-2 ">
      <h3 className="chart-title">{title}</h3>
      {description && <p className="chart-description">{description}</p>}

      <div className="chart-wrapper" style={{ height: 300 }}>
        {isLoading ? (
          <Center style={{ height: "100%" }}>
            <Loader color="teal" size="xl" />
          </Center>
        ) : (
          <ResponsiveContainer width="100%" height="130%">
            <ComposedChart data={data} margin={{ bottom: 30 }}>
              <CartesianGrid stroke="#444" />
              <XAxis dataKey={xKey} 
              angle={-45} 
              textAnchor="end" 
              height={60} 
              stroke="#ccc" 
              className="xaxis-label"
              />
              
              <YAxis
                yAxisId="left"
                stroke="#ccc"
                label={{ value: leftYAxisLabel, angle: -90, position: "insideLeft", offset: 5 }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#ccc"
                label={{ value: rightYAxisLabel, angle: 90, position: "insideRight", offset: 5 }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "#333", color: "#fff" }}
                formatter={(value: number | string, name: string) => [value, name]}
              />
              {bars.map(bar => (
                <Bar
                  key={bar.key}
                  yAxisId="left"
                  dataKey={bar.key}
                  fill={bar.color}
                  name={bar.label || bar.key}
                  barSize={18}
                />
              ))}
              {lines.map(line => (
                <Line
                  key={line.key}
                  yAxisId="right"
                  dataKey={line.key}
                  stroke={line.color}
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  name={line.label || line.key}
                />
              ))}
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
