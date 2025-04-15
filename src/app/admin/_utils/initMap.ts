"use client";
//Googleマップを表示させるページ(/cafe_submission_form/[id])にインポートして活用
export const initMap = async (
  setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>,
  cafeList: {
    locationCoordinates: string;
    storeAddress: string;
    cafeName: string;
  }[] //投稿データ
) => {
  const mapElement = document.getElementById("map"); // マップを表示させるHTMLの箱
  const [latStr, lngStr] = cafeList[0].locationCoordinates.split(",");
  const lat = parseFloat(latStr.trim());
  const lng = parseFloat(lngStr.trim());
  
  /*googleマップの初期化(Google マップを画面に描画する)*/
  if (mapElement) {
    const map = new google.maps.Map(mapElement, {
      zoom: 16, //地図のズームレベル
      mapTypeId: google.maps.MapTypeId.ROADMAP, //種類（表示スタイル）を指定するプロパティ
      maxZoom: 25, //地図のズームレベルの最大値
      center: { lat, lng }, // ピン立ての位置を中心にする
    });
    console.log("Map element:", mapElement);
    setMap(map);

    {
      /*各カフェのピン（マーカー）を立てる*/
    }
    cafeList.forEach((cafe) => {
      const [latStr, lngStr] = cafe.locationCoordinates.split(",");
      const lat = parseFloat(latStr.trim());
      const lng = parseFloat(lngStr.trim());
      
      
      const marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: `${cafe.cafeName} - ${cafe.storeAddress}`,
      });
      //マーカークリック時に、情報をポップアップ表示させる(スマホ対応)
      const infoWindow = new google.maps.InfoWindow({
        content: `<div>${cafe.cafeName}<br/>${cafe.storeAddress}</div>`,
      });
      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    });

    console.log("Google Maps Object:", google.maps);
  } else {
    console.error("Google Maps API is not available");
  }
};
