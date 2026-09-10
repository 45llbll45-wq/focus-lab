import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ProgressBarProps {
  progress: number; // 0 to 100
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  color?: 'blue' | 'yellow' | 'green';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  size = 'md',
  showLabel = false,
  color = 'blue',
  className
}) => {
  const clamped = Math.min(100, Math.max(0, progress));

  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  };

  const colorStyles = {
    blue: 'bg-[#4F46E5]',
    yellow: 'bg-amber-500',
    green: 'bg-emerald-500'
  };

  return (
    <div className={twMerge('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-semibold text-slate-600 mb-1.5">
          <span>التقدم</span>
          <span className="font-mono">{Math.round(clamped)}%</span>
        </div>
      )}
      <div className={clsx('w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60', sizeStyles[size])}>
        <div
          className={clsx('h-full rounded-full transition-all duration-500 ease-out', colorStyles[color])}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
