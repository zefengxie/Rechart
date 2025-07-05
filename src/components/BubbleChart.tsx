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
  data: any[];
  xKey: string;
  yKey: string;
  zKey: string;
  title?: string;
  description?: string;
  isLoading?: boolean;
}

export default function BubbleChart({
  data,
  xKey,
  yKey,
  zKey,
  title = "",
  description = "",
  isLoading = false
}: Props) {
  return (
    <div className="chart-box">
      {title && <h3 className="chart-title">{title}</h3>}
      {description && <p className="chart-description">{description}</p>}

      {isLoading ? (
        <Center style={{ height: 300 }}>
          <Loader color="teal" size="xl" />
        </Center>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid />
            <XAxis dataKey={xKey} name="X Metric" stroke="#ccc" />
            <YAxis dataKey={yKey} name="Y Metric" stroke="#ccc" />
            <ZAxis dataKey={zKey} name="Bubble Size" range={[60, 400]} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name="Data" data={data} fill="#26c6da" />
          </ScatterChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
