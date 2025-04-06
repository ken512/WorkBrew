"use client";
import React, {useState} from "react";
import { CafeDescription } from "@/app/_components/cafeDescription";
import { useParams } from "next/navigation";
import { UpdateStatus } from "@/app/_types/updateStatus";
import api from "@/_utils/api";
import { supabase } from "@/_utils/supabase";
import "../../globals.css";

const CafePostDetail: React.FC = () => {
  const [updateWiFiAndSeatStatus, setUpdateWiFiAndSeatStatus] = useState<UpdateStatus>({
    seatAvailability: null,
    wifiSpeed: null,
  });//seatAvailabilityとwifiSpeedの状態管理
  const {id} = useParams();
  
  const handleUpdate = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log("変換後に送信する値", updateWiFiAndSeatStatus);
    
   //tokenを保存して、更新制限を設ける(投稿主の更新可)
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
    // トークンが保存されていない場合
    if (!token) {
      console.error("トークンが保存されていません");
      alert("ログインしていないため、更新できません。");
      return; // トークンがない場合は処理を停止
    } else {
      console.log("保存されたトークン:", token);
    }
  
    // トークンが取得できた場合、PUTリクエストを送る
    if (id) {
      try {
        // トークンをヘッダーに設定して送信
        const data = await api.put(`/api/public/cafe_post/${id}`, updateWiFiAndSeatStatus);
        alert(data.message || "更新しました！！");
      } catch(error) {
        console.error("更新失敗しました。", error);
        alert('他のユーザーの投稿を更新する権限はありません!!');
        return;
      }
    }
  }; 

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