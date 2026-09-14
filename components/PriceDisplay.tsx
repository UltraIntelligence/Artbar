import { JpText } from './JpText';
import { cleanDisplayText } from '@/lib/jp-display';

export function PriceDisplay({ amount, suffix }: { amount: string; suffix: string }) {
  return (
    <div className="mb-8 min-w-0 space-y-2" data-price-display>
      <span className="block whitespace-nowrap font-heading text-[clamp(2rem,10vw,3rem)] font-bold leading-none text-artbar-navy" data-price-amount>
        {cleanDisplayText(amount)}
      </span>
      <span className="block text-base text-artbar-gray"><JpText>{suffix}</JpText></span>
    </div>
  );
}
