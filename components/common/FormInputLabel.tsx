import { AsteriskIcon } from 'lucide-react';
import { FieldLabel } from '../ui';

type FormInputLabelProps = {
  htmlFor: string;
  label?: string;
  labelIcon?: React.ReactNode;
  inputRequired?: boolean;
};

export function FormInputLabel({ htmlFor, label, labelIcon, inputRequired }: FormInputLabelProps) {
  if (!label) {
    return null;
  }

  return (
    <FieldLabel
      htmlFor={htmlFor}
      aria-required={inputRequired || undefined}
      className="flex items-center gap-1 data-[error=true]:text-foreground"
    >
      {labelIcon && <span>{labelIcon}</span>}
      <span>{label}</span>
      {inputRequired && <AsteriskIcon className="text-destructive w-3 h-3" />}
    </FieldLabel>
  );
}
