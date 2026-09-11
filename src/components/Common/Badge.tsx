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
    default: 'bg-[#ece7de] text-[#1e1b24] border border-[#e0d9cd]',
    primary: 'bg-[#3e2f59] text-[#c6ed58] border border-[#3e2f59] font-bold',
    accent: 'bg-[#c6ed58] text-[#1e1b24] border border-[#b8e244] font-bold',
    soft: 'bg-[#dbb0cf]/35 text-[#3e2f59] border border-[#dbb0cf]/60 font-bold',
    outline: 'bg-transparent text-[#6b6475] border border-[#ece7de]',
    success: 'bg-[#c6ed58] text-[#1e1b24] border border-[#b8e244] font-bold'
  };

  return (
    <span className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className))}>
      {children}
    </span>
  );
};

export const CategoryBadge: React.FC<{ category: TaskCategory }> = ({ category }) => {
  const configs: Record<TaskCategory, { label: string; icon: string; className: string }> = {
    learn: { label: 'أتعلم', icon: '🧠', className: 'bg-[#dbb0cf]/40 text-[#3e2f59] border-[#dbb0cf]' },
    build: { label: 'أبني', icon: '⚡', className: 'bg-[#c6ed58]/35 text-[#1e1b24] border-[#c6ed58] font-bold' },
    content: { label: 'محتوى', icon: '✍️', className: 'bg-[#3e2f59]/10 text-[#3e2f59] border-[#3e2f59]/30' },
    other: { label: 'أخرى', icon: '🎯', className: 'bg-[#ece7de] text-[#1e1b24] border-[#e0d9cd]' }
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
    low: { label: 'طاقة منخفضة', icon: '🔋', className: 'bg-[#dbb0cf]/35 text-[#3e2f59] border-[#dbb0cf]/60' },
    medium: { label: 'طاقة متوسطة', icon: '⚡', className: 'bg-[#3e2f59]/10 text-[#3e2f59] border-[#3e2f59]/30' },
    high: { label: 'طاقة عالية', icon: '🔥', className: 'bg-[#c6ed58]/40 text-[#1e1b24] border-[#c6ed58] font-bold' }
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
    reel: { label: 'Reel 🎥', className: 'bg-[#3e2f59] text-[#c6ed58] border-[#3e2f59] font-bold' },
    carousel: { label: 'Carousel 📑', className: 'bg-[#dbb0cf]/50 text-[#3e2f59] border-[#dbb0cf] font-bold' },
    post: { label: 'Post 📝', className: 'bg-[#ece7de] text-[#1e1b24] border-[#e0d9cd]' },
    tutorial: { label: 'Tutorial 🛠️', className: 'bg-[#c6ed58]/35 text-[#1e1b24] border-[#c6ed58] font-bold' }
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
    idea: { label: 'فكرة (Idea)', className: 'bg-[#ece7de] text-[#6b6475] border-[#e0d9cd]' },
    draft: { label: 'مسودة (Draft)', className: 'bg-[#dbb0cf]/40 text-[#3e2f59] border-[#dbb0cf] font-bold' },
    published: { label: 'تم النشر (Published) ✓', className: 'bg-[#c6ed58] text-[#1e1b24] border-[#b8e244] font-bold' }
  };

  const config = configs[status] || configs.idea;

  return (
    <span className={twMerge('inline-flex items-center gap-1 text-xs rounded-full px-2.5 py-0.5 border shadow-2xs', config.className)}>
      {config.label}
    </span>
  );
};

