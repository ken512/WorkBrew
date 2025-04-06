"use client";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { PieChartData } from "../_types/pieChartProps";
const COLORS = ["#00C49F", "#FFBB28", "#FF4444"]; // 緑・オレンジ・赤など

export const CafeStatusPieChart: React.FC<{ chartData: PieChartData }> = ({ chartData }) => {
  
  //日本語変換
  const categoryLabelMap: { [key: string]: string } = {
    wifiSpeed: "Wi-Fi速度",
    seatAvailability: "空席状況",
  };

console.log("チャートデータ:", chartData); 
  return (
    <div>
      {Object.entries(chartData).map(([category, data]) => (
        <div key={category} className="my-10">
          <h2 className="font-bold mb-2 ml-16">{categoryLabelMap[category] ?? category}</h2>
          <PieChart width={500} height={300}>
            <Pie
              dataKey="count"
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={({ name, percentage }) => `${name} (${percentage}%)`}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
        </div>
      ))}
    </div>
    
  );
  
};