//googleマップの初期化(初期値を設定する)
//Googleマップを表示させるページ(/cafe_submission_form/[id])にインポートして活用
export const initMap = async (
  setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>,
) => {
  const mapElement = document.getElementById("map")

  if(mapElement) {
    const map = new google.maps.Map(mapElement, {
      zoom: 16,//地図のズームレベル
      mapTypeId: "DEMO_MAP_ID",//今は、ローカル環境のデフォルトIDを設定
      maxZoom: 25,//地図のズームレベルの最大値
      center: {lat: 35.659108, lng: 139.703728 }, // 渋谷駅の緯度と経度の初期位置を設定
      
    })

    setMap(map)
  } else {
    console.error("Google Maps API is not available");
  }
} 