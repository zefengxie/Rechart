import React, { useMemo } from "react";
import { Treemap, ResponsiveContainer, Tooltip } from "recharts";
import { Loader, Center } from "@mantine/core";

interface DataItem {
  [key: string]: string | number;
}

interface Props {
  title: string;
  description?: string;
  data: DataItem[];
  dataKey: string;
  nameKey: string;
  colors?: string[];
  isLoading?: boolean;
}

const DEFAULT_COLORS = [
  "#e0f2f1", "#b2dfdb", "#80cbc4", "#4db6ac", "#26a69a",
  "#009688", "#00897b", "#00796b", "#00695c", "#004d40"
];

// ✅ 组件闭包工厂，用于渲染不同 nameKey/color
const createTreemapContent = (nameKey: string, colors: string[]) => {
  return function CustomContent(props: any) {
    const { x, y, width, height, index } = props;
    const name = props[nameKey];
    const color = colors[index % colors.length];

    return (
      <g>
        <rect x={x} y={y} width={width} height={height} style={{ fill: color, stroke: "#fff" }} />
        {width > 60 && height > 20 && (
          <text x={x + 4} y={y + 18} fill="#fff" fontSize={12}>
            {name}
          </text>
        )}
      </g>
    );
  };
};

const TreemapChartTemplate: React.FC<Props> = ({
  title,
  description,
  data,
  dataKey,
  nameKey,
  colors = DEFAULT_COLORS,
  isLoading = false
}) => {
  const CustomContent = useMemo(() => createTreemapContent(nameKey, colors), [nameKey, colors]);

  return (
    <div className="chart-box">
      <h3 className="chart-title">{title}</h3>
      {description && <p className="chart-description">{description}</p>}

      <div className="chart-wrapper" style={{ padding: "10px", height: 250 }}>
        {isLoading ? (
          <Center style={{ height: "100%" }}>
            <Loader color="teal" size="xl" />
          </Center>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={data}
              dataKey={dataKey}
              content={<CustomContent />}
            >
              <Tooltip />
            </Treemap>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default TreemapChartTemplate;
