import React from 'react';

export default function Skeletons({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-space-md lg:gap-gutter-desktop">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-surface rounded-xl p-space-sm flex flex-col gap-space-sm animate-pulse border border-border/30"
        >
          <div className="w-full aspect-[4/5] bg-surface-raised rounded-lg" />
          <div className="w-1/3 h-3 bg-surface-raised rounded mt-2" />
          <div className="w-4/5 h-5 bg-surface-raised rounded" />
          <div className="w-1/4 h-6 bg-surface-raised rounded mt-1" />
          <div className="w-full h-10 bg-surface-raised rounded-lg mt-3" />
        </div>
      ))}
    </div>
  );
}
