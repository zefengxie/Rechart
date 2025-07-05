// ✅ 模块化通用版本，保留原组件名
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
import { Loader, Center } from "@mantine/core";

interface GenericRawDataItem {
  [key: string]: any;
}

interface BarDefinition {
  key: string;
  color: string;
  label?: string;
  barSize?: number;
}

interface Props {
  rawData: GenericRawDataItem[];
  visibleDates: Set<string>;
  visibleMakes: Set<string>;
  isLoading: boolean;
  groupBy: string;
  bars: BarDefinition[];
  layout?: "vertical" | "horizontal";
  height?: number;
  title?: string;
  description?: string;
}

export default function BarChartStageWidget({
  rawData,
  visibleDates,
  visibleMakes,
  isLoading,
  groupBy,
  bars,
  layout = "vertical",
  height = 250,
  title = "",
  description = ""
}: Props) {
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
        grouped[key][bar.key] += d[bar.key] || 0;
      });
    });

    return Object.values(grouped);
  }, [rawData, visibleDates, visibleMakes, groupBy, bars]);

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
          <BarChart layout={layout} data={groupedData} margin={{ left: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis type={layout === "vertical" ? "number" : "category"} stroke="#ccc" />
            <YAxis
              type={layout === "vertical" ? "category" : "number"}
              dataKey={groupBy}
              stroke="#ccc"
            />
            <Tooltip />
            <Legend />
            {bars.map((bar) => (
              <Bar
                key={bar.key}
                dataKey={bar.key}
                fill={bar.color}
                barSize={bar.barSize || 10}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
