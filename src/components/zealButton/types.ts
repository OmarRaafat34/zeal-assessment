import type { ReactNode } from "react";

export interface ZealButtonProps {
  click?: () => void;
  children?: ReactNode;
  disabled?: boolean;
  clicked?: boolean;
  correctAnswer?: boolean;
  width?: string;
  question?: boolean;
}
