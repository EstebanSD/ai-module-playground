'use client';

import { useState } from 'react';

export function usePasswordToggle(initialValue = false) {
  const [showPassword, setShowPassword] = useState(initialValue);

  const toggle = () => setShowPassword((prev) => !prev);

  const getInputType = (baseType: string) => {
    if (baseType === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return baseType;
  };

  return { showPassword, toggle, getInputType };
}
