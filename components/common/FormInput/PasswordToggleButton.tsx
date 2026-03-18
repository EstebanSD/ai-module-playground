import { EyeIcon, EyeOffIcon } from 'lucide-react';

type PasswordToggleButtonProps = {
  showPassword: boolean;
  onToggle: () => void;
  disabled: boolean;
};

export function PasswordToggleButton({
  showPassword,
  onToggle,
  disabled,
}: PasswordToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      className="absolute inset-y-0 right-3 flex items-center text-gray-500"
      aria-label={showPassword ? 'Hide password' : 'Show password'}
    >
      {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
    </button>
  );
}
