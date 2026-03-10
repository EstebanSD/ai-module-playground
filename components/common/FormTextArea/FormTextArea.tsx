'use client';

import { useCallback, useEffect, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { FieldError, Textarea } from '@/components/ui';

import { FormInputLabel } from '../FormInputLabel';
import { getCharCountColor } from './getCharCountColor';

type FormTextAreaProps = {
  name: string;
  label?: string;
  labelIcon?: React.ReactNode;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  showCharCount?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  autoResize?: boolean;
  minRows?: number;
  maxRows?: number;
};

export function FormTextArea({
  name,
  label = '',
  labelIcon = null,
  required = false,
  placeholder,
  disabled = false,
  rows = 3,
  maxLength,
  showCharCount = true,
  resize = 'vertical',
  autoResize = false,
  minRows = 3,
  maxRows = 10,
}: FormTextAreaProps) {
  const { control } = useFormContext();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea || !autoResize) return;

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto';

    const style = window.getComputedStyle(textarea);
    const lineHeight = parseInt(style.lineHeight) || 16;
    const minHeight = lineHeight * minRows;
    const maxHeight = lineHeight * maxRows;

    const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
    textarea.style.height = `${newHeight}px`;
  }, [autoResize, minRows, maxRows]);

  useEffect(() => {
    if (autoResize) {
      adjustHeight();
    }
  }, [adjustHeight, autoResize]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const currentLength = field.value?.length || 0;

        return (
          <div className="w-full">
            <FormInputLabel
              htmlFor={name}
              label={label}
              labelIcon={labelIcon}
              inputRequired={required}
            />

            <Textarea
              id={name}
              placeholder={placeholder}
              disabled={disabled}
              rows={autoResize ? minRows : rows}
              maxLength={maxLength}
              className={cn(
                autoResize ? 'resize-none overflow-hidden' : resize && `resize-${resize}`,
              )}
              {...field}
              ref={textareaRef}
              onChange={(e) => {
                field.onChange(e);
                if (autoResize) {
                  adjustHeight();
                }
              }}
            />

            {maxLength && showCharCount && (
              <div className="flex justify-between items-center mt-0.5">
                <div className="flex-1">
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </div>
                <p
                  className={cn('text-xs text-right', getCharCountColor(currentLength, maxLength))}
                >
                  {currentLength} / {maxLength}
                </p>
              </div>
            )}

            {(!maxLength || !showCharCount) && fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </div>
        );
      }}
    />
  );
}
