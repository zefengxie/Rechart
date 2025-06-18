// src/components/PieChartWidget.tsx
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface PieChartWidgetProps {
  data: { name: string; value: number }[];
}

const COLORS = ["#26c6da", "#66bb6a"];


const PieChartWidget: React.FC<PieChartWidgetProps> = ({ data }) => {
  console.log("PieChartWidget data:", data); // 确保组件被调用了

  return (
    <div className="chart-box">

      <h4>New vs Used Audiences</h4>
      <ResponsiveContainer width="100%" height={250}>
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
    </div>
  );
};

export default PieChartWidget;
