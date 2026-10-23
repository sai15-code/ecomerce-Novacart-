import React from 'react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/currency';

export default function ShippingMeter() {
  const {
    subtotal,
    expressRemaining,
    expressProgressPercent,
    isFreeStandardShipping,
    STANDARD_FREE_THRESHOLD,
    EXPRESS_TIER
  } = useCart();

  return (
    <div className="bg-surface rounded-xl p-space-md md:p-space-lg mb-space-lg shadow-sm border border-border/40">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-md">
        <div>
          <span className="font-caption text-caption uppercase tracking-wider text-primary-container font-semibold">
            Order Savings
          </span>
          <h1 className="font-headline-lg text-headline-lg text-text-primary tracking-tight mt-0.5">
            Shopping Cart
          </h1>
        </div>
        <div className="text-left md:text-right">
          <div className="font-label-md text-label-md text-text-primary flex items-center md:justify-end gap-1.5">
            <span className="material-symbols-outlined text-primary-container text-[18px]">
              local_shipping
            </span>
            {expressRemaining > 0 ? (
              <span>
                <strong className="text-primary-container font-semibold">
                  {formatPrice(expressRemaining)}
                </strong>{' '}
                away from Free Express Delivery
              </span>
            ) : (
              <span className="text-status-success font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Free Priority Express Delivery Unlocked!
              </span>
            )}
          </div>
          <p className="font-caption text-caption text-text-muted mt-0.5">
            {expressRemaining > 0
              ? `Add items worth ${formatPrice(expressRemaining)} to get Free Express Courier Shipping`
              : 'Your order qualifies for complimentary BlueDart Express air delivery'}
          </p>
        </div>
      </div>

      {/* Animated Progress Tracker */}
      <div className="relative w-full bg-surface-container rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-secondary to-primary-container rounded-full transition-all duration-700 ease-out"
          style={{ width: `${expressProgressPercent}%` }}
        />
      </div>

      <div className="flex justify-between items-center mt-2 font-caption text-caption text-text-muted">
        <span>Current: {formatPrice(subtotal)}</span>
        <span className="text-text-primary font-medium">
          {isFreeStandardShipping
            ? `Free Tier (${formatPrice(STANDARD_FREE_THRESHOLD)}) Reached ✓`
            : `${formatPrice(STANDARD_FREE_THRESHOLD)} Free Tier Standard`}
        </span>
        <span className="text-primary-container font-semibold">
          Priority Express Tier: {formatPrice(EXPRESS_TIER)}
        </span>
      </div>
    </div>
  );
}
