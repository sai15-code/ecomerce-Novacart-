import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/currency';
import ProductCard from '../components/catalog/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('Standard Studio Finish');

  useEffect(() => {
    const found = PRODUCTS.find((p) => p.id === Number(id));
    if (found) {
      setProduct(found);
      setActiveImage(found.image);
      setQuantity(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setProduct(null);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-[1440px] mx-auto px-margin py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-surface-raised flex items-center justify-center mx-auto mb-4 text-text-muted">
          <span className="material-symbols-outlined text-[32px]">search_off</span>
        </div>
        <h2 className="font-headline-md text-headline-md text-text-primary font-semibold">
          Object Not Found
        </h2>
        <p className="font-body-md text-body-md text-text-muted mt-2 mb-6">
          The requested product ID does not map to any active hardware in the 2025 archive.
        </p>
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 bg-primary-container text-on-primary font-label-md text-label-md font-semibold px-6 py-3 rounded-lg hover:bg-secondary-fixed transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Return to Catalog</span>
        </Link>
      </div>
    );
  }

  const isFav = isWishlisted(product.id);
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.category === 'Desk Setup')
  ).slice(0, 4);

  const handleAddToCart = () => {
    if (!product.inStock) {
      showToast(product.name, 'Restock notification request submitted');
      return;
    }
    addToCart(product, quantity, selectedVariant);
    showToast(
      `${quantity}x ${product.name}`,
      `${formatPrice(product.price * quantity)} — Added to collection bag`
    );
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product.id);
    showToast(
      product.name,
      isFav ? 'Removed from favorites' : 'Saved to deliberate wishlist'
    );
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-md">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-space-xs font-caption text-caption text-text-muted mb-space-lg"
      >
        <Link to="/" className="hover:text-text-primary transition-colors flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">home</span>
          <span>Storefront</span>
        </Link>
        <span className="opacity-40">/</span>
        <Link to="/catalog" className="hover:text-text-primary transition-colors">
          Catalog
        </Link>
        <span className="opacity-40">/</span>
        <Link
          to={`/catalog?category=${encodeURIComponent(product.category)}`}
          className="hover:text-text-primary transition-colors"
        >
          {product.category}
        </Link>
        <span className="opacity-40">/</span>
        <span className="text-text-primary font-medium truncate">{product.name}</span>
      </nav>

      {/* Main Two-Column Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
        {/* Left Column: Media Gallery (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          {/* Main Stage Image */}
          <div className="relative aspect-[4/5] sm:aspect-[1/1] w-full rounded-2xl overflow-hidden bg-surface-container-lowest border border-border/40 shadow-2xl flex items-center justify-center">
            <img
              src={activeImage || product.image}
              alt={product.imgAlt || product.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.badge && (
                <span className="px-3 py-1 rounded bg-surface-container-highest/90 backdrop-blur-md text-text-primary font-caption text-caption uppercase tracking-wider font-semibold border border-border/40">
                  {product.badge}
                </span>
              )}
              <span
                className={`px-3 py-1 rounded backdrop-blur-md font-caption text-caption uppercase tracking-wider font-semibold border border-border/40 ${
                  product.inStock
                    ? 'bg-surface-raised/90 text-status-success'
                    : 'bg-surface-raised/90 text-text-muted'
                }`}
              >
                {product.inStock ? 'Ready to Dispatch' : 'Backordered'}
              </span>
            </div>

            {/* Wishlist Floating Button */}
            <button
              type="button"
              onClick={handleWishlistToggle}
              aria-label={isFav ? 'Remove from wishlist' : 'Add to wishlist'}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface-raised/90 backdrop-blur-md flex items-center justify-center text-text-muted hover:text-text-primary transition-all duration-200 hover:scale-110 shadow-lg border border-border/40"
            >
              <span
                className={`material-symbols-outlined text-[20px] ${
                  isFav ? 'text-status-danger material-symbols-fill' : 'text-text-muted'
                }`}
                style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
            </button>

            {/* Specification Pill Badge */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span className="font-caption text-caption text-text-muted bg-surface/90 backdrop-blur px-3 py-1 rounded border border-border/30">
                CNC Precision Monobloc
              </span>
              <span className="font-mono text-caption text-primary-container bg-surface/90 backdrop-blur px-3 py-1 rounded border border-border/30">
                {product.series || 'EDITION 2025'}
              </span>
            </div>
          </div>

          {/* Thumbnail Gallery Strip */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.gallery.map((img, idx) => {
                const isSelected = activeImage === img;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden bg-surface-container shrink-0 border-2 transition-all ${
                      isSelected
                        ? 'border-primary-container scale-105 shadow-md'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Specification & Acquisition Actions (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-space-lg">
          {/* Header Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
              <span className="font-caption text-caption uppercase tracking-[0.2em] text-primary-container font-semibold">
                {product.series || product.category}
              </span>
            </div>

            <h1 className="font-headline-lg text-headline-lg text-text-primary font-bold tracking-tight">
              {product.name}
            </h1>

            {/* Rating Meta */}
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1 text-primary-container">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-[16px] material-symbols-fill"
                  >
                    star
                  </span>
                ))}
              </div>
              <span className="font-caption text-caption text-text-primary font-medium">
                {product.rating} / 5.0
              </span>
              <span className="text-text-muted font-caption text-caption">
                ({product.reviews} verified studio audits)
              </span>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="font-display-hero-mobile text-display-hero-mobile text-text-primary font-bold">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="font-headline-sm text-headline-sm text-text-muted line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="font-caption text-caption text-text-muted uppercase">
                INR · GST Included
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="p-space-md bg-surface rounded-xl border border-border/40">
            <h3 className="font-label-sm text-label-sm uppercase tracking-wider text-text-muted mb-2 font-semibold">
              Material Statement
            </h3>
            <p className="font-body-md text-body-md text-text-muted leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Key Features Bullet List */}
          {product.features && product.features.length > 0 && (
            <div className="space-y-2">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-text-muted block">
                Engineering Highlights
              </span>
              <ul className="space-y-2 font-body-md text-body-md text-text-muted">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary-container shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Purchase Action Box */}
          <div className="bg-surface p-space-md rounded-xl border border-border/40 flex flex-col gap-space-md shadow-lg">
            {/* Quantity Selector */}
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-text-primary font-medium">
                Select Allocation:
              </span>
              <div className="inline-flex items-center bg-surface-raised rounded-lg p-1 border border-border/40">
                <button
                  type="button"
                  aria-label="Decrease allocation quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface rounded transition-colors font-semibold"
                >
                  -
                </button>
                <span className="w-10 text-center font-body-md text-body-md text-text-primary font-semibold select-none">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase allocation quantity"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface rounded transition-colors font-semibold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Bag CTA */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full py-3.5 px-space-lg rounded-lg font-label-md text-label-md font-bold flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] shadow-md ${
                product.inStock
                  ? 'bg-primary-container hover:bg-secondary-fixed text-on-primary'
                  : 'bg-surface-raised text-text-muted opacity-60 cursor-not-allowed'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {product.inStock ? 'shopping_bag' : 'schedule'}
              </span>
              <span>
                {product.inStock
                  ? `Add ${quantity} to Bag — ${formatPrice(product.price * quantity)}`
                  : 'Register for Next Allocation Run'}
              </span>
            </button>

            {/* Express dispatch badge */}
            <div className="flex items-center justify-between text-caption font-caption text-text-muted pt-2 border-t border-border/30">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-status-success">
                  flight_takeoff
                </span>
                Dispatch in sub-48h
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-primary-container">
                  shield
                </span>
                Lifetime warranty
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications Matrix */}
      {product.specs && Object.keys(product.specs).length > 0 && (
        <section className="mt-space-xl pt-space-xl border-t border-border/40">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 bg-primary-container" />
            <h2 className="font-headline-md text-headline-md text-text-primary font-semibold">
              Technical Specifications & Dimensions
            </h2>
          </div>
          <div className="bg-surface rounded-xl overflow-hidden border border-border/40 shadow-md">
            <dl className="divide-y divide-border/40">
              {Object.entries(product.specs).map(([specKey, specVal], idx) => (
                <div
                  key={idx}
                  className="px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-2 hover:bg-surface-raised/50 transition-colors"
                >
                  <dt className="font-label-md text-label-md text-text-muted uppercase tracking-wider">
                    {specKey}
                  </dt>
                  <dd className="sm:col-span-2 font-body-md text-body-md text-text-primary">
                    {specVal}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* Related Objects Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-space-xl pt-space-xl">
          <div className="flex items-end justify-between mb-space-md">
            <div>
              <span className="font-caption text-caption uppercase tracking-wider text-text-muted">
                Harmonious Accompaniments
              </span>
              <h2 className="font-headline-md text-headline-md text-text-primary tracking-tight font-semibold">
                Objects From the Same Archive
              </h2>
            </div>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-1 font-label-md text-label-md text-primary-container hover:underline"
            >
              <span>View Full Catalog</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md lg:gap-gutter-desktop">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
