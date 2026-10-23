import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className="w-full bg-surface-container-lowest border-b border-border py-2 px-margin lg:px-margin-desktop transition-all"
      id="announcement-bar"
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between font-caption text-caption text-text-muted">
        <div className="flex items-center gap-space-sm mx-auto text-center flex-wrap justify-center">
          <span className="inline-block px-1.5 py-0.5 rounded bg-primary-container text-on-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
            Complimentary
          </span>
          <span>
            Worldwide express shipping on orders over ₹12,000 —{' '}
            <Link to="/collections" className="underline hover:text-text-primary transition-colors">
              Shop the Winter Editorial Collection
            </Link>
          </span>
        </div>
        <button
          type="button"
          aria-label="Dismiss announcement"
          className="text-text-muted hover:text-text-primary transition-colors flex items-center ml-2"
          onClick={() => setDismissed(true)}
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    </div>
  );
}
