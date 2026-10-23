import React from 'react';
import { useToast } from '../../context/ToastContext';

export default function Toast() {
  const { toast, hideToast } = useToast();

  if (!toast) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 pointer-events-auto"
      role="status"
      aria-live="polite"
    >
      <div className="bg-surface-raised border border-border px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[16px]">check</span>
        </div>
        <div className="flex flex-col pr-2">
          <p className="font-label-sm text-label-sm text-text-primary font-semibold">
            {toast.title}
          </p>
          <p className="font-caption text-caption text-text-muted">
            {toast.subtitle}
          </p>
        </div>
        <button
          type="button"
          onClick={hideToast}
          className="text-text-muted hover:text-text-primary p-1 -mr-1"
          aria-label="Dismiss toast"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    </div>
  );
}
