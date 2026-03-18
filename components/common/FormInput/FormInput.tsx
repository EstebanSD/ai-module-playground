'use client';

import { HTMLInputAutoCompleteAttribute } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Field, FieldError, Input } from '@/components/ui';
import { FormInputLabel } from '../FormInputLabel';
import { usePasswordToggle } from './usePasswordToggle';
import { PasswordToggleButton } from './PasswordToggleButton';

type FormInputProps = {
  name: string;
  label?: string;
  labelIcon?: React.ReactNode;
  required?: boolean;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'tel';
  autoComplete?: HTMLInputAutoCompleteAttribute;
  showIconPassword?: boolean;
  disabled?: boolean;
  className?: string;
};

export function FormInput({
  name,
  label = '',
  labelIcon = null,
  required = false,
  placeholder,
  type = 'text',
  autoComplete = 'off',
  showIconPassword = true,
  disabled = false,
  className = '',
}: FormInputProps) {
  const { control } = useFormContext();
  const { showPassword, toggle, getInputType } = usePasswordToggle();

  const inputType = getInputType(type);

  const shouldShowToggle = type === 'password' && showIconPassword;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className}>
          <FormInputLabel
            htmlFor={field.name}
            label={label}
            labelIcon={labelIcon}
            inputRequired={required}
          />

          <div className="relative">
            <Input
              {...field}
              id={field.name}
              type={inputType}
              aria-invalid={fieldState.invalid}
              autoComplete={autoComplete}
              placeholder={placeholder}
              inputMode={inputType === 'tel' ? 'numeric' : undefined}
              disabled={disabled}
            />
            {shouldShowToggle && (
              <PasswordToggleButton
                showPassword={showPassword}
                onToggle={toggle}
                disabled={disabled}
              />
            )}
          </div>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
