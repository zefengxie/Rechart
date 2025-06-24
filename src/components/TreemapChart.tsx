import React, { useMemo } from "react";
import { Treemap, ResponsiveContainer, Tooltip } from "recharts";
import { Loader, Center } from "@mantine/core";

interface TreemapChartProps {
  rawData: any[];
  visibleDates: Set<string>;
  visibleMakes: Set<string>;
  isLoading?: boolean;
}

const COLORS = [
  "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b",
  "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
];

const CustomizedContent = (props: any) => {
  const { x, y, width, height, index, name } = props;
  const color = COLORS[index % COLORS.length];

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{ fill: color, stroke: "#fff" }}
      />
      {width > 60 && height > 20 && (
        <text x={x + 4} y={y + 18} fill="#fff" fontSize={12}>
          {name}
        </text>
      )}
    </g>
  );
};

export default function TreemapChart({
  rawData,
  visibleDates,
  visibleMakes,
  isLoading = false,
}: TreemapChartProps) {
  const processedData = useMemo(() => {
    const grouped: Record<string, { name: string; size: number }> = {};
    rawData.forEach(d => {
      if (visibleDates.has(d.date) && visibleMakes.has(d.make)) {
        const key = d.make || "Unknown";
        if (!grouped[key]) {
          grouped[key] = { name: key, size: 0 };
        }
        grouped[key].size += d.size || 1;
      }
    });
    return Object.values(grouped);
  }, [rawData, visibleDates, visibleMakes]);

  return (
    <div className="chart-box">
      <h3 className="chart-title">Treemap View</h3>
      <p className="chart-description">
        Visualizes vehicle segment distribution across makes. The larger the box, the more vehicles in that segment.
      </p>

      <div className="chart-wrapper" style={{ padding: "10px", height: 250 }}>
        {isLoading ? (
          <Center style={{ height: "100%" }}>
            <Loader color="teal" size="xl" />
          </Center>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={processedData}
              dataKey="size"
              content={<CustomizedContent />}
            >
              <Tooltip />
            </Treemap>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
