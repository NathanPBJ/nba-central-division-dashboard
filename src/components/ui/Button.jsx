import { cva } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-bold uppercase tracking-[0.1em] transition focus:outline-none focus:ring-2 focus:ring-[var(--brand-secondary)]/40 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      intent: {
        primary: 'bg-[var(--brand-secondary)] text-[var(--brand-primary)] hover:bg-[#ffe070]',
        ghost: 'border border-white/6 bg-white/3 text-[#7a8ea6] hover:border-[var(--brand-secondary)]/40 hover:text-[var(--brand-secondary)]',
        outline: 'border border-[var(--brand-secondary)]/40 bg-transparent text-[var(--brand-secondary)] hover:bg-[var(--brand-secondary)]/10',
        danger: 'bg-rose-500 text-white hover:bg-rose-400',
      },
      size: {
        sm: 'h-9 px-3 text-[10px]',
        md: 'h-11 px-4 text-xs',
        lg: 'h-14 px-6 text-sm',
      },
      shape: {
        default: 'rounded-sm',
        skewed: 'rounded-none',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
      shape: 'default',
    },
  }
)

/**
 * Generic Button component using CVA for variants.
 */
export function Button({ className, intent, size, shape, ...props }) {
  const isSkewed = shape === 'skewed'
  return (
    <button
      className={cn(buttonVariants({ intent, size, shape, className }))}
      style={isSkewed ? { clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' } : {}}
      {...props}
    />
  )
}
