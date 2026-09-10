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
    default: 'bg-[#F4EDE0] text-[#393313] border border-[#EBDDCB]',
    primary: 'bg-[#66693E]/15 text-[#393313] border border-[#66693E]/30 font-bold',
    accent: 'bg-[#31031F]/10 text-[#31031F] border border-[#31031F]/25 font-bold',
    soft: 'bg-[#FFF8ED] text-[#393313] border border-[#EBDDCB]',
    outline: 'bg-transparent text-[#393313] border border-[#D9C9B4]',
    success: 'bg-[#66693E]/20 text-[#393313] border border-[#66693E]/40 font-bold'
  };

  return (
    <span className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className))}>
      {children}
    </span>
  );
};

export const CategoryBadge: React.FC<{ category: TaskCategory }> = ({ category }) => {
  const configs: Record<TaskCategory, { label: string; icon: string; className: string }> = {
    learn: { label: 'أتعلم', icon: '🧠', className: 'bg-[#66693E]/15 text-[#393313] border-[#66693E]/30' },
    build: { label: 'أبني', icon: '⚡', className: 'bg-[#31031F]/10 text-[#31031F] border-[#31031F]/25' },
    content: { label: 'محتوى', icon: '✍️', className: 'bg-[#C5A880]/25 text-[#4A321F] border-[#C5A880]/50' },
    other: { label: 'أخرى', icon: '🎯', className: 'bg-[#F4EDE0] text-[#393313] border-[#EBDDCB]' }
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
    low: { label: 'طاقة منخفضة', icon: '🔋', className: 'bg-[#66693E]/15 text-[#393313] border-[#66693E]/30' },
    medium: { label: 'طاقة متوسطة', icon: '⚡', className: 'bg-[#8C7A6B]/15 text-[#393313] border-[#8C7A6B]/30' },
    high: { label: 'طاقة عالية', icon: '🔥', className: 'bg-[#31031F]/12 text-[#31031F] border-[#31031F]/25' }
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
    reel: { label: 'Reel 🎥', className: 'bg-[#31031F]/10 text-[#31031F] border-[#31031F]/25' },
    carousel: { label: 'Carousel 📑', className: 'bg-[#66693E]/15 text-[#393313] border-[#66693E]/30' },
    post: { label: 'Post 📝', className: 'bg-[#C5A880]/25 text-[#4A321F] border-[#C5A880]/50' },
    tutorial: { label: 'Tutorial 🛠️', className: 'bg-[#5B6D5B]/15 text-[#2C3E2C] border-[#5B6D5B]/30' }
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
    idea: { label: 'فكرة (Idea)', className: 'bg-[#F4EDE0] text-[#393313] border-[#EBDDCB]' },
    draft: { label: 'مسودة (Draft)', className: 'bg-[#C5A880]/25 text-[#4A321F] border-[#C5A880]/50 font-semibold' },
    published: { label: 'تم النشر (Published) ✓', className: 'bg-[#66693E]/20 text-[#393313] border-[#66693E]/40 font-semibold' }
  };

  const config = configs[status] || configs.idea;

  return (
    <span className={twMerge('inline-flex items-center gap-1 text-xs rounded-full px-2.5 py-0.5 border shadow-2xs', config.className)}>
      {config.label}
    </span>
  );
};
