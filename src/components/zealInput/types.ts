export interface ZealInputProps {
  name: string;
  value: string;
  label?: string;
  placeholder: string;
  disabled?: boolean;
  classes?: string;
  width?: string;
  showErrorOnload?: boolean;
  onInputChange: (value: string) => void;
}
