import { CafeFormStateProps } from "./CafeFormStateProps";

export type CafeFormStateReturn = {
  formState: CafeFormStateProps;
  setFormState: React.Dispatch<React.SetStateAction<CafeFormStateProps>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  clearForm: () => void;
  onSubmit?: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}