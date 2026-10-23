import React from 'react';
import { CATEGORIES } from '../../data/products';

export default function FilterToolbar({
  searchQuery,
  onSearchChange,
  inStockOnly,
  onToggleStock,
  sortOption,
  onSortChange,
  activeCategory,
  onSelectCategory,
  onReset
}) {
  return (
    <div className="w-full flex flex-col gap-space-md bg-surface p-space-md rounded-xl shadow-md border border-border/40">
      {/* Row 1: Search, Stock Toggle, Sorting & Clear Action */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md">
        {/* Interactive Search Field */}
        <div className="relative flex-1 max-w-xl">
          <span className="material-symbols-outlined absolute left-space-md top-1/2 -translate-y-1/2 text-[20px] text-text-muted pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by object name, category, or industrial finish..."
            className="w-full bg-surface-raised text-text-primary pl-11 pr-10 py-2.5 rounded-lg font-body-md text-body-md placeholder:text-text-muted placeholder:opacity-60 focus:outline-none focus:ring-1 focus:ring-primary-container transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              aria-label="Clear Search Input"
              onClick={() => onSearchChange('')}
              className="absolute right-space-sm top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        {/* Secondary Controls: In Stock Switch, Sort, Clear Button */}
        <div className="flex flex-wrap items-center justify-between lg:justify-end gap-space-md shrink-0">
          {/* In-Stock Toggle Switch */}
          <div
            onClick={onToggleStock}
            className="flex items-center gap-space-sm cursor-pointer select-none"
            role="switch"
            aria-checked={inStockOnly}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                onToggleStock();
              }
            }}
          >
            <span className="font-label-md text-label-md text-text-muted">In-Stock Only</span>
            <div
              className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out relative flex items-center ${
                inStockOnly ? 'bg-primary-container' : 'bg-surface-raised'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${
                  inStockOnly
                    ? 'translate-x-5 bg-on-primary'
                    : 'translate-x-0 bg-text-muted'
                }`}
              />
            </div>
          </div>

          <div className="h-5 w-px bg-surface-container-high hidden sm:block" />

          {/* Sort Dropdown */}
          <div className="flex items-center gap-space-xs">
            <span className="font-caption text-caption text-text-muted uppercase tracking-wider hidden sm:inline">
              Sort:
            </span>
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => onSortChange(e.target.value)}
                className="appearance-none bg-surface-raised text-text-primary font-label-md text-label-md py-2 pl-space-md pr-8 rounded-lg cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-container border border-border/40"
              >
                <option value="Featured">Featured Collection</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Customer Rating">Customer Rating</option>
                <option value="Newest">Newest Releases</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[18px] text-text-muted pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

          {/* Clear All Ghost Button */}
          <button
            type="button"
            onClick={onReset}
            className="font-label-md text-label-md text-text-muted hover:text-primary-container flex items-center gap-1 transition-colors py-1.5 px-space-xs"
          >
            <span className="material-symbols-outlined text-[16px]">restart_alt</span>
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Row 2: Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-space-xs pt-space-xs border-t border-surface-container-high/40">
        <span className="font-caption text-caption uppercase tracking-wider text-text-muted mr-1.5">
          Segment:
        </span>
        {CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`px-space-md py-1.5 rounded-lg font-label-md text-label-md transition-all flex items-center gap-space-xs shadow-sm ${
                isSelected
                  ? 'bg-surface-raised text-primary-container border border-primary-container/30'
                  : 'bg-surface text-text-muted hover:text-text-primary hover:bg-surface-raised'
              }`}
            >
              {cat.icon && (
                <span className="material-symbols-outlined text-[15px]">{cat.icon}</span>
              )}
              <span>{cat.name.replace('Acoustics & ', '').replace('Precision ', '').replace(' Objects', '')}</span>
              <span
                className={`font-caption text-caption ${
                  isSelected ? 'opacity-80' : 'opacity-60'
                }`}
              >
                ({cat.count})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
