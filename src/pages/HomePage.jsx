import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/catalog/ProductCard';

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState('All');

  // Filter trending objects
  const trendingProducts = PRODUCTS.filter(p => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Hardware') return p.category === 'Desk Setup';
    if (activeFilter === 'Audio') return p.category === 'Audio';
    if (activeFilter === 'Instruments') return p.category === 'Timepieces';
    return true;
  }).slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO SECTION */}
      <section className="relative w-full max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop pt-space-lg lg:pt-space-xl pb-space-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-gutter-desktop items-center">
          {/* Left Column: Typographic Narrative */}
          <div className="lg:col-span-6 flex flex-col z-10">
            <div className="inline-flex items-center gap-2 mb-space-md">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
              <span className="font-label-sm text-label-sm tracking-[0.18em] uppercase text-primary-container font-semibold">
                EDITION 2025 // CURATED ESSENTIALS
              </span>
            </div>

            <h1 className="font-display-hero-mobile lg:font-display-hero text-display-hero-mobile lg:text-display-hero text-text-primary tracking-tight font-semibold mb-space-md max-w-xl">
              Precision Hardware. <br />
              <span className="text-text-muted">Timeless Form.</span>
            </h1>

            <p className="font-body-lg text-body-lg text-text-muted max-w-lg mb-space-xl leading-relaxed">
              A meticulously curated catalog of premium personal tech, precision timepieces, and
              acoustic engineering designed for deliberate living.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-space-md mb-space-xl">
              <Link
                to="/catalog"
                className="inline-flex items-center justify-center gap-space-xs px-space-xl py-3.5 rounded bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-secondary-fixed transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary-container focus:ring-offset-2 focus:ring-offset-background shadow-lg"
              >
                <span>Explore Catalog</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-space-lg py-3.5 rounded bg-surface hover:bg-surface-raised text-text-primary font-label-md text-label-md transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-text-muted border border-border/40"
              >
                View Lookbook
              </Link>
            </div>

            {/* Metric strip */}
            <div className="grid grid-cols-3 gap-space-md pt-space-lg bg-surface-container/40 rounded-xl p-space-md backdrop-blur-sm max-w-lg border border-border/30">
              <div>
                <div className="font-headline-sm text-headline-sm text-text-primary font-semibold">
                  0.02<span className="text-primary-container">mm</span>
                </div>
                <div className="font-caption text-caption text-text-muted mt-0.5">
                  Milling Precision
                </div>
              </div>
              <div>
                <div className="font-headline-sm text-headline-sm text-text-primary font-semibold">
                  100<span className="text-primary-container">%</span>
                </div>
                <div className="font-caption text-caption text-text-muted mt-0.5">
                  Recycled Grade-5 Ti
                </div>
              </div>
              <div>
                <div className="font-headline-sm text-headline-sm text-text-primary font-semibold">
                  48<span className="text-primary-container">h</span>
                </div>
                <div className="font-caption text-caption text-text-muted mt-0.5">
                  Global Courier Dispatch
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dual Product Composition & Floating Pill Badges */}
          <div className="lg:col-span-6 relative mt-space-lg lg:mt-0">
            {/* Ambient radial glow behind editorial composition */}
            <div className="absolute -top-16 -right-16 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-8 left-12 w-80 h-80 bg-surface-raised rounded-full blur-2xl pointer-events-none" />

            <div className="relative grid grid-cols-12 gap-space-sm items-center">
              {/* Primary Hero Tile: Acoustic Headphone */}
              <Link
                to="/products/1"
                className="col-span-8 relative rounded-xl overflow-hidden bg-surface group shadow-xl block border border-border/40"
              >
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <img
                    alt="Minimalist matte black ceramic acoustic headphones"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUtRRUC7KvXTN7KVUgF34yYslht0aVrvLjCwX43RSqUplRxaIApLwXv8CduBU4ilWuEe3Sf_jNXAdHl2aCKXfcPUw-jrY6GyN-ybpFUXTL9dqFj1cX-rUzr-_nmm_BL0pM1EskYLyOeYI58wf-JMv_zIDIVEaLNtrqCXm3pw8QPyir-bwkOV7ocWfmGVQOlqIUiuQIf2_Nj92L-4OMzAQzPX0MUcNogUIk4dq0qNIb_TVZKHvWUg5W"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div>
                    <span className="font-caption text-caption uppercase tracking-wider text-text-muted">
                      Acoustics
                    </span>
                    <p className="font-title-product text-title-product text-text-primary font-medium group-hover:text-primary-container transition-colors">
                      Aether Pro Ceramic
                    </p>
                  </div>
                  <span className="font-label-md text-label-md text-primary-container bg-surface-raised/90 px-2.5 py-1 rounded backdrop-blur">
                    ₹31,990
                  </span>
                </div>
                {/* Floating minimal spec badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-surface-raised/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-border/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                  <span className="font-caption text-caption uppercase text-text-primary tracking-wider font-medium">
                    Bespoke Drivers 40mm
                  </span>
                </div>
              </Link>

              {/* Secondary Hero Tile: Minimal Titanium Watch */}
              <div className="col-span-4 -ml-6 lg:-ml-10 z-20 flex flex-col gap-space-md">
                <Link
                  to="/products/2"
                  className="relative rounded-xl overflow-hidden bg-surface-raised group shadow-2xl block border border-border/50"
                >
                  <div className="aspect-[3/4] w-full overflow-hidden">
                    <img
                      alt="Extreme macro shot of sleek brushed titanium watch case"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtt4kpdNMq65Aolu6C3vVFS8en9_p8X2_lIzYPN3cxncLzSG48-w8lzsRYFBFgV-Uj0L2JuAB1xyYJ7nM8BqNnd5cqhQ4iMf3QIaDs3WtOp8mz7iMfBP08I67uTXyYzhQoK-QLhZgla5WYkATmJPUaHy4kYuyiPfQRw4WHudM7Dh2EwVbFP3DTFweeF75vWC3LmxkBD61rOgMEiJFLU7Vjvo1Qhka2kdx7LASE7zDYhWJivZ0nsJxC"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
                  {/* Floating Pill Badge on secondary tile */}
                  <div className="absolute bottom-3 left-3 right-3 bg-surface/90 backdrop-blur-md p-2.5 rounded shadow-md border border-border/30">
                    <span className="font-caption text-caption text-primary-container block font-mono">
                      SPEC // 01
                    </span>
                    <span className="font-label-sm text-label-sm text-text-primary font-medium block">
                      CNC Machined Titanium
                    </span>
                  </div>
                </Link>

                {/* Subtle Stat Accent Widget */}
                <div className="bg-surface p-4 rounded-xl shadow flex items-center gap-3 border border-border/40">
                  <div className="p-2 rounded bg-surface-raised text-primary-container shrink-0">
                    <span className="material-symbols-outlined text-[20px]">verified</span>
                  </div>
                  <div>
                    <div className="font-label-sm text-label-sm text-text-primary font-medium">
                      Swiss Certified
                    </div>
                    <div className="font-caption text-caption text-text-muted">
                      ISO 1413 Shock Proof
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: FEATURED CATEGORIES ROW */}
      <section className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-xs">
          <div>
            <span className="font-caption text-caption uppercase tracking-widest text-primary-container font-semibold">
              Disciplines
            </span>
            <h2 className="font-headline-md text-headline-md text-text-primary tracking-tight mt-1 font-semibold">
              Curated Categories
            </h2>
          </div>
          <Link
            to="/catalog"
            className="font-label-md text-label-md text-text-muted hover:text-text-primary inline-flex items-center gap-1 group transition-colors"
          >
            <span>Browse full archive</span>
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter lg:gap-gutter-desktop">
          {CATEGORIES.filter(c => c.id !== 'All').map((category) => (
            <Link
              key={category.id}
              to={`/catalog?category=${encodeURIComponent(category.id)}`}
              className="group relative rounded-xl overflow-hidden bg-surface flex flex-col p-space-md hover:bg-surface-raised transition-all duration-300 border border-border/30 shadow-sm"
            >
              <div className="aspect-[4/3] w-full rounded-lg overflow-hidden mb-space-md bg-surface-container">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div>
                  <h3 className="font-title-product text-title-product text-text-primary font-medium group-hover:text-primary-container transition-colors">
                    {category.name}
                  </h3>
                  <span className="font-caption text-caption text-text-muted">
                    {category.count} items
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-text-muted group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 3: TRENDING PRODUCTS GRID (4-COLUMN LAYOUT) */}
      <section className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
          <div>
            <span className="font-caption text-caption uppercase tracking-widest text-primary-container font-semibold">
              Seasonal Capsule
            </span>
            <h2 className="font-headline-md text-headline-md text-text-primary tracking-tight mt-1 font-semibold">
              Trending Objects
            </h2>
          </div>
          {/* Filter Chips */}
          <div className="flex items-center gap-2 mt-space-md md:mt-0 overflow-x-auto pb-1">
            {['All', 'Hardware', 'Audio', 'Instruments'].map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded font-label-sm text-label-sm transition-colors ${
                    isActive
                      ? 'bg-surface-raised text-primary-container border border-primary-container/30'
                      : 'bg-surface text-text-muted hover:text-text-primary hover:bg-surface-raised'
                  }`}
                >
                  {filter === 'All' ? 'All Releases' : filter}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter lg:gap-gutter-desktop">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* SECTION 4: BRAND VALUES / EDITORIAL CALLOUT SECTION */}
      <section className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xl">
        <div className="rounded-2xl bg-surface p-space-lg md:p-space-xl relative overflow-hidden border border-border/40">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-primary-container/5 blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg lg:gap-space-xl relative z-10">
            {/* Value 01 */}
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm font-mono text-primary-container font-semibold">
                  01 //
                </span>
                <span className="material-symbols-outlined text-[24px] text-text-muted">
                  precision_manufacturing
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-text-primary font-semibold mt-2">
                Sourced Without Compromise
              </h3>
              <p className="font-body-md text-body-md text-text-muted leading-relaxed">
                Every material is audited for structural purity—from Grade-5 titanium billet to
                vegetable-tanned hides from certified zero-effluent European tanneries.
              </p>
            </div>

            {/* Value 02 */}
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm font-mono text-primary-container font-semibold">
                  02 //
                </span>
                <span className="material-symbols-outlined text-[24px] text-text-muted">
                  flight_takeoff
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-text-primary font-semibold mt-2">
                Rapid Global Dispatch (Sub-48h)
              </h3>
              <p className="font-body-md text-body-md text-text-muted leading-relaxed">
                Centralized fulfillment nodes in Frankfurt, Tokyo, and New York guarantee bonded
                express air transport with carbon-neutral transit offsets.
              </p>
            </div>

            {/* Value 03 */}
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm font-mono text-primary-container font-semibold">
                  03 //
                </span>
                <span className="material-symbols-outlined text-[24px] text-text-muted">
                  shield_with_heart
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-text-primary font-semibold mt-2">
                Guaranteed Lifetime Craftsmanship
              </h3>
              <p className="font-body-md text-body-md text-text-muted leading-relaxed">
                Engineered to resist obsolescence. Every serialized physical object includes our
                perpetual refurbishment and component replacement warranty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CUSTOMER REVIEW & LOOKBOOK SNIPPET BANNER */}
      <section className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xl">
        <div className="relative rounded-2xl overflow-hidden bg-surface-container-high shadow-2xl border border-border/40">
          <div
            className="bg-cover bg-center absolute inset-0 opacity-25 filter grayscale"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAByr_C03e_K671dJ01ul8C1dW43ioiL1ZkL1O_6a2PHQ-TQmdHlzVPxPFq2nvLPtWHvAt6SWk0aHbGBeM6u_7aHZbZwm-uiY6Hr9wo1PgRdt3u2sP8eyh3KOgwuAvxBzJB8Lx4S6ZcNQBm1gQfeMeSzr463GXNqiIGBNJnY3NcOhk8nCT4qrXf72p_UNAZg6JQOZ5fSNa4YzauRFf5Akj_2gyrxI8eMedPbS6BBt0l_wKVjMPdPzpt')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
          <div className="relative z-10 p-space-lg md:p-space-xl lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
            <div className="lg:col-span-8 flex flex-col gap-space-md">
              <div className="flex items-center gap-1.5 text-primary-container">
                <span className="material-symbols-outlined text-[18px] material-symbols-fill">star</span>
                <span className="material-symbols-outlined text-[18px] material-symbols-fill">star</span>
                <span className="material-symbols-outlined text-[18px] material-symbols-fill">star</span>
                <span className="material-symbols-outlined text-[18px] material-symbols-fill">star</span>
                <span className="material-symbols-outlined text-[18px] material-symbols-fill">star</span>
                <span className="font-label-sm text-label-sm text-text-muted ml-2 uppercase tracking-widest font-mono">
                  Verified Collector
                </span>
              </div>
              <blockquote className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-text-primary font-semibold leading-tight tracking-tight">
                “The tactile quality of every item in NovaCart is unmatched in modern retail.”
              </blockquote>
              <div className="flex items-center gap-space-md pt-space-xs">
                <div className="w-10 h-10 rounded-full bg-surface-raised overflow-hidden flex items-center justify-center font-label-md text-label-md text-primary-container font-semibold border border-border">
                  MK
                </div>
                <div>
                  <p className="font-title-product text-title-product text-text-primary font-medium leading-none">
                    Marcus Vance
                  </p>
                  <p className="font-caption text-caption text-text-muted mt-1">
                    Lead Industrial Designer, Studio Forma Zürich
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end gap-space-md">
              <div className="bg-surface-raised/80 backdrop-blur-md p-space-md rounded-xl max-w-xs border border-border/40">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-status-success" />
                  <span className="font-caption text-caption text-text-primary font-medium">
                    Winter 2025 Lookbook
                  </span>
                </div>
                <p className="font-body-md text-body-md text-text-muted mb-space-md">
                  Explore 36 photographic studies in technical materiality and architectural desk compositions.
                </p>
                <Link
                  to="/journal"
                  className="inline-flex items-center gap-1.5 text-primary-container font-label-md text-label-md font-semibold hover:underline"
                >
                  <span>View Photographic Journal</span>
                  <span className="material-symbols-outlined text-[16px]">north_east</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
