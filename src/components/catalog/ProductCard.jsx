import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../utils/currency';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const isFav = isWishlisted(product.id);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!product.inStock) {
      showToast(product.name, 'Restock notification request logged');
      return;
    }
    addToCart(product, 1);
    showToast(product.name, `${formatPrice(product.price)} — Added to collection payload`);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleWishlist(product.id);
    const msg = isFav ? 'Removed from favorites' : 'Saved to deliberate wishlist';
    showToast(product.name, msg);
  };

  return (
    <div
      tabIndex={0}
      role="article"
      onClick={() => navigate(`/products/${product.id}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') navigate(`/products/${product.id}`);
      }}
      className="group relative flex flex-col bg-surface rounded-xl p-space-sm transition-all duration-300 hover:bg-surface-raised cursor-pointer shadow-md focus:outline-none focus:ring-1 focus:ring-primary-container"
    >
      {/* 4:5 Aspect Ratio Image Canvas */}
      <div className="relative w-full aspect-[4/5] bg-surface-container-lowest rounded-lg overflow-hidden flex items-center justify-center">
        <img
          src={product.image}
          alt={product.imgAlt || product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Ambient subtle vignette gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-space-sm left-space-sm flex flex-col gap-1 items-start z-10">
          {product.badge && (
            <span className="px-2 py-0.5 rounded bg-surface-container-highest/90 backdrop-blur-md text-text-primary font-caption text-caption uppercase tracking-wider font-semibold">
              {product.badge}
            </span>
          )}
          {!product.inStock && (
            <span className="px-2 py-0.5 rounded bg-surface-raised/95 text-text-muted font-caption text-caption uppercase tracking-wider">
              Sold Out
            </span>
          )}
        </div>

        {/* Wishlist Action */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isFav ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className="absolute top-space-sm right-space-sm w-8 h-8 rounded-full bg-surface-container/80 backdrop-blur-md flex items-center justify-center text-text-muted hover:text-text-primary transition-transform duration-200 hover:scale-110 z-10"
        >
          <span
            className={`material-symbols-outlined text-[18px] transition-colors ${
              isFav ? 'text-status-danger material-symbols-fill' : 'text-text-muted'
            }`}
            style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
        </button>

        {/* Quick Hover Quickview Bar */}
        <div className="absolute bottom-space-xs inset-x-space-xs translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-between px-space-sm py-1.5 rounded bg-surface/95 backdrop-blur-md text-text-muted font-caption text-caption pointer-events-none sm:pointer-events-auto">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-primary-container material-symbols-fill">
              star
            </span>
            <span className="text-text-primary font-medium">{product.rating}</span>
            <span>({product.reviews})</span>
          </span>
          <span className="uppercase tracking-wider text-[10px] text-text-muted">
            {product.category}
          </span>
        </div>

        {/* Desktop Quick Add Hover Overlay */}
        <div className="hidden sm:block absolute inset-x-3 bottom-10 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 ease-out z-20">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full py-2.5 rounded bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1.5 hover:bg-secondary-fixed transition-colors shadow-lg active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">
              {product.inStock ? 'shopping_bag' : 'schedule'}
            </span>
            <span>{product.inStock ? 'Quick Add' : 'Notify Restock'}</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 pt-space-sm pb-space-xs px-1">
        <div className="flex items-center justify-between gap-space-xs mb-1">
          <span className="font-caption text-caption uppercase tracking-widest text-text-muted">
            {product.category}
          </span>
          <div className="flex items-center gap-1 font-caption text-caption text-text-muted">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                product.inStock ? 'bg-status-success animate-pulse' : 'bg-text-muted/40'
              }`}
            />
            <span>{product.inStock ? 'Ready to Ship' : 'Backordered'}</span>
          </div>
        </div>

        <h3 className="font-title-product text-title-product text-text-primary line-clamp-1 group-hover:text-primary-container transition-colors font-medium">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-space-xs mt-space-xs mb-space-sm">
          <span className="font-headline-sm text-headline-sm text-text-primary font-semibold">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="font-caption text-caption text-text-muted line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <span className="font-caption text-caption text-text-muted uppercase ml-auto">
            INR
          </span>
        </div>

        {/* Mobile Action Button */}
        <div className="sm:hidden mt-auto pt-space-xs">
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className={`w-full flex items-center justify-center gap-space-xs py-2 px-space-md rounded-lg font-label-md text-label-md font-semibold transition-all duration-200 ${
              product.inStock
                ? 'bg-surface-raised active:bg-primary-container text-text-primary active:text-on-primary'
                : 'bg-surface-container-high text-text-muted opacity-50 cursor-not-allowed'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {product.inStock ? 'add_shopping_cart' : 'schedule'}
            </span>
            <span>{product.inStock ? '+ Add to Cart' : 'Notify'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
