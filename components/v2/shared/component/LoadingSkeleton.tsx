import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave' | 'none';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  animation = 'pulse',
  width,
  height,
}) => {
  const baseClasses = 'bg-gray-200';
  
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  };
  
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  };
  
  const style: React.CSSProperties = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1em' : '100%'),
  };
  
  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
    />
  );
};

// Blog Post Skeleton
export const BlogPostSkeleton: React.FC = () => (
  <article className="mb-8 p-6 bg-white rounded-lg shadow-md">
    <Skeleton variant="text" height={32} className="mb-2 max-w-[70%]" />
    <div className="flex items-center gap-2 mb-4">
      <Skeleton variant="circular" width={24} height={24} />
      <Skeleton variant="text" width={120} height={16} />
      <Skeleton variant="text" width={80} height={16} />
    </div>
    <Skeleton variant="text" className="mb-2" />
    <Skeleton variant="text" className="mb-2" />
    <Skeleton variant="text" width="80%" />
  </article>
);

// Project Card Skeleton
export const ProjectCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <Skeleton variant="rectangular" height={200} />
    <div className="p-4">
      <Skeleton variant="text" height={24} className="mb-2" />
      <Skeleton variant="text" className="mb-1" />
      <Skeleton variant="text" className="mb-4" width="90%" />
      <div className="flex gap-2">
        <Skeleton variant="rectangular" width={80} height={32} />
        <Skeleton variant="rectangular" width={80} height={32} />
      </div>
    </div>
  </div>
);

// Hero Section Skeleton
export const HeroSkeleton: React.FC = () => (
  <div className="min-h-[60vh] flex items-center justify-center px-4">
    <div className="max-w-4xl mx-auto text-center">
      <Skeleton variant="text" height={40} width={200} className="mx-auto mb-4" />
      <Skeleton variant="text" height={60} width={400} className="mx-auto mb-4" />
      <Skeleton variant="text" height={24} className="mx-auto mb-2 max-w-[600px]" />
      <Skeleton variant="text" height={24} width="80%" className="mx-auto" />
    </div>
  </div>
);

// About Section Skeleton
export const AboutSkeleton: React.FC = () => (
  <div className="container mx-auto px-4 py-12">
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <Skeleton variant="text" height={32} width={150} className="mb-4" />
        <Skeleton variant="text" className="mb-2" />
        <Skeleton variant="text" className="mb-2" />
        <Skeleton variant="text" className="mb-2" />
        <Skeleton variant="text" width="90%" />
      </div>
      <Skeleton variant="rectangular" height={400} />
    </div>
  </div>
);

// Skills Grid Skeleton
export const SkillsGridSkeleton: React.FC = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="flex flex-col items-center p-4">
        <Skeleton variant="circular" width={60} height={60} className="mb-2" />
        <Skeleton variant="text" width={80} />
      </div>
    ))}
  </div>
);