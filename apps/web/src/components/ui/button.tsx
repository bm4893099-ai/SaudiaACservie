import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '../../lib/cn';

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'ghost';
  }
>;

export const Button = ({
  children,
  className,
  variant = 'primary',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/60 disabled:cursor-not-allowed disabled:opacity-60',
        variant === 'primary' &&
          'bg-brand-500 text-white shadow-lg shadow-brand-500/30 hover:-translate-y-0.5 hover:bg-brand-500/90',
        variant === 'secondary' &&
          'glass-card text-slate-100 hover:-translate-y-0.5 hover:border-white/20',
        variant === 'ghost' && 'bg-transparent text-slate-300 hover:bg-white/5',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
