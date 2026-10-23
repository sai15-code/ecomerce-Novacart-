import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, PRODUCTS } from '../data/products';

export const CAPSULES = [
  {
    id: 'winter-2025',
    title: 'Winter Editorial Capsule 2025',
    subtitle: 'Monolithic Titanium & Basalt Compositions',
    itemsCount: 6,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUtRRUC7KvXTN7KVUgF34yYslht0aVrvLjCwX43RSqUplRxaIApLwXv8CduBU4ilWuEe3Sf_jNXAdHl2aCKXfcPUw-jrY6GyN-ybpFUXTL9dqFj1cX-rUzr-_nmm_BL0pM1EskYLyOeYI58wf-JMv_zIDIVEaLNtrqCXm3pw8QPyir-bwkOV7ocWfmGVQOlqIUiuQIf2_Nj92L-4OMzAQzPX0MUcNogUIk4dq0qNIb_TVZKHvWUg5W',
    category: 'Audio'
  },
  {
    id: 'horology-atelier',
    title: 'Horology Atelier Edition',
    subtitle: 'Swiss Automatic & Column-Wheel Calibers',
    itemsCount: 4,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtt4kpdNMq65Aolu6C3vVFS8en9_p8X2_lIzYPN3cxncLzSG48-w8lzsRYFBFgV-Uj0L2JuAB1xyYJ7nM8BqNnd5cqhQ4iMf3QIaDs3WtOp8mz7iMfBP08I67uTXyYzhQoK-QLhZgla5WYkATmJPUaHy4kYuyiPfQRw4WHudM7Dh2EwVbFP3DTFweeF75vWC3LmxkBD61rOgMEiJFLU7Vjvo1Qhka2kdx7LASE7zDYhWJivZ0nsJxC',
    category: 'Timepieces'
  },
  {
    id: 'desk-monolith',
    title: 'Monolith Workstation Suite',
    subtitle: 'Vegetable-Tanned Italian Leather & 6063 Aluminum',
    itemsCount: 5,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMhFsD1vdEVC-aZOa8qUwUnQtuZ-Y4WSvN9VhgLFR2Btl1-ATUF-mho5tepXB-sPm2_Lr0Fg4mjJgsiqi79Xmti6FlosmHNy0bzHXs5KJa1pQCllLqMIGfjr2girpRF0gkxJ2BcWfXU6bJZHY9U_-2cXrozpDmlwEcLLGxIfAy3vi38jZn4_RyGc_tG3IK6yiSHU-T-aYW04-wvA_tetxTdaEbgnb_MBQscuwDP5ZFYUle3w3A5cae',
    category: 'Desk Setup'
  },
  {
    id: 'edc-tactile',
    title: 'Tactile Everyday Carry',
    subtitle: 'Machined C360 Brass & Cryo-Treated Blades',
    itemsCount: 4,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDaGl-Z1B64Ve4J0zCMFhhLeqa4JuxWuwOpthpI2wvpGbsMQCEdYD7EbgyIkdFF8cI-deyhmUMMTzxhsXu-APLYdICbJ4_xJYRlcoCN79hCsaMdjqVrncjFbLTKT6PiGFqb6sxXSv9MTeqLbqw_PMDHk5Y2iB2JkPRKELDFJXhiYBymjnW_fnSkP0qX3sFdX0I_giVPgD5pwF0TBhhB-esQVk-xW-Nv_hDJVKS8OPxBBPIduCNHgSW',
    category: 'Everyday Carry'
  }
];

export default function CollectionsPage() {
  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-lg">
      <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs font-caption text-caption text-text-muted mb-space-md">
        <Link to="/" className="hover:text-text-primary transition-colors flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">home</span>
          <span>Storefront</span>
        </Link>
        <span className="opacity-40">/</span>
        <span className="text-text-primary font-medium">Curated Collections</span>
        <span className="opacity-40">/</span>
        <span className="text-primary-container font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-surface-raised border border-border/40">
          Capsule Archive
        </span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pb-space-lg border-b border-border/40 mb-space-lg">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-primary-container animate-pulse" />
            <span className="font-caption text-caption uppercase tracking-widest text-primary-container font-semibold">
              Thematic Capsules
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-text-primary font-bold tracking-tight">
            Curated Collections
          </h1>
          <p className="font-body-md text-body-md text-text-muted mt-2 max-w-xl">
            Thoughtfully grouped assemblies engineered to complement each other in tactile finish, weight, and material palette.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg lg:gap-gutter-desktop">
        {CAPSULES.map((capsule) => (
          <Link
            key={capsule.id}
            to={`/catalog?category=${encodeURIComponent(capsule.category)}`}
            className="group relative rounded-2xl overflow-hidden bg-surface border border-border/40 shadow-xl flex flex-col hover:border-primary-container/40 transition-all duration-300"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-container">
              <img
                src={capsule.image}
                alt={capsule.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-surface-raised/90 backdrop-blur-md text-primary-container font-caption text-caption uppercase tracking-wider font-semibold border border-border/40">
                  {capsule.category}
                </span>
              </div>
            </div>

            <div className="p-space-lg flex items-center justify-between">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-text-primary font-semibold group-hover:text-primary-container transition-colors">
                  {capsule.title}
                </h3>
                <p className="font-body-md text-body-md text-text-muted mt-1">
                  {capsule.subtitle}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-text-muted group-hover:bg-primary-container group-hover:text-on-primary transition-colors shrink-0 ml-4">
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
