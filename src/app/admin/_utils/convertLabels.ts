//マッピングオブジェクトを使用して、空き状況とWi-Fi速度を日本語に変換
{/*空席状況*/}
export const convertSeatAvailability = (status: string) => {
  const seatStatusMap: {[key: string]: string} = {
    AVAILABLE: "空いている",
    CROWDED: "混雑中",
    FULL: "満席",
  }
  return seatStatusMap[status] || "不明"; //未入力の場合は不明と表示
}

{/*Wi-Fi速度*/}
export const convertWifiSpeed = (status: string) => {
  const wifiStatusMap: {[key: string]: string} = {
    "HIGH": "高速",
    "MEDIUM": "中速",
    "LOW": "低速",
  }
  return wifiStatusMap[status] || "不明"
}

{/*Wi-Fi安定*/}
export const convertWifiStability = (status: string) => {
  const wifiStabilityMap: {[key: string]: string} = {
    "VERY_STABLE": "非常に安定",
    "STABLE": "安定",
    "UNSTABLE": "不安定",
  }
  return wifiStabilityMap[status] || "不明"
}

{/*Wi-Fiの有無*/}
export const convertWifiAvailable = (status: string | boolean | null) => {
  const wifiAvailableMap: {[key: string]: string} = {
    "TRUE": "有",
    "FALSE": "無",
  }
  return wifiAvailableMap[String(status).toUpperCase()] || "不明"
}

{/*電源の有無*/}
export const convertPowerOutlets = (status: string | boolean | null) => {
  const powerOutletsMap: {[key: string]: string} = {
    "TRUE": "有",
    "FALSE": "無",
  }
  return powerOutletsMap[String(status).toUpperCase()] || "不明"
}