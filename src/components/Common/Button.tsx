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
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none';

  const sizeStyles = {
    sm: 'px-3.5 py-2 text-xs gap-1.5 h-9',
    md: 'px-4 py-2.5 text-sm gap-2 h-11',
    lg: 'px-6 py-3.5 text-base gap-2.5 h-13 shadow-xs'
  };

  const variantStyles = {
    primary: 'bg-[#0284C7] text-white hover:bg-[#0369A1] shadow-sm shadow-sky-600/20 hover:shadow-md hover:shadow-sky-600/30',
    accent: 'bg-[#F59E0B] text-white hover:bg-[#D97706] shadow-sm shadow-amber-500/20 hover:shadow-md hover:shadow-amber-500/30',
    secondary: 'bg-sky-50 text-[#0284C7] hover:bg-sky-100 border border-sky-200/70',
    outline: 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 shadow-xs',
    ghost: 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100',
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
export default Button;
