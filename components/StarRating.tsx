import { Star } from 'lucide-react';

export function StarRating({
  count = 5,
  size = 14,
  animated = false,
  delayBase = 100,
  className = '',
}: {
  count?: number;
  size?: number;
  animated?: boolean;
  /** Milliseconds before the first star’s delay step (hero uses ~600; carousel ~100). */
  delayBase?: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-0.5 text-yellow-400 ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <Star
          key={i}
          size={size}
          fill="currentColor"
          className={animated ? 'animate-star' : ''}
          style={animated ? { animationDelay: `${delayBase + i * 100}ms` } : undefined}
          aria-hidden
        />
      ))}
    </div>
  );
}
