import React from 'react';

/** Site-wide marketing CTAs: use `size="cta"` + `variant="taupe"` (or primary/outline) for a consistent pill height and type scale. */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'taupe' | 'outlineWhite';
  size?: 'sm' | 'md' | 'lg' | 'cta';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-full font-heading font-bold transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none tracking-wide';

  const variants = {
    primary:
      'bg-artbar-navy text-white hover:bg-opacity-90 shadow-lg hover:shadow-xl focus:ring-artbar-navy',
    outline:
      'border-2 border-artbar-navy text-artbar-navy hover:bg-gray-50 focus:ring-artbar-navy',
    ghost: 'text-artbar-navy hover:bg-gray-100 focus:ring-artbar-navy',
    taupe:
      'bg-artbar-taupe text-white hover:bg-opacity-90 border-none shadow-lg hover:shadow-xl focus:ring-artbar-taupe',
    outlineWhite:
      'border-2 border-white text-white bg-transparent hover:bg-white hover:text-artbar-navy shadow-none focus:ring-white focus:ring-offset-artbar-navy',
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-sm min-h-[2.5rem]',
    md: 'px-8 py-3.5 text-base min-h-[2.75rem]',
    lg: 'px-10 py-4 text-lg min-h-[3.25rem]',
    /** Primary marketing pill: same height as hero CTAs (~44px mobile, ~48px sm+). Prefer for section CTAs site-wide. */
    cta: 'min-h-[2.75rem] sm:min-h-[3rem] px-6 sm:px-8 py-2.5 text-sm sm:text-base leading-snug',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
