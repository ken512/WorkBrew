"use client";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PieChartData } from "../_types/PieChartProps";
const COLORS = ["#00C49F", "#FFBB28", "#FF4444"]; // 緑・オレンジ・赤など

type ChartData = {
  name: string;
  percentage: number;
  cx: number;
  cy: number;
  midAngle: number;
  outerRadius: number;
  innerRadius: number;
  index: number;
};

export const CafeStatusPieChart: React.FC<{ chartData: PieChartData }> = ({
  chartData,
}) => {
  //日本語変換
  const categoryLabelMap: { [key: string]: string } = {
    wifiSpeed: "Wi-Fi速度",
    seatAvailability: "空席状況",
  };

  console.log("チャートデータ:", chartData);
  return (
    <div>
      {Object.entries(chartData).map(([category, data]) => (
        <div key={category} className="my-16 w-full h-[300px]">
          <h2 className="font-bold mb-2 ml-16">
            {categoryLabelMap[category] ?? category}
          </h2>
          {/*レスポンシブ対応チャートラップ */}
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                dataKey="count"
                data={data}
                cx="55%"
                cy="50%"
                outerRadius={70}
                fill="#8884d8"
                labelLine={false}
                label={({
                  cx,
                  cy,
                  midAngle,
                  outerRadius,
                  name,
                  percentage,
                  index,
                  innerRadius
                }: ChartData) => {
                  if (percentage === 0) return null;
                  const RADIAN = Math.PI / 180;
                  const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                    x={x < cx ? x + 20 : x - 10}
                    y={y < cy ? y : y + 10}
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                      fontSize={12}
                      fill={COLORS[index % COLORS.length]}
                    >
                      {`${name} (${percentage}%)`}
                    </text>
                  );
                }}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => {
                  const percentage = props.payload.percentage;
                  return percentage !== undefined
                    ? [`${value}件 (${percentage}%)`, name]
                    : [`${value}件`];
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
};
