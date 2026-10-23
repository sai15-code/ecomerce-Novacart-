import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/currency';

export const ARTICLES = [
  {
    id: 'titanium-cnc',
    title: 'The Physics of 0.02mm CNC Tolerance in Grade-5 Titanium',
    category: 'Metallurgy',
    date: 'OCT 2025 // ISSUE 04',
    readTime: '6 min read',
    author: 'Elena Rostova, Chief Metallurgist',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyYEFTo6WAuDqPyrNDf8nQc9RECvVur8lMOkzlLCXvYtn6aUAN04PHYKY_Od5304y6AsigmQr-dG7Mf9wExz5XuO5wacg-f5hWrcSRYbHyyYeRCz597ciPfMkxQkWOIPUFSNrxUl1p1H0wBDZOEt9KC1Ki7uCFuS20HG_jBoPZPaU-4BF02SFRqej9fkAFxZQpy9gds6WfG9r6O6wP5DVKnFt7FB9mRN3VXmx0Vn2WvQZxI2Egl02U',
    summary: 'An empirical examination of structural grain alignment and cryogenic heat treatment during high-speed 5-axis subtractive milling.',
    content: `When carving an object from solid Ti-6Al-4V (Grade-5 titanium), mechanical stresses accumulate rapidly along the crystalline shear planes. Ordinary consumer electronics compromise by cast-molding or using stamped sheets. At NovaCart, we machine our chassis from cold-isostatically pressed billets, chilled under a continuous micro-droplet liquid nitrogen vortex at -196°C.

This prevents micro-fracturing and maintains an axial tolerance within ±0.02mm across thermal swings from -20°C to +65°C. The result is a watch case and headphone yoke that feels permanently rigid, impervious to deflection, and naturally immune to galvanic corrosion.`
  },
  {
    id: 'planar-acoustics',
    title: 'Acoustic Chamber Resonance & Planar Magnetic Transducers',
    category: 'Acoustics',
    date: 'SEP 2025 // ISSUE 03',
    readTime: '8 min read',
    author: 'Dr. Henrik Lindqvist, Audio Engineering',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjR8e0oNfY2JDcYZYJ_1iIlDF8l8XmoyfgyoNzri6Qo5VXP2uHNNwiYcPF7bgn9iwzFadf1IoDP74bWxjBWhkot3FEhQsZRFx8z2i3VCzQw3-EhfEzUAI2jdcDu2hUZmgPlL-8IhiTqyO36Ofu4QvyfoiBGiBRzpQi2xt1ukQOXnSELXqUbG7Q8kAYx8boVjwZxZsG6SWzjw1kpIcAw3rEIRdwWQ4ZQcYtxcxxBe1OHinuIwN3Pv13',
    summary: 'How ceramic earcups eliminate internal standing waves and preserve micro-transient harmonics in spatial audio listening.',
    content: `Conventional polymer headphone shells flex microscopically under low-frequency bass excursions, contaminating the mid-range soundstage with secondary resonance. By sintering high-purity zirconia ceramic at 1,500°C for 72 hours, we achieved an enclosure rigidity 8 times greater than aluminum.

Inside the Aether Pro, dual tuned Helmholtz resonators absorb back-wave reflections, allowing the 40mm planar magnetic diaphragm to accelerate freely with a total harmonic distortion figure below 0.05%. Every transient note begins and stops with surgical accuracy.`
  },
  {
    id: 'leather-patina',
    title: 'Vegetable Tanning vs Synthetic Finishes: The 10-Year Patina Study',
    category: 'Craftsmanship',
    date: 'AUG 2025 // ISSUE 02',
    readTime: '5 min read',
    author: 'Matteo Bellini, Atelier Lead',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtX4wM7fM-HHjwN8FRNu9bw_D6aSjAr2-lPzDFkgxLn8AKEMQfDOjMZ5hOL7hedRajSkGO6nTYtQOL4_wjJvuaNSBWhqAFvU6T-5rYQc92mYmU6ZYevd6-uhMHjApn3-uyptz_0t5maJvWnv4jc14ycT0COztU0-fqcQ42M7Xqf_XaXj0JuT42hIt3MnnuPIpsBnk14pfIPZzVEqGAZz36eZGhTlrb04uGwFO0bCQAiN6JQxyW6nyZ',
    summary: 'Documenting how organic bark extracts create leather surfaces that grow more visually profound with human touch.',
    content: `Synthetic PU leather and chromium-tanned hides begin deteriorating from day one—the plasticizers weep, crack, and peel. In contrast, full-grain leather tanned using chestnut and mimosa barks in Santa Croce sull'Arno retains natural sebum absorption pathways.

As your palms interact with the Nomad Desk Pad and Cardholder, ambient oils and friction darken the grain into an individualized obsidian luster. It is an object designed to outlive its custodian.`
  },
  {
    id: 'brass-weight',
    title: 'The Weight of Deliberation: Why We Calibrated the Lumik to 62.4 Grams',
    category: 'Industrial Design',
    date: 'JUL 2025 // ISSUE 01',
    readTime: '4 min read',
    author: 'Kaelen Thorne, Head of Industrial Design',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDaGl-Z1B64Ve4J0zCMFhhLeqa4JuxWuwOpthpI2wvpGbsMQCEdYD7EbgyIkdFF8cI-deyhmUMMTzxhsXu-APLYdICbJ4_xJYRlcoCN79hCsaMdjqVrncjFbLTKT6PiGFqb6sxXSv9MTeqLbqw_PMDHk5Y2iB2JkPRKELDFJXhiYBymjnW_fnSkP0qX3sFdX0I_giVPgD5pwF0TBhhB-esQVk-xW-Nv_hDJVKS8OPxBBPIduCNHgSW',
    summary: 'Kinematic balance testing and center-of-gravity tuning in daily analog writing instruments.',
    content: `A pen that is too light forces the hand muscles to press downward, inducing writer fatigue within minutes. A pen that is too heavy strains the wrist pivots.

Through 120 iterative CNC prototypes, we balanced the solid lead-free C360 brass core of the Lumik Pen to precisely 62.4 grams with a 52/48 front-biased center-of-mass. Gravity alone drives the Schmidt easyFLOW rollerball across cotton rag paper, eliminating downward hand force entirely.`
  }
];

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const categories = ['All', 'Metallurgy', 'Acoustics', 'Craftsmanship', 'Industrial Design'];

  const filteredArticles = activeCategory === 'All'
    ? ARTICLES
    : ARTICLES.filter(a => a.category === activeCategory);

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-lg">
      {/* Breadcrumb Hierarchy */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs font-caption text-caption text-text-muted mb-space-md">
        <Link to="/" className="hover:text-text-primary transition-colors flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">home</span>
          <span>Storefront</span>
        </Link>
        <span className="opacity-40">/</span>
        <span className="text-text-primary font-medium">Editorial Journal</span>
        <span className="opacity-40">/</span>
        <span className="text-primary-container font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-surface-raised border border-border/40">
          Issue 01–04
        </span>
      </nav>

      {/* Main Header */}
      <div className="pb-space-xl border-b border-border/40">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
          <span className="font-caption text-caption uppercase tracking-[0.25em] text-primary-container font-semibold">
            Atelier Archives // Technical Discourse
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <h1 className="font-headline-lg text-headline-lg md:text-[44px] text-text-primary font-bold tracking-tight max-w-2xl">
            The NovaCart Material Journal
          </h1>
          <p className="font-body-md text-body-md text-text-muted max-w-md">
            Rigorous studies in metalsmithing, acoustic physics, and zero-compromise industrial design from our engineering labs.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-8">
          <span className="font-caption text-caption text-text-muted uppercase tracking-wider mr-2">
            Filter Topics:
          </span>
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-lg font-label-md text-label-md transition-all shadow-sm ${
                  isSelected
                    ? 'bg-surface-raised text-primary-container border border-primary-container/40'
                    : 'bg-surface text-text-muted hover:text-text-primary hover:bg-surface-raised border border-border/30'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Lead Editorial */}
      {filteredArticles.length > 0 && (
        <div className="my-space-xl">
          <div
            onClick={() => setSelectedArticle(filteredArticles[0])}
            className="group relative rounded-2xl overflow-hidden bg-surface border border-border/40 shadow-xl cursor-pointer hover:border-primary-container/50 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            <div className="lg:col-span-7 aspect-[16/10] overflow-hidden bg-surface-container">
              <img
                src={filteredArticles[0].image}
                alt={filteredArticles[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="lg:col-span-5 p-space-lg md:p-space-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-caption font-caption text-text-muted mb-3">
                  <span className="px-2.5 py-0.5 rounded bg-primary-container/20 text-primary-container uppercase font-semibold">
                    {filteredArticles[0].category}
                  </span>
                  <span>{filteredArticles[0].date}</span>
                  <span>•</span>
                  <span>{filteredArticles[0].readTime}</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-text-primary font-bold group-hover:text-primary-container transition-colors tracking-tight">
                  {filteredArticles[0].title}
                </h2>
                <p className="font-body-md text-body-md text-text-muted mt-3 leading-relaxed">
                  {filteredArticles[0].summary}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-border/30 flex items-center justify-between">
                <span className="font-caption text-caption text-text-muted">
                  By {filteredArticles[0].author}
                </span>
                <span className="font-label-md text-label-md text-primary-container font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Study <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Remaining Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter lg:gap-gutter-desktop mb-space-xl">
        {filteredArticles.slice(1).map((article) => (
          <article
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="group bg-surface rounded-xl overflow-hidden border border-border/40 shadow-md hover:bg-surface-raised transition-all duration-300 flex flex-col cursor-pointer"
          >
            <div className="aspect-[16/10] overflow-hidden bg-surface-container">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-space-md flex flex-col flex-1 justify-between">
              <div>
                <div className="flex items-center gap-2 font-caption text-caption text-text-muted mb-2">
                  <span className="text-primary-container font-semibold uppercase">
                    {article.category}
                  </span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="font-title-product text-title-product text-text-primary font-semibold group-hover:text-primary-container transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="font-body-md text-body-md text-text-muted mt-2 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-border/30 flex items-center justify-between text-caption font-caption text-text-muted">
                <span className="truncate">{article.author.split(',')[0]}</span>
                <span className="text-primary-container font-medium flex items-center gap-1">
                  Examine <span className="material-symbols-outlined text-[14px]">north_east</span>
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 bg-background/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="w-full max-w-3xl bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-space-md border-b border-border/40 flex items-center justify-between bg-surface-raised">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-primary-container/20 text-primary-container font-caption text-caption uppercase font-semibold">
                  {selectedArticle.category}
                </span>
                <span className="font-caption text-caption text-text-muted">{selectedArticle.date}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-space-lg md:p-space-xl overflow-y-auto space-y-6">
              <h2 className="font-headline-lg text-headline-lg text-text-primary font-bold tracking-tight">
                {selectedArticle.title}
              </h2>
              <div className="flex items-center gap-3 text-caption font-caption text-text-muted pb-4 border-b border-border/30">
                <span>By {selectedArticle.author}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>
              <div className="rounded-xl overflow-hidden aspect-[16/9] bg-surface-container">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="prose prose-invert max-w-none font-body-lg text-body-lg text-text-primary/90 leading-relaxed space-y-4 whitespace-pre-line">
                {selectedArticle.content}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-space-md border-t border-border/40 bg-surface-raised flex items-center justify-between">
              <span className="font-caption text-caption text-text-muted">
                NovaCart Materials Research Lab
              </span>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="bg-primary-container text-on-primary font-label-md text-label-md font-semibold px-5 py-2 rounded-lg hover:bg-secondary-fixed transition-colors"
              >
                Close Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
