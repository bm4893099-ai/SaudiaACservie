import type { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '../../lib/cn';

type BadgeProps = PropsWithChildren<
  HTMLAttributes<HTMLSpanElement> & {
    tone?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'slate';
  }
>;

export const Badge = ({ children, className, tone = 'slate', ...props }: BadgeProps) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium',
      tone === 'indigo' && 'border-brand-500/30 bg-brand-500/15 text-brand-100',
      tone === 'emerald' && 'border-emerald-500/30 bg-emerald-500/15 text-emerald-100',
      tone === 'amber' && 'border-amber-500/30 bg-amber-500/15 text-amber-100',
      tone === 'rose' && 'border-rose-500/30 bg-rose-500/15 text-rose-100',
      tone === 'slate' && 'border-white/10 bg-white/5 text-slate-200',
      className,
    )}
    {...props}
  >
    {children}
  </span>
);
