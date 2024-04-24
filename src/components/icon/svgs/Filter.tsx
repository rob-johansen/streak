import React from 'react';
import { twMerge } from 'tailwind-merge';
import type { IconProps } from '@/components/icon/Icon'

export const Filter = ({
  className,
  primary = '#000000'
}: IconProps) => {
  className = twMerge('w-[24px]', className);
  return (
    <svg viewBox="0 0 512 512" className={className}>
      <path
        d="M32 144h448M112 256h288M208 368h96"
        fill="none"
        stroke={primary}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
    </svg>
  );
};
