"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface IncomeChartProps {
  data: any[];
}

export const IncomeChart = ({ data }: IncomeChartProps) => {
  // Format data for Recharts (group by date)
  const chartData = data
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((entry) => ({
      date: new Date(entry.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      amount: entry.amount,
    }));

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2d5a7a" opacity={0.3} />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#c9b8a0", fontSize: 10, fontWeight: "bold" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#c9b8a0", fontSize: 10, fontWeight: "bold" }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#132d44",
              border: "1px solid #2d5a7a",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#fff"
            }}
            itemStyle={{ color: "#d4af37" }}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#d4af37"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorAmount)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
