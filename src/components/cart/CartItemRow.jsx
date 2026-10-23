import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../utils/currency';

export default function CartItemRow({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const { showToast } = useToast();
  const { product, quantity, variant } = item;

  const itemSubtotal = product.price * quantity;

  const handleRemove = () => {
    removeFromCart(product.id);
    showToast(product.name, 'Removed from cart');
  };

  return (
    <div className="bg-surface rounded-xl p-space-md md:p-space-lg flex flex-col md:grid md:grid-cols-12 gap-space-md items-center group transition-colors duration-200 border border-border/30">
      {/* Product Image & Info (6 Cols) */}
      <div className="w-full md:col-span-6 flex items-center gap-space-md min-w-0">
        <Link
          to={`/products/${product.id}`}
          className="relative w-20 h-24 md:w-24 md:h-28 shrink-0 bg-surface-container-lowest rounded-lg overflow-hidden block"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-1 left-1 bg-surface-raised font-caption text-[10px] text-text-muted px-1.5 py-0.5 rounded uppercase">
            {product.category}
          </span>
        </Link>

        <div className="flex flex-col min-w-0">
          <span className="font-caption text-caption text-text-muted tracking-wide uppercase">
            {product.series || product.category}
          </span>
          <Link
            to={`/products/${product.id}`}
            className="font-title-product text-title-product text-text-primary hover:text-primary-container transition-colors truncate font-medium"
          >
            {product.name}
          </Link>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-border" />
            <span className="font-caption text-caption text-text-muted truncate">
              {variant || 'Standard Studio Finish'}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`font-caption text-[11px] px-1.5 py-0.5 rounded ${
                product.inStock
                  ? 'text-status-success bg-surface-raised'
                  : 'text-text-muted bg-surface-container-high'
              }`}
            >
              {product.inStock ? 'In Stock · Ready to dispatch' : 'Backordered'}
            </span>
          </div>
        </div>
      </div>

      {/* Unit Price (2 Cols) */}
      <div className="w-full md:col-span-2 flex md:justify-end items-center justify-between md:text-right">
        <span className="md:hidden font-caption text-text-muted">Unit</span>
        <span className="font-body-md text-body-md text-text-primary font-medium">
          {formatPrice(product.price)}
        </span>
      </div>

      {/* Quantity Selector (2 Cols) */}
      <div className="w-full md:col-span-2 flex md:justify-center items-center justify-between">
        <span className="md:hidden font-caption text-text-muted">Quantity</span>
        <div className="inline-flex items-center bg-surface-raised rounded px-1 py-0.5 border border-border/40">
          <button
            type="button"
            aria-label={`Decrease quantity of ${product.name}`}
            onClick={() => updateQuantity(product.id, -1)}
            disabled={quantity <= 1}
            className={`w-7 h-7 flex items-center justify-center rounded transition-colors text-sm font-semibold ${
              quantity <= 1
                ? 'text-text-muted/40 cursor-not-allowed opacity-40'
                : 'text-text-muted hover:text-text-primary hover:bg-surface'
            }`}
          >
            -
          </button>
          <span className="w-8 text-center font-body-md text-body-md text-text-primary font-medium select-none">
            {quantity}
          </span>
          <button
            type="button"
            aria-label={`Increase quantity of ${product.name}`}
            onClick={() => updateQuantity(product.id, 1)}
            className="w-7 h-7 flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface rounded transition-colors text-sm font-semibold"
          >
            +
          </button>
        </div>
      </div>

      {/* Subtotal & Delete Action (2 Cols) */}
      <div className="w-full md:col-span-2 flex items-center justify-between md:justify-end gap-space-sm">
        <div className="flex flex-col items-end">
          <span className="font-headline-sm text-headline-sm text-text-primary font-semibold">
            {formatPrice(itemSubtotal)}
          </span>
        </div>
        <button
          type="button"
          onClick={handleRemove}
          aria-label={`Remove ${product.name} from bag`}
          className="p-1.5 text-text-muted hover:text-status-danger transition-colors rounded hover:bg-surface-raised"
          title="Remove object"
        >
          <span className="material-symbols-outlined text-[20px]">delete_outline</span>
        </button>
      </div>
    </div>
  );
}
