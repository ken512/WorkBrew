// 検索結果（候補）を見せて選ばせるUIコンポーネント
// 状態は、CafePostFormで持たせる(CafePostFormで使うので)

import { PlaceCandidate } from "../types/placeCandidate";
export const CandidateDropdown = ({
  open,
  loading,
  candidates,
  onSelect,
}: {
  open: boolean;
  loading: boolean;
  candidates: PlaceCandidate[];
  onSelect: (c: PlaceCandidate) => void;
}) => {
  if (!open) return null;

  return (
    <div className="mt-2 rounded-3xl border bg-white shadow">
      {loading ? (
        <div className="p-4 text-sm text-black">
          ☕️ コーヒーを淹れています... お待ちください
        </div>
      ): candidates.length === 0 ? (
        <div className="p-4 text-sm text-gray-500">
          候補がありません
        </div>
      ):(
        <ul className="max-h-72 overflow-auto">
          {candidates.map((c) => (
            <li
            className="cursor-pointer px-4 py-3 hover:bg-gray-50"
            key={c.placeId}
            onMouseDown={(e)=> {
              e.preventDefault();
              onSelect(c);
            }}
            >
            <div className="text-sm font-semibold">{c.cafeName}</div>
            <div className="text-xs text-gray-500">{c.storeAddress}</div>
            </li>
          ))}
        </ul>
      )
    
    }
    </div>
  );
};
