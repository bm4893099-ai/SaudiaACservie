import { cn } from '../../lib/cn';

type SkeletonProps = {
  className?: string;
};

export const Skeleton = ({ className }: SkeletonProps) => (
  <div className={cn('animate-pulse rounded-2xl bg-white/8', className)} />
);
