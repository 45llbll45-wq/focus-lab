import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { TaskCategory, EnergyLevel, ContentFormat, ContentStatus } from '../../types';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'default' | 'primary' | 'accent' | 'soft' | 'outline' | 'success';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className
}) => {
  const baseStyles = 'inline-flex items-center gap-1 font-semibold rounded-full shrink-0 select-none';

  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm'
  };

  const variantStyles = {
    default: 'bg-slate-100 text-slate-700 border border-slate-200/80',
    primary: 'bg-sky-50 text-[#0284C7] border border-sky-200/80',
    accent: 'bg-amber-50 text-amber-800 border border-amber-200/80',
    soft: 'bg-slate-50 text-slate-600 border border-slate-200',
    outline: 'bg-transparent text-slate-600 border border-slate-300',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
  };

  return (
    <span className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className))}>
      {children}
    </span>
  );
};

export const CategoryBadge: React.FC<{ category: TaskCategory }> = ({ category }) => {
  const configs: Record<TaskCategory, { label: string; icon: string; className: string }> = {
    learn: { label: 'أتعلم', icon: '🧠', className: 'bg-sky-50 text-sky-700 border-sky-200/80' },
    build: { label: 'أبني', icon: '⚡', className: 'bg-indigo-50 text-indigo-700 border-indigo-200/80' },
    content: { label: 'محتوى', icon: '✍️', className: 'bg-amber-50 text-amber-800 border-amber-200/80' },
    other: { label: 'أخرى', icon: '🎯', className: 'bg-slate-100 text-slate-700 border-slate-200/80' }
  };

  const config = configs[category] || configs.other;

  return (
    <span className={twMerge('inline-flex items-center gap-1 font-semibold rounded-full px-2.5 py-0.5 text-xs border shadow-2xs', config.className)}>
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
};

export const EnergyBadge: React.FC<{ energy: EnergyLevel }> = ({ energy }) => {
  const configs: Record<EnergyLevel, { label: string; icon: string; className: string }> = {
    low: { label: 'طاقة منخفضة', icon: '🔋', className: 'bg-emerald-50 text-emerald-700 border-emerald-200/80' },
    medium: { label: 'طاقة متوسطة', icon: '⚡', className: 'bg-sky-50 text-sky-700 border-sky-200/80' },
    high: { label: 'طاقة عالية', icon: '🔥', className: 'bg-amber-50 text-amber-800 border-amber-200/80' }
  };

  const config = configs[energy] || configs.medium;

  return (
    <span className={twMerge('inline-flex items-center gap-1 font-medium rounded-full px-2.5 py-0.5 text-xs border shadow-2xs', config.className)}>
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
};

export const ContentFormatBadge: React.FC<{ format: ContentFormat }> = ({ format }) => {
  const configs: Record<ContentFormat, { label: string; className: string }> = {
    reel: { label: 'Reel 🎥', className: 'bg-purple-50 text-purple-700 border-purple-200/80' },
    carousel: { label: 'Carousel 📑', className: 'bg-blue-50 text-blue-700 border-blue-200/80' },
    post: { label: 'Post 📝', className: 'bg-amber-50 text-amber-800 border-amber-200/80' },
    tutorial: { label: 'Tutorial 🛠️', className: 'bg-emerald-50 text-emerald-700 border-emerald-200/80' }
  };

  const config = configs[format] || configs.post;

  return (
    <span className={twMerge('inline-flex items-center gap-1 font-semibold rounded-full px-2.5 py-0.5 text-xs border shadow-2xs', config.className)}>
      {config.label}
    </span>
  );
};

export const ContentStatusBadge: React.FC<{ status: ContentStatus }> = ({ status }) => {
  const configs: Record<ContentStatus, { label: string; className: string }> = {
    idea: { label: 'فكرة (Idea)', className: 'bg-slate-100 text-slate-700 border-slate-200' },
    draft: { label: 'مسودة (Draft)', className: 'bg-amber-50 text-amber-800 border-amber-200/80 font-semibold' },
    published: { label: 'تم النشر (Published) ✓', className: 'bg-emerald-50 text-emerald-700 border-emerald-200/80 font-semibold' }
  };

  const config = configs[status] || configs.idea;

  return (
    <span className={twMerge('inline-flex items-center gap-1 text-xs rounded-full px-2.5 py-0.5 border shadow-2xs', config.className)}>
      {config.label}
    </span>
  );
};
