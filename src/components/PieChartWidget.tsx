import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Loader, Center } from "@mantine/core";

interface DataItem {
  [key: string]: string | number;
}

interface Props {
  title: string;
  description?: string;
  data: DataItem[];
  dataKey: string;         // 数值字段
  nameKey: string;         // 标签字段
  colors?: string[];
  isLoading?: boolean;
}

const PieChartTemplate: React.FC<Props> = ({
  title,
  description,
  data,
  dataKey,
  nameKey,
  colors = ["#26c6da", "#66bb6a"],
  isLoading = false
}) => {
  return (
    <div className="chart-box pie-chart-container">
      <h3 className="chart-title">{title}</h3>
      {description && <p className="chart-description">{description}</p>}

      {isLoading ? (
        <Center style={{ height: "100%" }}>
          <Loader color="teal" size="xl" />
        </Center>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={nameKey}
              outerRadius={70}
              label={(entry) =>
                `${entry[nameKey as keyof typeof entry]}: ${entry[dataKey as keyof typeof entry]}`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default PieChartTemplate;
