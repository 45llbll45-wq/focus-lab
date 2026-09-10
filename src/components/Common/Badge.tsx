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
  const baseStyles = 'inline-flex items-center gap-1 font-medium rounded-full shrink-0 select-none';

  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm'
  };

  const variantStyles = {
    default: 'bg-slate-100 text-slate-700 border border-slate-200/80',
    primary: 'bg-[#017CC3]/10 text-[#017CC3] border border-[#017CC3]/20 font-semibold',
    accent: 'bg-[#FFE902]/40 text-[#856c00] border border-[#FFE902]/60 font-semibold',
    soft: 'bg-[#ADD4E5]/30 text-[#01588c] border border-[#ADD4E5]/50',
    outline: 'bg-transparent text-slate-600 border border-slate-300',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200'
  };

  return (
    <span className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className))}>
      {children}
    </span>
  );
};

export const CategoryBadge: React.FC<{ category: TaskCategory; size?: 'sm' | 'md' }> = ({ category, size = 'sm' }) => {
  const configs: Record<TaskCategory, { label: string; icon: string; variant: BadgeProps['variant'] }> = {
    learn: { label: 'أتعلم', icon: '🧠', variant: 'primary' },
    build: { label: 'أبني', icon: '⚡', variant: 'accent' },
    content: { label: 'محتوى', icon: '✍️', variant: 'soft' },
    other: { label: 'أخرى', icon: '🎯', variant: 'default' }
  };

  const config = configs[category] || configs.other;

  return (
    <Badge variant={config.variant} size={size}>
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </Badge>
  );
};

export const EnergyBadge: React.FC<{ energy: EnergyLevel }> = ({ energy }) => {
  const configs: Record<EnergyLevel, { label: string; icon: string; className: string }> = {
    low: { label: 'طاقة منخفضة', icon: '🔋', className: 'bg-amber-50 text-amber-800 border-amber-200' },
    medium: { label: 'طاقة متوسطة', icon: '⚡', className: 'bg-sky-50 text-sky-800 border-sky-200' },
    high: { label: 'طاقة عالية', icon: '🔥', className: 'bg-rose-50 text-rose-800 border-rose-200' }
  };

  const config = configs[energy] || configs.medium;

  return (
    <span className={twMerge('inline-flex items-center gap-1 font-medium rounded-full px-2.5 py-0.5 text-xs border', config.className)}>
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
};

export const ContentFormatBadge: React.FC<{ format: ContentFormat }> = ({ format }) => {
  const configs: Record<ContentFormat, { label: string; className: string }> = {
    reel: { label: 'Reel 🎥', className: 'bg-purple-50 text-purple-700 border-purple-200' },
    carousel: { label: 'Carousel 📑', className: 'bg-blue-50 text-blue-700 border-blue-200' },
    post: { label: 'Post 📝', className: 'bg-amber-50 text-amber-700 border-amber-200' },
    tutorial: { label: 'Tutorial 🛠️', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
  };

  const config = configs[format] || configs.post;

  return (
    <span className={twMerge('inline-flex items-center gap-1 font-semibold rounded-full px-2.5 py-0.5 text-xs border', config.className)}>
      {config.label}
    </span>
  );
};

export const ContentStatusBadge: React.FC<{ status: ContentStatus }> = ({ status }) => {
  const configs: Record<ContentStatus, { label: string; className: string }> = {
    idea: { label: 'فكرة (Idea)', className: 'bg-slate-100 text-slate-700 border-slate-200' },
    draft: { label: 'مسودة (Draft)', className: 'bg-[#FFE902]/30 text-amber-900 border-[#FFE902]/70 font-semibold' },
    published: { label: 'تم النشر (Published)', className: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold' }
  };

  const config = configs[status] || configs.idea;

  return (
    <span className={twMerge('inline-flex items-center gap-1 text-xs rounded-full px-2.5 py-0.5 border', config.className)}>
      {config.label}
    </span>
  );
};
