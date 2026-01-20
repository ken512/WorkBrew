import { useState, useCallback } from "react";
import { Coordinate } from "../types/coordinate";
// 現在地のみを取得するカスタムフック

// 現在地を1回取得（Promise化して await できるようにしてる）
const getPosition = (option?: PositionOptions) =>
  new Promise<GeolocationPosition>((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("この環境では位置情報を利用できません"));
      return;
    }
    // 1回取得して、成功ならresolve(pos) 失敗ならreject(err)が呼ばれる。
    navigator.geolocation.getCurrentPosition(resolve, reject, option);
  });
// エラーメッセージ(unknownで型を安全にstring変換)
const toErrorMessage = (err: unknown) => {
  if (err instanceof Error) return err.message;
  return "位置情報の取得に失敗しました";
};

// location / error / isLoading の状態管理＋取得関数を提供
export const useCurrentLocation = () => {
  const [location, setLocation] = useState<Coordinate | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCurrentLocation = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const pos = await getPosition({ timeout: 10000, maximumAge: 60000 });
      setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    } catch (err: unknown) {
      setError(toErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 位置情報をキャンセルした場合、リセット(error/loading も含めて初期化)
  const reset = useCallback(() => {
    setLocation(undefined);
    setError(null);
    setIsLoading(false);
  }, []);

  return { location, error, isLoading, getCurrentLocation, reset };
};
