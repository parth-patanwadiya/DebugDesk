"use client";

import { Card } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
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

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Prevent rendering until mounted

  return (
    <Card className="w-full">
      <div className="h-[330px] md:h-[330px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="label" />
            <YAxis />
            <Bar dataKey="value" barSize={60} fill="#FF5F5E" />
            <LabelList dataKey="value" position="top" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default IssueChart;
