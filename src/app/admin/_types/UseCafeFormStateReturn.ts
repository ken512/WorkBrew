import { CafeFormStateProps } from "./CafeFormStateProps";

export type UseCafeFormStateReturn = {
  formState: CafeFormStateProps;
  setFormState: React.Dispatch<React.SetStateAction<CafeFormStateProps>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  clearForm:() => void;
}