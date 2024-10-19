"use client";

import { Card } from "@radix-ui/themes";
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  Rectangle,
} from "recharts";

interface Props {
  open: number;
  closed: number;
  inProgress: number;
}

const IssueChart = ({ open, closed, inProgress }: Props) => {
  const data = [
    { label: "Open", value: open },
    { label: "In-Progress", value: inProgress },
    { label: "Closed", value: closed },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={330}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="value"
            barSize={60}
            fill="#FF5F5E"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
