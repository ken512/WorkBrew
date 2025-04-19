import { WifiSpeed,  WifiStability, SeatAvailability } from "@prisma/client";

type ButtonFieldsProps = {
  label: string;
  options: string[] | WifiSpeed[] | WifiStability[] | SeatAvailability[];
  required?: boolean; // boolean型であることを明示
  fieldName: string;
}

export const ButtonFields:ButtonFieldsProps[] = [
  {
    label: "Wi-Fiの有無",
    options: ["有", "無"],
    required: true,
    fieldName: "wifiAvailable",
  },
  {
    label: "Wi-Fiの速度(高速50Mbps以上、中速10~50Mbps、低速10Mbps未満)",
    options: ["高速", "中速", "低速"],
    fieldName: "wifiSpeed",
  },
  {
    label: "Wi-Fi安定(非常に安定(途切れない)、安定(時々途切れる)、不安定(頻繁に途切れる))",
    options: ["非常に安定", "安定", "不安定"],
    fieldName: "wifiStability",
  },
  {
    label: "電源の有無",
    options: ["有", "無"],
    required: true,
    fieldName: "powerOutlets",
  },
  {
    label: "空席状況",
    options: ["空いている", "混雑中", "満席"],
    required: true,
    fieldName: "seatAvailability",
  },
  {
    label: "おすすめ度",
    options: ["★", "★", "★"],
    fieldName: "starRating",
  }
];
