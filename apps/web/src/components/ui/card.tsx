import type { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '../../lib/cn';

type CardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div className={cn('glass-card rounded-3xl p-6 shadow-xl shadow-slate-950/30', className)} {...props}>
      {children}
    </div>
  );
};
