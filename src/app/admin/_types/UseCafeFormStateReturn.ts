import { CafeFormStateProps } from "./cafeFormStateProps";

export type UseCafeFormStateReturn = {
  formState: CafeFormStateProps;
  setFormState: React.Dispatch<React.SetStateAction<CafeFormStateProps>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  clearForm: () => void;
}