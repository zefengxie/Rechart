// src/components/PieChartWidget.tsx
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Loader, Center } from "@mantine/core";

interface PieChartWidgetProps {
  data: { name: string; value: number }[];
  isLoading?: boolean;
}

const COLORS = ["#26c6da", "#66bb6a"];

const PieChartWidget: React.FC<PieChartWidgetProps> = ({ data, isLoading = false }) => {
  return (
    <div className="chart-box pie-chart-container">
      <h3 className="chart-title">New vs Used Audiences</h3>
      <p className="chart-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>


        {isLoading ? (
          <Center style={{ height: "100%" }}>
            <Loader color="teal" size="xl" />
          </Center>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="state"
                outerRadius={70}
                label={({ name, value }) => `${name}: ${value}`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

  );
};

export default PieChartWidget;
