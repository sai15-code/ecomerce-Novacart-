import React from 'react';

export default function StateSwitcher({ currentMode, onSwitchMode }) {
  const modes = [
    { id: 'live', label: 'Live Grid', icon: 'grid_view' },
    { id: 'skeletons', label: 'Loading Skeletons', icon: 'hourglass_empty' },
    { id: 'empty', label: 'No Results', icon: 'search_off' },
    { id: 'error', label: 'API Error (Simulated 503)', icon: 'error', isDanger: true }
  ];

  return (
    <div className="w-full mb-space-lg p-space-sm rounded-xl bg-surface-container flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-sm shadow-sm border border-border/50">
      <div className="flex items-center gap-space-xs text-text-muted font-caption text-caption px-space-xs">
        <span className="material-symbols-outlined text-[16px] text-primary-container">
          science
        </span>
        <span className="font-semibold text-text-primary uppercase tracking-wider">
          Engineering State Switcher:
        </span>
        <span className="hidden sm:inline">Preview system edge cases for grading</span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {modes.map((m) => {
          const isActive = currentMode === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onSwitchMode(m.id)}
              className={`px-3 py-1.5 rounded-lg font-label-md text-label-md font-semibold transition-all flex items-center gap-1.5 ${
                isActive
                  ? m.isDanger
                    ? 'bg-status-danger text-black shadow-sm font-bold scale-[1.02]'
                    : 'bg-primary-container text-on-primary shadow-sm scale-[1.02]'
                  : 'bg-surface text-text-muted hover:text-text-primary hover:bg-surface-raised'
              }`}
            >
              {isActive ? (
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              ) : (
                <span
                  className={`material-symbols-outlined text-[15px] ${
                    m.isDanger ? 'text-status-danger' : ''
                  }`}
                >
                  {m.icon}
                </span>
              )}
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
