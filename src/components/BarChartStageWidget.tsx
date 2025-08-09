import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { Loader, Center } from "@mantine/core";

interface GenericRawDataItem {
  [key: string]: any;
}

interface BarDefinition {
  key: string;
  color?: string;    
  label?: string;
  barSize?: number;
}


type BarChartTheme = {
  palette?: string[];     
  barSize?: number;       
  axisStroke?: string;
  axisTick?: string;
  gridStroke?: string;
  gridDash?: string;
  tooltipCursor?: string;
};

const defaultTheme: Required<BarChartTheme> = {
  palette: ["#26c6da", "#66bb6a", "#ffca28", "#ab47bc", "#42a5f5", "#ef5350"],
  barSize: 10,
  axisStroke: "#ccc",
  axisTick: "#64748b",
  gridStroke: "#444",
  gridDash: "3 3",
  tooltipCursor: "rgba(0,0,0,0.04)",
};

interface Props {
  rawData: GenericRawDataItem[];
  visibleDates: Set<string>;
  visibleMakes: Set<string>;


  theme?: BarChartTheme;

  isLoading: boolean;
  groupBy: string;
  bars: BarDefinition[];
  layout?: "vertical" | "horizontal";
  height?: number;
  title?: string;
  description?: string;
  className?: string;
}

export default function BarChartStageWidget({
  rawData,
  visibleDates,
  visibleMakes,
  theme,
  isLoading,
  groupBy,
  bars,
  layout = "vertical",
  height = 250,
  title = "",
  description = "",
  className,
}: Props) {
  const t = { ...defaultTheme, ...theme };

  const groupedData = useMemo(() => {
    const filtered = rawData.filter(
      (d) => visibleDates.has(d.date) && (!d.make || visibleMakes.has(d.make))
    );

    const grouped: Record<string, any> = {};
    filtered.forEach((d) => {
      const key = d[groupBy];
      if (!grouped[key]) {
        grouped[key] = { [groupBy]: key };
        bars.forEach((bar) => {
          grouped[key][bar.key] = 0;
        });
      }
      bars.forEach((bar) => {
        grouped[key][bar.key] += Number(d[bar.key] || 0);
      });
    });

    return Object.values(grouped);
  }, [rawData, visibleDates, visibleMakes, groupBy, bars]);

  const colorAt = (i: number, explicit?: string) =>
    explicit || t.palette[i % t.palette.length];

  return (
    <div className={`chart-box ${className || ""}`}>
      {title && <h3 className="chart-title">{title}</h3>}
      {description && <p className="chart-description">{description}</p>}

      {isLoading ? (
        <Center style={{ height }}>
          <Loader color="teal" size="xl" />
        </Center>
      ) : (
        <ResponsiveContainer width="100%" height={height}>
          <BarChart layout={layout} data={groupedData} margin={{ left: 40 }}>
            <CartesianGrid strokeDasharray={t.gridDash} stroke={t.gridStroke} />
            <XAxis
              type={layout === "vertical" ? "number" : "category"}
              stroke={t.axisStroke}
              tick={{ fill: t.axisTick, fontSize: 12 }}
            />
            <YAxis
              type={layout === "vertical" ? "category" : "number"}
              dataKey={groupBy}
              stroke={t.axisStroke}
              tick={{ fill: t.axisTick, fontSize: 12 }}
            />
            <Tooltip cursor={{ fill: t.tooltipCursor }} />
            <Legend />
            {bars.map((bar, i) => (
              <Bar
                key={bar.key}
                dataKey={bar.key}
                name={bar.label || bar.key}
                fill={colorAt(i, bar.color)}
                barSize={bar.barSize ?? t.barSize}
                radius={[2, 2, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
