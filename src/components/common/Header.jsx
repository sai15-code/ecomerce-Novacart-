import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import AnnouncementBar from './AnnouncementBar';
import NovaCartLogo from './NovaCartLogo';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function Header() {
  const { totalItemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();

  // Keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(searchVal.trim())}`);
      setSearchOpen(false);
      setSearchVal('');
    }
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'transition-colors text-text-primary border-b-2 border-primary-container pb-1 font-semibold'
      : 'text-text-muted hover:text-text-primary transition-colors pb-1';

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md">
      <AnnouncementBar />

      <div className="h-[72px] border-b border-border">
        <div className="max-w-[1440px] mx-auto h-full px-margin lg:px-margin-desktop flex items-center justify-between gap-space-md">
          {/* Logo & Brand */}
          <div className="flex items-center gap-space-md shrink-0">
            <button
              type="button"
              className="lg:hidden p-1.5 text-text-muted hover:text-text-primary transition-colors -ml-1"
              aria-label="Toggle Navigation Menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>

            <Link to="/" aria-label="NovaCart Storefront Home">
              <NovaCartLogo />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-space-lg font-label-md text-label-md">
            <NavLink to="/catalog" className={navLinkClass}>
              Catalog
            </NavLink>
            <NavLink to="/new-arrivals" className={navLinkClass}>
              New Arrivals
            </NavLink>
            <NavLink to="/collections" className={navLinkClass}>
              Collections
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/journal" className={navLinkClass}>
              Journal
            </NavLink>
          </nav>

          {/* Right Action Icons & Search */}
          <div className="flex items-center gap-space-md">
            {/* Quick Search trigger box (desktop) */}
            <div
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center bg-surface-container border border-border rounded px-space-sm py-1.5 w-60 justify-between focus-within:border-primary-container transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[18px] text-text-muted group-hover:text-primary-container transition-colors">
                  search
                </span>
                <span className="font-body-md text-body-md text-text-muted opacity-60">
                  Search objects...
                </span>
              </div>
              <kbd className="bg-surface-raised border border-border rounded px-1.5 py-0.5 font-caption text-caption text-text-muted select-none">
                ⌘K
              </kbd>
            </div>

            {/* Mobile Search Icon */}
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="md:hidden p-2 text-text-muted hover:text-text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>

            <div className="flex items-center gap-space-sm">
              {/* Wishlist */}
              <Link
                to="/catalog?filter=wishlist"
                aria-label={`Wishlist with ${wishlistCount} items`}
                className="relative p-2 text-text-muted hover:text-text-primary transition-colors flex items-center"
              >
                <span className="material-symbols-outlined text-[22px]">favorite</span>
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-surface-raised border border-border font-caption text-[10px] text-text-muted flex items-center justify-center">
                  {wishlistCount}
                </span>
              </Link>

              {/* Orders */}
              <Link
                to="/orders"
                aria-label="My Orders"
                className="p-2 text-text-muted hover:text-text-primary transition-colors flex items-center"
                title="My Orders"
              >
                <span className="material-symbols-outlined text-[22px]">receipt_long</span>
              </Link>

              {/* Shopping Bag */}
              <Link
                to="/cart"
                aria-label={`Shopping Cart with ${totalItemCount} items`}
                className="relative flex items-center gap-space-xs p-2 text-text-muted hover:text-text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
                <span className="px-1.5 py-0.5 rounded-full bg-primary-container text-on-primary font-label-sm text-[11px] font-semibold leading-none">
                  {totalItemCount}
                </span>
              </Link>

              <div className="h-4 w-px bg-border mx-1 hidden sm:block" />

              {/* Profile Avatar */}
              <Link
                to="/about"
                aria-label="User Profile and Capstone Story"
                className="flex items-center pl-1"
              >
                <div className="w-8 h-8 rounded-full bg-surface-raised border border-border hover:border-primary-container transition-colors flex items-center justify-center text-primary-container font-caption font-semibold">
                  NC
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-low border-b border-border px-margin py-space-md transition-all">
          <nav className="flex flex-col gap-3 font-label-md text-label-md">
            <Link
              to="/catalog"
              className="py-2 text-text-primary hover:text-primary-container transition-colors flex items-center justify-between"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Catalog</span>
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </Link>
            <Link
              to="/new-arrivals"
              className="py-2 text-text-muted hover:text-text-primary transition-colors flex items-center justify-between"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>New Arrivals</span>
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </Link>
            <Link
              to="/collections"
              className="py-2 text-text-muted hover:text-text-primary transition-colors flex items-center justify-between"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Collections</span>
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </Link>
            <Link
              to="/about"
              className="py-2 text-text-muted hover:text-text-primary transition-colors flex items-center justify-between"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>About NovaCart</span>
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </Link>
            <Link
              to="/journal"
              className="py-2 text-text-muted hover:text-text-primary transition-colors flex items-center justify-between"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Editorial Journal</span>
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </Link>
            <Link
              to="/orders"
              className="py-2 text-text-muted hover:text-text-primary transition-colors flex items-center justify-between border-t border-border/30 pt-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>My Orders</span>
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            </Link>
            <Link
              to="/cart"
              className="py-2 text-primary-container font-semibold flex items-center justify-between"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Shopping Bag ({totalItemCount})</span>
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
            </Link>
          </nav>
        </div>
      )}

      {/* Search Modal Overlay (⌘K) */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-start justify-center pt-24 px-4"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-xl bg-surface border border-border rounded-xl shadow-2xl overflow-hidden p-space-md"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <span className="material-symbols-outlined text-[22px] text-text-muted absolute left-3">
                search
              </span>
              <input
                type="text"
                autoFocus
                placeholder="Search by object name, category, or finish..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full bg-surface-raised text-text-primary pl-11 pr-10 py-3 rounded-lg font-body-md text-body-md placeholder:text-text-muted placeholder:opacity-60 focus:outline-none focus:ring-1 focus:ring-primary-container transition-all"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="absolute right-3 text-text-muted hover:text-text-primary"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </form>
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-caption font-caption text-text-muted">
              <span>Press [Enter] to query or [Esc] to cancel</span>
              <span className="text-primary-container font-mono">Archive 2025</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
