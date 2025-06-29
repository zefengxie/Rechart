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

interface Props {
  visibleDates: Set<string>;
  visibleMakes: Set<string>;
  isLoading?: boolean;
}

const dummyData = [
  { x: 20, y: 30, z: 200, name: "Toyota" },
  { x: 40, y: 100, z: 260, name: "Ford" },
  { x: 25, y: 90, z: 300, name: "Mazda" },
];

export default function BubbleChart({ visibleDates, visibleMakes, isLoading = false }: Props) {
  return (
    <div className="chart-box">
      <h3 className="chart-title">Audience Buyer Journey Stages</h3>
      <p className="chart-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>


        {isLoading ? (
          <Center style={{ height: "100%" }}>
            <Loader color="teal" size="xl" />
          </Center>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid />
              <XAxis dataKey="x" name="Metric X" stroke="#ccc" />
              <YAxis dataKey="y" name="Metric Y" stroke="#ccc" />
              <ZAxis dataKey="z" range={[60, 400]} name="Value" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter name="Audience" data={dummyData} fill="#26c6da" />
            </ScatterChart>
          </ResponsiveContainer>
        )}
      </div>

  );
}
