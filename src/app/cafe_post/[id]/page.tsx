"use client";
import React, {useState} from "react";
import { CafeDescription } from "@/app/_components/cafeDescription";
import { useParams } from "next/navigation";
import { UpdateStatus } from "@/app/_types/updateStatus";

const CafePostDetail: React.FC = () => {
  const [updateWiFiAndSeatStatus, setUpdateWiFiAndSeatStatus] = useState<UpdateStatus>({
    seatAvailability: null,
    wifiSpeed: null,
  });//seatAvailabilityとwifiSpeedの状態管理
  const {id} = useParams();
  const handleUpdate = async(e:React.FormEvent) => {
    e.preventDefault();
    console.log("変換前の状態", updateWiFiAndSeatStatus);
  console.log("変換後に送信する値", updateWiFiAndSeatStatus);

    try {
      const response = await fetch(`/api/public/cafe_post/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateWiFiAndSeatStatus),
      });
      const data = await response.json();
      if(!response.ok) {
        console.log("更新に失敗しました:", data);
        throw new Error(data.message || "更新失敗");
      }
      alert(data.message || "更新完了しました");
    } catch(error) {
      console.log("更新失敗:", error);
      alert(error instanceof Error ? error.message : "更新に失敗しました")
    }
  }

  return (
    <div className="bg-beige-200 min-h-screen">
    <CafeDescription
    updateWiFiAndSeatStatus={updateWiFiAndSeatStatus}
    setUpdateWiFiAndSeatStatus={setUpdateWiFiAndSeatStatus}
    updateState={(key, value) => {
      setUpdateWiFiAndSeatStatus((prev) => ({
        ...prev,
        [key]: value,
      }))
    }}
    onUpdate={handleUpdate}
    />
    </div>
  )
}
export default CafePostDetail;