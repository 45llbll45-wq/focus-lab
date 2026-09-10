import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'start',
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-2xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none';

  const sizeStyles = {
    sm: 'px-3.5 py-2 text-sm gap-1.5 h-10',
    md: 'px-5 py-3 text-base gap-2 h-12',
    lg: 'px-6 py-3.5 text-lg font-semibold gap-2.5 h-14 shadow-sm'
  };

  const variantStyles = {
    primary: 'bg-[#017CC3] text-white hover:bg-[#0169a5] shadow-[0_4px_14px_rgba(1,124,195,0.25)] hover:shadow-[0_6px_20px_rgba(1,124,195,0.35)]',
    accent: 'bg-[#FFE902] text-[#0F172A] font-bold hover:bg-[#edd600] shadow-[0_4px_14px_rgba(255,233,2,0.35)] hover:shadow-[0_6px_20px_rgba(255,233,2,0.45)]',
    secondary: 'bg-[#ADD4E5]/30 text-[#017CC3] hover:bg-[#ADD4E5]/50 border border-[#ADD4E5]/50',
    outline: 'bg-transparent text-[#0F172A] border-2 border-slate-200 hover:border-[#017CC3] hover:text-[#017CC3] hover:bg-slate-50',
    ghost: 'bg-transparent text-slate-600 hover:text-[#0F172A] hover:bg-slate-100',
    danger: 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200'
  };

  return (
    <button
      className={twMerge(
        clsx(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          fullWidth && 'w-full',
          className
        )
      )}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'start' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'end' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
