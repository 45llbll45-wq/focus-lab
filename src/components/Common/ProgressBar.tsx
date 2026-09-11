import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ProgressBarProps {
  progress: number; // 0 to 100
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  color?: 'primary' | 'highlight' | 'secondary' | 'blue' | 'yellow' | 'green';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  size = 'md',
  showLabel = false,
  color = 'primary',
  className
}) => {
  const clamped = Math.min(100, Math.max(0, progress));

  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  };

  const colorStyles = {
    primary: 'bg-[#3e2f59]',
    highlight: 'bg-[#c6ed58]',
    secondary: 'bg-[#dbb0cf]',
    blue: 'bg-[#3e2f59]',
    yellow: 'bg-[#c6ed58]',
    green: 'bg-[#c6ed58]'
  };

  return (
    <div className={twMerge('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-bold text-[#1e1b24] mb-1.5">
          <span>التقدم</span>
          <span className="font-mono">{Math.round(clamped)}%</span>
        </div>
      )}
      <div className={clsx('w-full bg-[#dbb0cf]/30 rounded-full overflow-hidden p-0.5 border border-[#dbb0cf]/40', sizeStyles[size])}>
        <div
          className={clsx('h-full rounded-full transition-all duration-500 ease-out', colorStyles[color])}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
export default ProgressBar;
