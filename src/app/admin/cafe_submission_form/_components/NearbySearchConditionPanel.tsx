import { useNearbySearchParams } from "../hooks/useNearbySearchParams";
// useNearbySearchParams の「戻り値の型」を ReturnType で取得し、型定義を二重管理しない。
// NearbySearchConditionPanel は条件UI専用コンポーネントなので、
// Pick で必要なキーだけに絞って「依存範囲」を最小化する（勝手な依存追加を防ぐ）。
// その結果、フック側の戻り値が拡張/変更されても影響が局所化され、型エラーで気づける。
type Nearby = ReturnType<typeof useNearbySearchParams>;

type NearbySearchConditionModel = {
  nearby: Pick<
    Nearby,
    | "params"
    | "radius"
    | "setRadius"
    | "rankPreference"
    | "setRankPreference"
    | "maxResultCount"
    | "setMaxResultCount"
    | "setLanguageCode"
    | "includedTypes"
    | "setIncludedTypes"
  >;
};

export const NearbySearchConditionPanel = ({
  nearby,
}: NearbySearchConditionModel) => {

  const {
    params,
    radius,
    rankPreference,
    maxResultCount,
    includedTypes,
    setRadius,
    setRankPreference,
    setMaxResultCount,
    setIncludedTypes,
  } = nearby;

  return (
    <div className="w-[700px] sm:w-full rounded-3xl border bg-white p-5 mb-6">
      <div className="font-bold mb-4">周辺検索の条件</div>

      {/* 1) radius */}
      <div className="mb-5">
        <label className="block text-sm mb-2">検索半径: {radius}m</label>
        <input
          className="w-full"
          type="range"
          min={100}
          max={500}
          step={50}
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
        />
        <div className="text-xs text-gray-500 mt-1">
          狭いほど候補が絞られ、広いほど候補が増えます
        </div>
      </div>

      {/* 2) rankPreference */}
      <div className="mb-5">
        <label className="block text-sm mb-2">並び順</label>
        <select
          className="w-full rounded-2xl border p-3"
          value={rankPreference}
          onChange={(e) => setRankPreference(e.target.value as any)}
        >
          <option value="DISTANCE">距離が近い順</option>
          <option value="POPULARITY">人気順</option>
        </select>
      </div>

      {/* 3) maxResultCount */}
      <div className="mb-5">
        <label className="block text-sm mb-2">候補件数</label>
        <select
          className="w-full rounded-2xl border p-3"
          value={maxResultCount ?? 50}
          onChange={(e) => setMaxResultCount(Number(e.target.value))}
        >
          <option value={5}>5件</option>
          <option value={10}>10件</option>
          <option value={20}>20件</option>
        </select>
      </div>

      {/* 5) includedTypes */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={(includedTypes ?? []).includes("cafe")}
          onChange={(e) =>
            setIncludedTypes(e.target.checked ? ["cafe"] : undefined)
          }
        />
        <span className="text-sm">カフェに絞る</span>
      </div>

      {/* paramsが無い時の注意表示（現在地未取得） */}
      {!params && (
        <div className="mt-4 text-xs text-red-500">
          現在地が取得できていないため、周辺検索は実行できません
        </div>
      )}
    </div>
  );
};
