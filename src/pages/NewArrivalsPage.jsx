import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/catalog/ProductCard';

export default function NewArrivalsPage() {
  // Items marked as New, New Edition, or recently added
  const newArrivals = PRODUCTS.filter(
    (p) => p.badge === 'New' || p.badge === 'New Edition' || p.id === 1 || p.id === 2 || p.id === 12
  );

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-lg">
      <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs font-caption text-caption text-text-muted mb-space-md">
        <Link to="/" className="hover:text-text-primary transition-colors flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">home</span>
          <span>Storefront</span>
        </Link>
        <span className="opacity-40">/</span>
        <span className="text-text-primary font-medium">New Arrivals</span>
        <span className="opacity-40">/</span>
        <span className="text-primary-container font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-surface-raised border border-border/40">
          Q4 2025 Release
        </span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pb-space-lg border-b border-border/40 mb-space-lg">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-primary-container animate-pulse" />
            <span className="font-caption text-caption uppercase tracking-widest text-primary-container font-semibold">
              Fresh Allocations
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-text-primary font-bold tracking-tight">
            New Arrivals
          </h1>
          <p className="font-body-md text-body-md text-text-muted mt-2 max-w-xl">
            The newest additions to our precision hardware catalog. Each piece produced in strictly limited serialized production runs.
          </p>
        </div>

        <Link
          to="/catalog"
          className="font-label-md text-label-md text-text-muted hover:text-text-primary flex items-center gap-1 group transition-colors"
        >
          <span>View entire archive ({PRODUCTS.length} objects)</span>
          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-space-md lg:gap-gutter-desktop">
        {newArrivals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
