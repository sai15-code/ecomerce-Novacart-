import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { ADDONS } from '../data/products';
import { formatPrice } from '../utils/currency';
import CartItemRow from '../components/cart/CartItemRow';
import ShippingMeter from '../components/cart/ShippingMeter';
import OrderSummary from '../components/cart/OrderSummary';

export default function CartPage() {
  const { items, clearCart, distinctItemCount, addToCart } = useCart();
  const { showToast } = useToast();
  const [activeOrder, setActiveOrder] = useState(() => {
    try {
      const saved = localStorage.getItem('novacart_last_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleClearCart = () => {
    clearCart();
    showToast('Cart Cleared', 'All items removed from your shopping cart');
  };

  const handleAddAddon = (addon) => {
    addToCart(addon, 1);
    showToast(addon.name, `${formatPrice(addon.price)} added to your cart`);
  };

  const isCartEmpty = items.length === 0;

  return (
    <div className="flex flex-col w-full">
      {/* Top Navigation & Breadcrumbs */}
      <div className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-md">
        <div className="flex flex-wrap items-center justify-between gap-space-sm font-caption text-caption text-text-muted">
          <div className="flex items-center gap-2">
            <Link
              to="/catalog"
              className="hover:text-text-primary transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">arrow_back</span>
              <span>Catalog</span>
            </Link>
            <span>/</span>
            <span className="text-text-primary font-medium">Shopping Cart</span>
          </div>

          {activeOrder && (
            <Link
              to="/orders"
              className="inline-flex items-center gap-1.5 text-primary-container hover:underline font-label-sm text-label-sm font-semibold"
            >
              <span className="material-symbols-outlined text-[16px] text-status-success">check_circle</span>
              <span>View Confirmed Order (#{activeOrder.orderId})</span>
            </Link>
          )}
        </div>
      </div>

      {/* Primary Cart & Summary Grid */}
      <div className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop pb-space-xl">
        {/* Shipping Threshold Tracker */}
        <ShippingMeter />

        {/* Empty State Fallback Screen */}
        {isCartEmpty && (
          <div className="mb-space-xl bg-surface rounded-2xl p-space-xl text-center relative overflow-hidden border border-border/40 shadow-xl">
            <div className="max-w-md mx-auto flex flex-col items-center py-6">
              <div className="w-20 h-20 rounded-full bg-surface-raised flex items-center justify-center mb-space-md text-text-muted border border-border/40">
                <span className="material-symbols-outlined text-[36px]">remove_shopping_cart</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-text-primary mt-1 mb-space-xs font-semibold">
                Your Shopping Cart is Empty
              </h2>
              <p className="font-body-md text-body-md text-text-muted mb-space-lg leading-relaxed">
                You have no items in your cart. Explore our curated collections of precision audio,
                mechanical timepieces, and desk setup hardware.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-space-sm">
                <Link
                  to="/catalog"
                  className="bg-primary-container hover:bg-secondary-fixed text-on-primary font-label-md text-label-md font-semibold px-space-lg py-3 rounded-lg transition-colors inline-flex items-center gap-2 shadow"
                >
                  <span>Explore Trending Items</span>
                  <span className="material-symbols-outlined text-[18px]">trending_up</span>
                </Link>
                {activeOrder && (
                  <Link
                    to="/orders"
                    className="bg-surface-raised hover:bg-surface-bright text-text-primary font-label-md text-label-md font-medium px-space-lg py-3 rounded-lg transition-colors border border-border/40 inline-flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px] text-status-success">
                      check_circle
                    </span>
                    <span>View Confirmed Order #{activeOrder.orderId}</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Active Items Layout */}
        {!isCartEmpty && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg xl:gap-space-xl items-start">
            {/* Left Column: Item List (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col gap-space-md">
              {/* Table Column Header (Desktop only) */}
              <div className="hidden md:grid grid-cols-12 gap-space-md px-space-md py-space-xs font-label-sm text-label-sm uppercase tracking-wider text-text-muted">
                <div className="col-span-6">Product Details</div>
                <div className="col-span-2 text-right">Unit Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              {/* Items Rows */}
              {items.map((item) => (
                <CartItemRow key={item.product.id} item={item} />
              ))}

              {/* Action Footer */}
              <div className="flex flex-wrap items-center justify-between gap-space-md pt-space-sm px-space-xs">
                <Link
                  to="/catalog"
                  className="inline-flex items-center gap-2 font-label-md text-label-md text-text-muted hover:text-text-primary transition-colors py-2"
                >
                  <span className="material-symbols-outlined text-[18px]">keyboard_backspace</span>
                  <span>Continue Shopping</span>
                </Link>

                <div className="flex items-center gap-space-md">
                  <button
                    type="button"
                    onClick={handleClearCart}
                    className="font-label-md text-label-md text-text-muted hover:text-status-danger transition-colors py-2 flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      delete_sweep
                    </span>
                    <span>Clear Cart</span>
                  </button>
                </div>
              </div>

              {/* Amazon / Flipkart Style Trust & Assurance Grid */}
              <div className="mt-space-md p-space-md bg-surface rounded-xl border border-border/40 grid grid-cols-2 md:grid-cols-4 gap-space-md">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-surface-raised flex items-center justify-center text-primary-container shrink-0">
                    <span className="material-symbols-outlined text-[20px]">verified_user</span>
                  </div>
                  <div>
                    <h4 className="font-label-sm text-label-sm text-text-primary font-semibold">100% Genuine</h4>
                    <p className="font-caption text-[11px] text-text-muted">Direct brand warranty</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-surface-raised flex items-center justify-center text-status-success shrink-0">
                    <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                  </div>
                  <div>
                    <h4 className="font-label-sm text-label-sm text-text-primary font-semibold">Free Delivery</h4>
                    <p className="font-caption text-[11px] text-text-muted">On orders over ₹12,000</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-surface-raised flex items-center justify-center text-primary-container shrink-0">
                    <span className="material-symbols-outlined text-[20px]">autorenew</span>
                  </div>
                  <div>
                    <h4 className="font-label-sm text-label-sm text-text-primary font-semibold">7-Day Return</h4>
                    <p className="font-caption text-[11px] text-text-muted">Hassle-free replacement</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-surface-raised flex items-center justify-center text-secondary-fixed shrink-0">
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                  </div>
                  <div>
                    <h4 className="font-label-sm text-label-sm text-text-primary font-semibold">Secure Checkout</h4>
                    <p className="font-caption text-[11px] text-text-muted">256-Bit SSL protection</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Order Summary Card (4 Cols) */}
            <div className="lg:col-span-4">
              <OrderSummary />
            </div>
          </div>
        )}

        {/* Curated Add-ons Editorial Section ("Frequently Acquired Together") */}
        <div className="mt-space-xl pt-space-xl border-t border-border/40">
          <div className="flex items-end justify-between mb-space-md">
            <div>
              <span className="font-caption text-caption uppercase tracking-wider text-text-muted">
                Harmonious Accompaniments
              </span>
              <h2 className="font-headline-md text-headline-md text-text-primary tracking-tight font-semibold">
                Frequently Acquired Together
              </h2>
            </div>
            <Link
              to="/catalog"
              className="hidden sm:inline-flex items-center gap-1 font-label-md text-label-md text-primary-container hover:underline"
            >
              <span>View Catalog Accessories</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {ADDONS.map((addon) => (
              <div
                key={addon.id}
                className="bg-surface rounded-xl p-space-sm flex flex-col group transition-all duration-200 hover:bg-surface-raised border border-border/30 shadow-sm"
              >
                <div className="relative w-full aspect-[4/3] bg-surface-container-lowest rounded-lg overflow-hidden mb-space-sm">
                  <img
                    src={addon.image}
                    alt={addon.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-surface font-caption text-[10px] text-text-primary px-1.5 py-0.5 rounded uppercase border border-border/40">
                    {addon.category}
                  </span>
                </div>

                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-title-product text-title-product text-text-primary font-medium line-clamp-1">
                      {addon.name}
                    </h3>
                    <p className="font-caption text-caption text-text-muted mt-0.5 line-clamp-1">
                      {addon.description || 'Full-grain precision hardware accompaniment'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-space-sm pt-space-xs">
                    <span className="font-body-md text-body-md text-text-primary font-semibold">
                      {formatPrice(addon.price)}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAddAddon(addon)}
                      className="bg-surface-container hover:bg-primary-container hover:text-on-primary text-text-primary font-label-sm text-label-sm px-2.5 py-1.5 rounded transition-colors flex items-center gap-1 active:scale-95 border border-border/40"
                    >
                      <span className="material-symbols-outlined text-[14px]">add</span>
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
