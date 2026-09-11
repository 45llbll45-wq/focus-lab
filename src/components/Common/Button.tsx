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
    primary: 'bg-[#3e2f59] text-[#fcfbf8] hover:bg-[#2e2243] shadow-sm shadow-[#3e2f59]/20 hover:shadow-md hover:shadow-[#3e2f59]/30',
    accent: 'bg-[#c6ed58] text-[#1e1b24] hover:bg-[#b8e244] shadow-sm shadow-[#c6ed58]/30 font-black',
    secondary: 'bg-[#dbb0cf]/35 text-[#3e2f59] hover:bg-[#dbb0cf]/60 border border-[#dbb0cf]/70 font-bold',
    outline: 'bg-white text-[#1e1b24] border border-[#ece7de] hover:border-[#dbb0cf] hover:bg-[#fcfbf8] shadow-2xs',
    ghost: 'bg-transparent text-[#6b6475] hover:text-[#1e1b24] hover:bg-[#dbb0cf]/20',
    danger: 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
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
