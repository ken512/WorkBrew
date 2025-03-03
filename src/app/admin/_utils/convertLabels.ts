//マッピングオブジェクトを使用して、空き状況とWi-Fi速度を日本語に変換
export const convertSeatAvailability = (status: string) => {
  const seatStatusMap: {[key: string]: string} = {
    "AVAILABLE": "空いている",
    "CROWDED": "混雑中",
    "FULL": "満席",
  }
  return seatStatusMap[status] || "不明"; //未入力の場合は不明と表示
}

export const convertWifiSpeed = (status: string) => {
  const wifiStatusMap: {[key: string]: string} = {
    "HIGH": "高速",
    "MEDIUM": "中速",
    "LOW": "低速",
  }
  return wifiStatusMap[status] || "不明"
}