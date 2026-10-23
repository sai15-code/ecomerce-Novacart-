import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NovaCartLogo from './NovaCartLogo';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="w-full bg-surface-container-lowest border-t border-border mt-space-xl">
      <div className="max-w-[1440px] mx-auto px-margin lg:px-margin-desktop py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-xl pb-space-xl border-b border-border">
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            <Link to="/" aria-label="NovaCart Home">
              <NovaCartLogo size="small" />
            </Link>
            <p className="font-body-md text-body-md text-text-muted max-w-sm">
              Engineered modern essentials rooted in the discipline of technical minimalism. We
              balance architectural purity with exceptional tactile durability.
            </p>
            <div className="flex items-center gap-space-sm mt-space-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-border bg-surface-container font-caption text-caption text-text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse"></span>
                Global Logistics Active
              </span>
            </div>
          </div>

          {/* Shop Column */}
          <div className="lg:col-span-2 flex flex-col gap-space-sm">
            <span className="font-label-md text-label-md uppercase tracking-wider text-text-primary font-semibold">
              Shop
            </span>
            <ul className="flex flex-col gap-2 font-body-md text-body-md text-text-muted">
              <li>
                <Link to="/catalog" className="hover:text-text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="hover:text-text-primary transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-text-primary transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=Audio" className="hover:text-text-primary transition-colors">
                  Audio Objects
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=Timepieces" className="hover:text-text-primary transition-colors">
                  Timepieces
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=Desk Setup" className="hover:text-text-primary transition-colors">
                  Desk Hardware
                </Link>
              </li>
            </ul>
          </div>

          {/* Care & Policy */}
          <div className="lg:col-span-2 flex flex-col gap-space-sm">
            <span className="font-label-md text-label-md uppercase tracking-wider text-text-primary font-semibold">
              Care & Policy
            </span>
            <ul className="flex flex-col gap-2 font-body-md text-body-md text-text-muted">
              <li>
                <Link to="/about" className="hover:text-text-primary transition-colors">
                  Express Shipping
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-text-primary transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-text-primary transition-colors">
                  Lifetime Warranty
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-text-primary transition-colors">
                  Direct Concierge
                </Link>
              </li>
              <li>
                <Link to="/journal" className="hover:text-text-primary transition-colors">
                  Material Journal
                </Link>
              </li>
            </ul>
          </div>

          {/* Editorial Dispatch Subscription */}
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            <span className="font-label-md text-label-md uppercase tracking-wider text-text-primary font-semibold">
              Editorial Dispatch
            </span>
            <p className="font-body-md text-body-md text-text-muted">
              Subscribe for seasonal capsules, object archives, and quiet private releases.
            </p>
            {subscribed ? (
              <div className="p-3 bg-surface-container rounded-lg border border-primary-container/40 text-primary-container font-label-md text-label-md flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Subscribed. Welcome to the NovaCart archive dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-space-xs mt-space-xs">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your correspondence email"
                  className="bg-surface border border-border rounded px-space-md py-2.5 font-body-md text-body-md text-text-primary placeholder:text-text-muted placeholder:opacity-60 focus:border-primary-container focus:outline-none flex-1"
                />
                <button
                  type="submit"
                  className="bg-primary-container text-on-primary font-label-md text-label-md font-semibold px-space-lg py-2.5 rounded hover:bg-secondary-fixed transition-colors text-center whitespace-nowrap active:scale-95"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md font-caption text-caption text-text-muted">
          <div className="flex flex-wrap items-center gap-space-md">
            <span>© 2025 NovaCart Industries. All rights reserved.</span>
            <Link to="/about" className="hover:text-text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="hover:text-text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
          <div className="flex items-center gap-space-sm">
            <span className="px-2 py-0.5 rounded border border-border bg-surface font-caption text-[11px] text-text-muted tracking-wide flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
              Thiranex Capstone Project
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
