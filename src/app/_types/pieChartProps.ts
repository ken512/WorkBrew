// types.ts
export type PieChartItem = {
  name: string;
  count: number;
  percentage?: number; // オプショナルにして柔軟性を持たせる
};

export type PieChartData = {
  [key: string]: PieChartItem[];
};