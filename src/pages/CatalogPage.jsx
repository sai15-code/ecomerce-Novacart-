import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/catalog/ProductCard';
import FilterToolbar from '../components/catalog/FilterToolbar';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlist } = useWishlist();
  const { showToast } = useToast();

  // URL state synchronization
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('q') || '';
  const filterParam = searchParams.get('filter') || '';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortOption, setSortOption] = useState('Featured');
  const [visibleCount, setVisibleCount] = useState(8);
  const [loadingMore, setLoadingMore] = useState(false);

  // Sync category or search when URL params change
  useEffect(() => {
    const cat = searchParams.get('category');
    const q = searchParams.get('q');
    setActiveCategory(cat || 'All');
    setSearchQuery(q || '');
  }, [searchParams]);

  const handleCategorySelect = (cat) => {
    setActiveCategory(cat);
    setVisibleCount(8);
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'All') newParams.delete('category');
    else newParams.set('category', cat);
    setSearchParams(newParams);
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setVisibleCount(8);
    const newParams = new URLSearchParams(searchParams);
    if (!val) newParams.delete('q');
    else newParams.set('q', val);
    setSearchParams(newParams);
  };

  const handleToggleStock = () => {
    setInStockOnly(prev => !prev);
    setVisibleCount(8);
  };

  const handleSortChange = (val) => {
    setSortOption(val);
    setVisibleCount(8);
  };

  const handleResetFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
    setInStockOnly(false);
    setSortOption('Featured');
    setVisibleCount(8);
    setSearchParams({});
  };

  // Filter and sort items
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (filterParam === 'wishlist') {
      result = result.filter(item => wishlist.includes(item.id));
    }

    if (activeCategory !== 'All') {
      result = result.filter(item =>
        item.category.toLowerCase() === activeCategory.toLowerCase() ||
        (activeCategory === 'Everyday Carry' && item.category === 'Accessories')
      );
    }

    if (inStockOnly) {
      result = result.filter(item => item.inStock);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q))
      );
    }

    if (sortOption === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'Customer Rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'Newest') {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [activeCategory, inStockOnly, searchQuery, sortOption, filterParam, wishlist]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 4, filteredProducts.length));
      setLoadingMore(false);
      showToast('Catalog Expanded', 'Archival specifications loaded');
    }, 600);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Ambient Light Accents */}
      <div className="relative w-full max-w-[1440px] mx-auto px-margin lg:px-margin-desktop">
        <div className="absolute top-12 left-1/4 w-96 h-96 bg-primary-container/5 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-64 right-1/6 w-80 h-80 bg-secondary-container/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        {/* SECTION 1: HEADER & CURATION CONTROLS BAR */}
        <section className="w-full pt-space-lg pb-space-md">
          {/* Breadcrumb Hierarchy */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-space-xs font-caption text-caption text-text-muted mb-space-sm"
          >
            <Link to="/" className="hover:text-text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">home</span>
              <span>Storefront</span>
            </Link>
            <span className="opacity-40">/</span>
            <span className="text-text-primary font-medium">All Products</span>
            <span className="opacity-40">/</span>
            <span className="text-primary-container font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-surface-raised border border-border/40">
              Archive 2025
            </span>
          </nav>

          {/* Main Title Header & Counter Meta */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pb-space-lg">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                <span className="font-caption text-caption uppercase tracking-widest text-text-muted">
                  Hardware & Object Studio
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-text-primary font-bold tracking-tight">
                Curated Catalog
              </h1>
            </div>

            <div className="flex items-center gap-space-sm">
              <span className="font-label-md text-label-md text-text-muted bg-surface px-space-md py-1.5 rounded-lg shadow-sm border border-border/40">
                Showing {displayedProducts.length} of {filteredProducts.length} Items
              </span>
              <div className="hidden sm:flex items-center gap-1 px-space-sm py-1.5 rounded-lg bg-surface text-text-muted font-caption text-caption border border-border/40">
                <span className="material-symbols-outlined text-[16px] text-status-success">
                  verified
                </span>
                <span>All certified original</span>
              </div>
            </div>
          </div>

          {/* Controls & Filter Deck */}
          <FilterToolbar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            inStockOnly={inStockOnly}
            onToggleStock={handleToggleStock}
            sortOption={sortOption}
            onSortChange={handleSortChange}
            activeCategory={activeCategory}
            onSelectCategory={handleCategorySelect}
            onReset={handleResetFilters}
          />
        </section>

        {/* SECTION 2: PRODUCT GRID */}
        <section className="w-full pb-space-xl">
          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-space-md lg:gap-gutter-desktop">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="w-full py-20 flex flex-col items-center justify-center text-center bg-surface rounded-xl p-space-xl border border-border/40">
              <div className="w-16 h-16 rounded-full bg-surface-raised flex items-center justify-center text-text-muted mb-space-md">
                <span className="material-symbols-outlined text-[32px]">filter_list_off</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-text-primary font-semibold">
                No Matching Objects Found
              </h3>
              <p className="font-body-md text-body-md text-text-muted max-w-md mt-1 mb-space-lg">
                No hardware specifications match your current active filter queries. Reset your
                constraints or try searching for broader keywords.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="bg-primary-container text-on-primary font-label-md text-label-md font-semibold px-space-lg py-2.5 rounded-lg hover:bg-secondary-fixed transition-colors shadow-md"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Pagination & Load More Progress Bar */}
          {filteredProducts.length > 0 && (
            <div className="mt-space-xl w-full flex flex-col items-center justify-center text-center gap-space-md pt-space-lg">
              <div className="w-full max-w-sm flex flex-col gap-2">
                <div className="flex items-center justify-between font-caption text-caption text-text-muted">
                  <span>
                    Displaying {displayedProducts.length} of {filteredProducts.length} curated items
                  </span>
                  <span className="font-mono text-primary-container">
                    {Math.round((displayedProducts.length / filteredProducts.length) * 100)}%
                  </span>
                </div>
                {/* Progress Track */}
                <div className="w-full h-1.5 bg-surface-raised rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-container rounded-full transition-all duration-500"
                    style={{
                      width: `${(displayedProducts.length / filteredProducts.length) * 100}%`
                    }}
                  />
                </div>
              </div>

              {displayedProducts.length < filteredProducts.length && (
                <button
                  type="button"
                  disabled={loadingMore}
                  onClick={handleLoadMore}
                  className="group flex items-center gap-space-sm px-space-xl py-3 rounded-lg bg-surface hover:bg-surface-raised text-text-primary font-label-md text-label-md font-semibold transition-all shadow-md active:scale-95 border border-border/40"
                >
                  <span
                    className={`material-symbols-outlined text-[18px] text-primary-container transition-transform duration-500 ${
                      loadingMore ? 'animate-spin' : 'group-hover:rotate-180'
                    }`}
                  >
                    sync
                  </span>
                  <span>
                    {loadingMore ? 'Retaining Catalog...' : 'Load More Curated Items'}
                  </span>
                </button>
              )}

              <span className="font-caption text-caption text-text-muted tracking-wider uppercase opacity-60">
                Curated Batch Ref: NC-CAT-2025-V2
              </span>
            </div>
          )}
        </section>

        {/* EDITORIAL BRAND STORYTELLING BANNER */}
        <section className="w-full mb-space-xl mt-space-lg bg-surface-container-low rounded-2xl p-space-lg md:p-space-xl flex flex-col md:flex-row items-center justify-between gap-space-xl shadow-lg relative overflow-hidden border border-border/40">
          <div className="flex flex-col gap-space-xs max-w-xl z-10">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-primary-container/20 text-primary-container font-caption text-caption uppercase tracking-widest font-semibold">
                Private Allocation
              </span>
              <span className="font-caption text-caption text-text-muted">
                Limited Production Runs
              </span>
            </div>
            <h2 className="font-headline-md text-headline-md text-text-primary font-semibold tracking-tight">
              Need tailored hardware consulting?
            </h2>
            <p className="font-body-md text-body-md text-text-muted">
              Our industrial design lab provides custom architectural finishes and bulk procurement
              solutions for modern studio workflows and creative agencies.
            </p>
            <div className="flex items-center gap-space-md pt-space-xs">
              <button
                type="button"
                onClick={() => showToast('Inquiry Dispatched', 'Studio consultation brochure queued')}
                className="bg-primary-container text-on-primary font-label-md text-label-md font-semibold px-space-md py-2.5 rounded-lg hover:bg-secondary-fixed transition-colors shadow"
              >
                Request Studio Catalog
              </button>
              <Link
                to="/about"
                className="font-label-md text-label-md text-text-muted hover:text-text-primary transition-colors flex items-center gap-1"
              >
                <span>Learn about our metalsmithing</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Graphical Metric Vignette */}
          <div className="grid grid-cols-2 gap-space-md w-full md:w-auto shrink-0 z-10">
            <div className="bg-surface p-space-md rounded-xl flex flex-col gap-1 min-w-[130px] border border-border/30">
              <span className="font-headline-sm text-headline-sm text-primary-container font-bold">
                100%
              </span>
              <span className="font-caption text-caption text-text-muted">Aircraft-grade CNC</span>
            </div>
            <div className="bg-surface p-space-md rounded-xl flex flex-col gap-1 min-w-[130px] border border-border/30">
              <span className="font-headline-sm text-headline-sm text-text-primary font-bold">
                Lifetime
              </span>
              <span className="font-caption text-caption text-text-muted">Chassis Warranty</span>
            </div>
          </div>

          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-primary-container/5 blur-3xl pointer-events-none" />
        </section>
      </div>
    </div>
  );
}
