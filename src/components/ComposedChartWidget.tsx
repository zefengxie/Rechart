import React from "react";
import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from "recharts";
import { Loader, Center } from "@mantine/core";

type ChartTheme = {
  palette?: string[];
  axisStroke?: string;
  axisTick?: string;
  gridStroke?: string;
  gridDash?: string;
  tooltipCursor?: string;
  barSize?: number;
};

const defaultTheme: Required<ChartTheme> = {
  palette: ["#26c6da", "#66bb6a", "#ffca28", "#ab47bc", "#42a5f5", "#ef5350"],
  axisStroke: "#ccc",
  axisTick: "#64748b",
  gridStroke: "#444",
  gridDash: "3 3",
  tooltipCursor: "rgba(0,0,0,0.04)",
  barSize: 18,
};

interface BarConfig {
  key: string;
  color?: string;    
  label?: string;
  barSize?: number;
}

interface LineConfig {
  key: string;
  color?: string;  
  label?: string;
  dot?: boolean;
  strokeWidth?: number;
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
  height?: number;
  theme?: ChartTheme; 
}

export default function ComposedChartWidget({
  title,
  description,
  data,
  isLoading = false,
  xKey,
  bars = [],
  lines = [],
  leftYAxisLabel = "Left Axis",
  rightYAxisLabel = "Right Axis",
  height = 300,
  theme
}: Props) {
  const t = { ...defaultTheme, ...theme };
  const barColor = (i: number, c?: string) => c || t.palette[i % t.palette.length];
  const lineColor = (i: number, c?: string) => c || t.palette[(i + bars.length) % t.palette.length];

  return (
    <div className="chart-box mobile-order-2 ">
      <h3 className="chart-title">{title}</h3>
      {description && <p className="chart-description">{description}</p>}

      <div className="chart-wrapper" style={{ height }}>
        {isLoading ? (
          <Center style={{ height: "100%" }}>
            <Loader color="teal" size="xl" />
          </Center>
        ) : (
          <ResponsiveContainer width="100%" height="130%">
            <ComposedChart data={data} margin={{ bottom: 30, left: 16, right: 16 }}>
              <CartesianGrid strokeDasharray={t.gridDash} stroke={t.gridStroke} />
              <XAxis
                dataKey={xKey}
                angle={-45}
                textAnchor="end"
                height={60}
                stroke={t.axisStroke}
                className="xaxis-label"
                tick={{ fill: t.axisTick, fontSize: 12 }}
              />
              <YAxis
                yAxisId="left"
                stroke={t.axisStroke}
                tick={{ fill: t.axisTick, fontSize: 12 }}
                label={leftYAxisLabel ? { value: leftYAxisLabel, angle: -90, position: "insideLeft", offset: 5 } : undefined}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke={t.axisStroke}
                tick={{ fill: t.axisTick, fontSize: 12 }}
                label={rightYAxisLabel ? { value: rightYAxisLabel, angle: 90, position: "insideRight", offset: 5 } : undefined}
              />
              <Tooltip cursor={{ fill: t.tooltipCursor }} />
              <Legend />
              {bars.map((bar, i) => (
                <Bar
                  key={bar.key}
                  yAxisId="left"
                  dataKey={bar.key}
                  fill={barColor(i, bar.color)}
                  name={bar.label || bar.key}
                  barSize={bar.barSize ?? t.barSize}
                  radius={[2, 2, 0, 0]}
                />
              ))}
              {lines.map((line, i) => (
                <Line
                  key={line.key}
                  yAxisId="right"
                  type="monotone"
                  dataKey={line.key}
                  stroke={lineColor(i, line.color)}
                  strokeWidth={line.strokeWidth ?? 2.5}
                  dot={line.dot ?? { r: 3 }}
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
