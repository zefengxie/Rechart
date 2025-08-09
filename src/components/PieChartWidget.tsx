import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Loader, Center } from "@mantine/core";

type ChartTheme = {
  palette?: string[];
  tooltipCursor?: string;
};

const defaultTheme: Required<ChartTheme> = {
  palette: ["#26c6da", "#66bb6a", "#ffca28", "#ab47bc", "#42a5f5", "#ef5350"],
  tooltipCursor: "rgba(0,0,0,0.04)",
};

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
  height?: number;
  theme?: ChartTheme;     
}

const PieChartWidget: React.FC<Props> = ({
  title,
  description,
  data,
  dataKey,
  nameKey,
  colors,
  isLoading = false,
  height = 260,
  theme
}) => {
  const t = { ...defaultTheme, ...theme };
  const palette = colors && colors.length > 0 ? colors : t.palette;

  return (
    <div className="chart-box pie-chart-container">
      <h3 className="chart-title">{title}</h3>
      {description && <p className="chart-description">{description}</p>}

      {isLoading ? (
        <Center style={{ height: "100%" }}>
          <Loader color="teal" size="xl" />
        </Center>
      ) : (
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={nameKey}
              outerRadius={70}
              label={(entry) =>
                `${entry[nameKey as keyof typeof entry]}: ${entry[dataKey as keyof typeof entry]}`
              }
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={palette[index % palette.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default PieChartWidget;
