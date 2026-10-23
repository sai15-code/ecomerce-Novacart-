import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NotFoundPage() {
  const location = useLocation();

  return (
    <div className="w-full max-w-[1440px] mx-auto px-margin lg:px-margin-desktop py-16">
      <div className="relative bg-surface rounded-xl p-8 md:p-16 overflow-hidden shadow-2xl border border-border/40">
        {/* Ambient Backlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-container/10 blur-[120px] pointer-events-none rounded-full" />

        {/* Ghost Background 404 Typographic Watermark */}
        <div className="absolute -right-8 -bottom-12 select-none pointer-events-none text-[160px] md:text-[240px] font-bold text-surface-container-high/40 leading-none tracking-tighter">
          404
        </div>

        <div className="relative z-10 max-w-2xl flex flex-col items-start">
          {/* Big Glowing Badge */}
          <div className="inline-flex items-center gap-space-sm px-3.5 py-1.5 rounded-full bg-surface-raised shadow-lg mb-6 border border-border/40">
            <span className="w-2 h-2 rounded-full bg-status-danger animate-ping" />
            <span className="w-2 h-2 rounded-full bg-status-danger -ml-3.5" />
            <span className="font-caption text-caption font-mono uppercase tracking-[0.18em] text-status-danger font-semibold">
              ERROR 404 // ROUTE NOT FOUND
            </span>
          </div>

          <h2 className="font-headline-lg text-headline-lg md:text-[40px] md:leading-[46px] text-text-primary font-semibold tracking-[-0.02em]">
            Archived Destination or Relocated Object.
          </h2>

          <p className="font-body-lg text-body-lg text-text-muted mt-4 leading-relaxed max-w-xl">
            The page or product variant you are seeking has been archived or relocated. The
            requested path does not map to any active inventory schema in the current deployment
            matrix.
          </p>

          {/* Technical Trace Breadcrumb */}
          <div className="mt-6 w-full max-w-lg bg-surface-container-lowest p-3.5 rounded font-mono text-caption text-text-muted flex items-center justify-between border border-border/30">
            <span className="truncate">PATH: {location.pathname}</span>
            <span className="text-primary-container shrink-0 ml-3">STATUS_VOID</span>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-space-md w-full sm:w-auto">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary font-label-md text-label-md font-semibold px-6 py-3.5 rounded hover:bg-secondary-fixed transition-all duration-150 active:scale-[0.98] shadow-md shadow-primary-container/20 text-center"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Return to Homepage</span>
            </Link>

            <Link
              to="/catalog"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-surface-raised hover:bg-surface-bright text-text-primary font-label-md text-label-md font-medium px-6 py-3.5 rounded transition-all duration-150 text-center shadow border border-border/40"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
              <span>Search Catalog</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
