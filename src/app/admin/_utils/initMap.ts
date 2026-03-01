"use client";

//Googleマップを表示させるページ(/cafe_submission_form/[id])にインポートして活用
export const initMap = async (
  setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>,
  cafeList: {
    latitude: number | null;
    longitude: number | null;
    storeAddress: string;
    cafeName: string;
  }[], //投稿データ
) => {
  const mapElement = document.getElementById("map"); // マップを表示させるHTMLの箱
  if (!mapElement) {
    console.error("Map element not found");
    return;
  }

  // 中心点にできる座標を持つカフェを探す
  const first = cafeList.find((c) => c.latitude != null && c.longitude != null);
  if (!first) {
    console.error("No valid coordinates in cafeList", cafeList);
    return;
  }
  const map = new google.maps.Map(mapElement, {
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    maxZoom: 25,
    center: { lat: first.latitude!, lng: first.longitude! },
  });

  setMap(map);

  cafeList.forEach((cafe) => {
    if (cafe.latitude == null || cafe.longitude == null) return;

    const marker = new google.maps.Marker({
      position: { lat: cafe.latitude, lng: cafe.longitude },
      map,
      title: `${cafe.cafeName} - ${cafe.storeAddress}`,
    });
    console.log("cafeList raw:", cafeList);
    const infoWindow = new google.maps.InfoWindow({
      content: `<div>${cafe.cafeName}<br/>${cafe.storeAddress}</div>`,
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  });
};
