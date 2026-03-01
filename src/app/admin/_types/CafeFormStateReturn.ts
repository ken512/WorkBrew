import { CafeFormStateProps } from "./CafeFormStateProps";
import { useNearbySearchParams } from "../cafe_submission_form/hooks/useNearbySearchParams";

export type CafeFormStateReturn = {
  formState: CafeFormStateProps;
  setFormState: React.Dispatch<React.SetStateAction<CafeFormStateProps>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  clearForm: () => void;
  onSubmit?: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  nearby: ReturnType<typeof useNearbySearchParams>; // 関数の戻り値型を取得
}