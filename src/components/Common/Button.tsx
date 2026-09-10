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
    primary: 'bg-[#66693E] text-[#FFF8ED] hover:bg-[#525530] shadow-sm shadow-[#66693E]/20 hover:shadow-md hover:shadow-[#66693E]/30',
    accent: 'bg-[#31031F] text-[#FFF8ED] hover:bg-[#4A0A31] shadow-sm shadow-[#31031F]/20 hover:shadow-md hover:shadow-[#31031F]/30',
    secondary: 'bg-[#F4EDE0] text-[#31031F] hover:bg-[#EBDDCB] border border-[#EBDDCB]',
    outline: 'bg-white text-[#31031F] border border-[#EBDDCB] hover:border-[#D9C9B4] hover:bg-[#FAF4EB] shadow-2xs',
    ghost: 'bg-transparent text-[#393313] hover:text-[#31031F] hover:bg-[#F4EDE0]',
    danger: 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
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
