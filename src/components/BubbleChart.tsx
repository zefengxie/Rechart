import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Loader, Center } from "@mantine/core";

type ChartTheme = {
  palette?: string[];
  axisStroke?: string;
  axisTick?: string;
  gridStroke?: string;
  gridDash?: string;
  tooltipCursor?: string;
};

const defaultTheme: Required<ChartTheme> = {
  palette: ["#26c6da", "#66bb6a", "#ffca28", "#ab47bc", "#42a5f5", "#ef5350"],
  axisStroke: "#ccc",
  axisTick: "#64748b",
  gridStroke: "#444",
  gridDash: "3 3",
  tooltipCursor: "rgba(0,0,0,0.04)",
};

interface Props {
  data: any[];
  xKey: string;
  yKey: string;
  zKey: string;
  title?: string;
  description?: string;
  isLoading?: boolean;
  height?: number;
  theme?: ChartTheme;  
}

export default function BubbleChart({
  data,
  xKey,
  yKey,
  zKey,
  title = "",
  description = "",
  isLoading = false,
  height = 300,
  theme
}: Props) {
  const t = { ...defaultTheme, ...theme };

  return (
    <div className="chart-box">
      {title && <h3 className="chart-title">{title}</h3>}
      {description && <p className="chart-description">{description}</p>}

      {isLoading ? (
        <Center style={{ height }}>
          <Loader color="teal" size="xl" />
        </Center>
      ) : (
        <ResponsiveContainer width="100%" height={height}>
          <ScatterChart margin={{ left: 24, right: 16 }}>
            <CartesianGrid strokeDasharray={t.gridDash} stroke={t.gridStroke} />
            <XAxis dataKey={xKey} stroke={t.axisStroke} tick={{ fill: t.axisTick, fontSize: 12 }} />
            <YAxis dataKey={yKey} stroke={t.axisStroke} tick={{ fill: t.axisTick, fontSize: 12 }} />
            <ZAxis dataKey={zKey} range={[60, 400]} />
            <Tooltip cursor={{ strokeDasharray: t.gridDash }} />
            <Scatter name="Data" data={data} fill={t.palette[0]} />
          </ScatterChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
