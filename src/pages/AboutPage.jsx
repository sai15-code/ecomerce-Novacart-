import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Top Ambient Glow Field */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-primary-container/10 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute top-48 right-10 w-72 h-72 bg-surface-raised/40 blur-[90px] pointer-events-none rounded-full" />

        {/* Editorial Header Section */}
        <section className="max-w-[1440px] mx-auto w-full px-margin lg:px-margin-desktop pt-12 pb-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
            <div className="max-w-3xl">
              <div className="flex items-center gap-space-sm mb-6">
                <span className="inline-block w-2 h-2 bg-primary-container" />
                <span className="font-caption text-caption tracking-[0.25em] uppercase text-primary-container font-semibold">
                  Editorial Archive // Document 01
                </span>
                <span className="text-text-muted opacity-40">/</span>
                <span className="font-caption text-caption text-text-muted uppercase tracking-widest">
                  ABOUT NOVACART
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg md:text-[48px] md:leading-[52px] text-text-primary tracking-[-0.03em] font-semibold">
                Engineered for Purpose.
                <br className="hidden sm:inline" /> Built Without Noise.
              </h1>
            </div>

            <div className="max-w-md pb-1">
              <p className="font-body-lg text-body-lg text-text-muted leading-relaxed">
                NovaCart was born as a study in pure functional aesthetics and modular frontend
                architecture for modern digital retail.
              </p>
            </div>
          </div>

          {/* Spatial Metric Ribbon */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 bg-surface rounded-xl p-6 shadow-xl border border-border/40">
            <div className="flex flex-col">
              <span className="font-caption text-caption text-text-muted uppercase tracking-wider">
                Foundation Year
              </span>
              <span className="font-headline-sm text-headline-sm text-text-primary font-semibold mt-1">
                2025
              </span>
              <span className="font-label-sm text-label-sm text-text-muted mt-0.5">
                Capstone Release 1.4
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-caption text-caption text-text-muted uppercase tracking-wider">
                Design Paradigm
              </span>
              <span className="font-headline-sm text-headline-sm text-text-primary font-semibold mt-1">
                Swiss High-Contrast
              </span>
              <span className="font-label-sm text-label-sm text-text-muted mt-0.5">
                8pt Strict Cadence
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-caption text-caption text-text-muted uppercase tracking-wider">
                Interface Core
              </span>
              <span className="font-headline-sm text-headline-sm text-primary-container font-semibold mt-1">
                Zero Overhead
              </span>
              <span className="font-label-sm text-label-sm text-text-muted mt-0.5">
                Tokenized CSS Modules
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-caption text-caption text-text-muted uppercase tracking-wider">
                Global Latency
              </span>
              <span className="font-headline-sm text-headline-sm text-status-success font-semibold mt-1">
                &lt; 42ms
              </span>
              <span className="font-label-sm text-label-sm text-text-muted mt-0.5">
                Edge Synchronized State
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Two-Column Brand Narrative */}
      <section className="max-w-[1440px] mx-auto w-full px-margin lg:px-margin-desktop py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          {/* Left: Minimalist Architectural Visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative bg-surface rounded-xl overflow-hidden shadow-2xl group border border-border/40">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyYEFTo6WAuDqPyrNDf8nQc9RECvVur8lMOkzlLCXvYtn6aUAN04PHYKY_Od5304y6AsigmQr-dG7Mf9wExz5XuO5wacg-f5hWrcSRYbHyyYeRCz597ciPfMkxQkWOIPUFSNrxUl1p1H0wBDZOEt9KC1Ki7uCFuS20HG_jBoPZPaU-4BF02SFRqej9fkAFxZQpy9gds6WfG9r6O6wP5DVKnFt7FB9mRN3VXmx0Vn2WvQZxI2Egl02U"
                alt="Monochromatic brutalist architectural studio interior"
                className="w-full aspect-[4/5] object-cover filter grayscale contrast-125 transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />

              {/* Image Stamp Label */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div className="flex flex-col">
                  <span className="font-caption text-caption uppercase tracking-widest text-primary-container font-semibold">
                    Studio Research Hub
                  </span>
                  <span className="font-body-md text-body-md text-text-primary font-medium mt-0.5">
                    Atelier 04 / Brutalist Prototype Lab
                  </span>
                </div>
                <div className="bg-surface-raised/90 backdrop-blur-md px-3 py-1.5 rounded text-right border border-border/30">
                  <span className="font-caption text-[10px] text-text-muted tracking-widest block uppercase">
                    Elevation Scan
                  </span>
                  <span className="font-label-sm text-label-sm text-text-primary font-semibold">
                    32.8°N · Grid Locked
                  </span>
                </div>
              </div>
            </div>

            {/* Overlapping Accent Metric Chip */}
            <div className="hidden sm:flex items-center gap-space-md absolute -bottom-6 -right-6 bg-surface-raised p-5 rounded-xl shadow-2xl max-w-xs border border-border/40">
              <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary-container text-[20px]">
                  architecture
                </span>
              </div>
              <div>
                <div className="font-label-md text-label-md text-text-primary font-semibold">
                  100% Tactile Provenance
                </div>
                <div className="font-caption text-caption text-text-muted mt-0.5">
                  Machined alloy & zero-plastic containment
                </div>
              </div>
            </div>
          </div>

          {/* Right: Narrative Content */}
          <div className="lg:col-span-6 flex flex-col justify-center lg:pl-6 mt-8 lg:mt-0">
            <div className="inline-flex items-center gap-space-sm mb-4">
              <span className="px-2.5 py-1 rounded bg-surface-container-high text-text-muted font-caption text-caption uppercase tracking-wider">
                Chapter 01
              </span>
              <span className="text-text-muted font-caption text-caption tracking-widest uppercase">
                Fundamental Canon
              </span>
            </div>

            <h2 className="font-headline-lg text-headline-lg text-text-primary font-semibold tracking-[-0.02em]">
              Our Philosophy
            </h2>

            <div className="space-y-6 mt-6">
              <p className="font-body-lg text-body-lg text-text-primary font-normal leading-relaxed">
                We believe that tools should feel permanent. Every product in our catalog undergoes
                rigorous evaluation for mechanical integrity, material honesty, and tactile feedback.
              </p>
              <p className="font-body-md text-body-md text-text-muted leading-relaxed">
                In an era of disposable consumer electronics and ephemeral trends, NovaCart
                champions intentionality over frequency. Our objects are manufactured from
                precision-milled aluminum, technical ballistic weaves, and high-frequency tactile
                switches—designed to resist planned obsolescence through pure structural resilience.
              </p>
            </div>

            {/* Spec Breakdown Box */}
            <div className="mt-8 bg-surface-container-low rounded-xl p-6 space-y-4 border border-border/40">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary-container mt-0.5">
                  verified
                </span>
                <div>
                  <div className="font-label-md text-label-md text-text-primary font-semibold">
                    Structural Verification
                  </div>
                  <div className="font-body-md text-body-md text-text-muted mt-0.5">
                    Every release must withstand cycle stress simulations equivalent to a decade of
                    daily interaction.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary-container mt-0.5">
                  texture
                </span>
                <div>
                  <div className="font-label-md text-label-md text-text-primary font-semibold">
                    Tactile Integrity First
                  </div>
                  <div className="font-body-md text-body-md text-text-muted mt-0.5">
                    Weight distribution, rotary resistance, and surface knurling are engineered down
                    to micron tolerances.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Diagram Interlude */}
      <section
        id="system-diagnostics"
        className="max-w-[1440px] mx-auto w-full px-margin lg:px-margin-desktop py-12"
      >
        <div className="bg-surface rounded-xl p-8 lg:p-12 shadow-xl relative overflow-hidden border border-border/40">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8">
            <div>
              <span className="font-caption text-caption uppercase tracking-[0.2em] text-primary-container font-semibold">
                System Diagnostics
              </span>
              <h3 className="font-headline-md text-headline-md text-text-primary font-semibold mt-1">
                Component Telemetry & Performance Bounds
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-status-success animate-pulse" />
              <span className="font-caption text-caption text-text-muted uppercase tracking-wider">
                Deterministic State Matrix Nominal
              </span>
            </div>
          </div>

          {/* Inline Telemetry Chart SVG */}
          <div className="w-full h-44 relative bg-surface-container-lowest rounded-lg p-4 flex flex-col justify-between overflow-hidden border border-border/30">
            <div className="flex items-center justify-between text-text-muted font-caption text-caption">
              <span>RENDER LATENCY SPECTRUM [0ms — 60ms]</span>
              <span>DOM TREE RECONCILIATION: 100% STABLE</span>
            </div>

            <svg
              className="w-full h-24 text-primary-container"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 1000 120"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M0,80 Q100,20 200,60 T400,30 T600,70 T800,20 T1000,45 L1000,120 L0,120 Z"
                fill="url(#chartGradient)"
              />
              <path
                d="M0,80 Q100,20 200,60 T400,30 T600,70 T800,20 T1000,45"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2.5"
              />
              <line
                stroke="currentColor"
                strokeDasharray="3 3"
                strokeOpacity="0.15"
                x1="200"
                x2="200"
                y1="0"
                y2="120"
              />
              <line
                stroke="currentColor"
                strokeDasharray="3 3"
                strokeOpacity="0.15"
                x1="400"
                x2="400"
                y1="0"
                y2="120"
              />
              <line
                stroke="currentColor"
                strokeDasharray="3 3"
                strokeOpacity="0.15"
                x1="600"
                x2="600"
                y1="0"
                y2="120"
              />
              <line
                stroke="currentColor"
                strokeDasharray="3 3"
                strokeOpacity="0.15"
                x1="800"
                x2="800"
                y1="0"
                y2="120"
              />
            </svg>

            <div className="flex items-center justify-between font-caption text-caption text-text-muted">
              <span>T0: Initial Hydration</span>
              <span>T1: Token Binding</span>
              <span>T2: Cart Persistence</span>
              <span>T3: Final Paint 16.4ms</span>
            </div>
          </div>
        </div>
      </section>

      {/* Capstone Architecture Showcase: 3 Technical Cards */}
      <section className="max-w-[1440px] mx-auto w-full px-margin lg:px-margin-desktop py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 bg-primary-container" />
              <span className="font-caption text-caption text-text-muted uppercase tracking-[0.2em]">
                Engineering Blueprint
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-text-primary font-semibold tracking-[-0.02em]">
              Capstone Architecture Showcase
            </h2>
          </div>
          <p className="font-body-md text-body-md text-text-muted max-w-sm">
            Constructed strictly within modern frontend constraints to establish an exemplary
            high-contrast commerce model.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-surface rounded-xl p-8 flex flex-col justify-between shadow-xl transition-all duration-300 hover:bg-surface-raised group border border-border/40">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center group-hover:bg-primary-container transition-colors">
                  <span className="material-symbols-outlined text-text-primary group-hover:text-on-primary transition-colors text-[24px]">
                    view_quilt
                  </span>
                </div>
                <span className="font-caption text-caption text-text-muted font-mono tracking-wider">
                  MOD_01
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-text-primary font-semibold tracking-tight">
                Modular Component System
              </h3>
              <p className="font-body-md text-body-md text-text-muted mt-3 leading-relaxed">
                Reusable React + Vite structure built upon rigorous atomic UI tokens. Atomic
                isolation prevents layout regressions and guarantees strict design system fidelity
                across micro-components.
              </p>
            </div>
            <div className="mt-8 pt-6 bg-surface-container-low rounded-lg p-4 border border-border/30">
              <span className="font-caption text-caption uppercase tracking-wider text-text-muted block mb-2">
                Key Primitives
              </span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded bg-surface font-caption text-caption text-primary-container border border-border/40">
                  Tailwind JIT
                </span>
                <span className="px-2 py-0.5 rounded bg-surface font-caption text-caption text-text-muted border border-border/40">
                  Design Tokens
                </span>
                <span className="px-2 py-0.5 rounded bg-surface font-caption text-caption text-text-muted border border-border/40">
                  Fluid Spacing
                </span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-surface rounded-xl p-8 flex flex-col justify-between shadow-xl transition-all duration-300 hover:bg-surface-raised group border border-border/40">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center group-hover:bg-primary-container transition-colors">
                  <span className="material-symbols-outlined text-text-primary group-hover:text-on-primary transition-colors text-[24px]">
                    sync_alt
                  </span>
                </div>
                <span className="font-caption text-caption text-text-muted font-mono tracking-wider">
                  MOD_02
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-text-primary font-semibold tracking-tight">
                Client-Side Route State
              </h3>
              <p className="font-body-md text-body-md text-text-muted mt-3 leading-relaxed">
                Zero layout shifts across dynamic catalog traversal. Features an immutable,
                persistent localStorage checkout bag that rehydrates instantly without visual
                flicker or hydration mismatches.
              </p>
            </div>
            <div className="mt-8 pt-6 bg-surface-container-low rounded-lg p-4 border border-border/30">
              <span className="font-caption text-caption uppercase tracking-wider text-text-muted block mb-2">
                State Mechanics
              </span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded bg-surface font-caption text-caption text-primary-container border border-border/40">
                  Local Persistence
                </span>
                <span className="px-2 py-0.5 rounded bg-surface font-caption text-caption text-text-muted border border-border/40">
                  Zero CLS
                </span>
                <span className="px-2 py-0.5 rounded bg-surface font-caption text-caption text-text-muted border border-border/40">
                  Reactive Sync
                </span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-surface rounded-xl p-8 flex flex-col justify-between shadow-xl transition-all duration-300 hover:bg-surface-raised group border border-border/40">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center group-hover:bg-primary-container transition-colors">
                  <span className="material-symbols-outlined text-text-primary group-hover:text-on-primary transition-colors text-[24px]">
                    bolt
                  </span>
                </div>
                <span className="font-caption text-caption text-text-muted font-mono tracking-wider">
                  MOD_03
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-text-primary font-semibold tracking-tight">
                Resilient REST API Integration
              </h3>
              <p className="font-body-md text-body-md text-text-muted mt-3 leading-relaxed">
                Deterministic data layer with optimistic mutations, intelligent request caching,
                and graceful fallback states that preserve interface usability during asynchronous
                network anomalies.
              </p>
            </div>
            <div className="mt-8 pt-6 bg-surface-container-low rounded-lg p-4 border border-border/30">
              <span className="font-caption text-caption uppercase tracking-wider text-text-muted block mb-2">
                Resilience Profile
              </span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded bg-surface font-caption text-caption text-primary-container border border-border/40">
                  Optimistic UI
                </span>
                <span className="px-2 py-0.5 rounded bg-surface font-caption text-caption text-text-muted border border-border/40">
                  Safe Stale-While
                </span>
                <span className="px-2 py-0.5 rounded bg-surface font-caption text-caption text-text-muted border border-border/40">
                  Circuit Fallbacks
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Photographic Narrative Split */}
      <section className="max-w-[1440px] mx-auto w-full px-margin lg:px-margin-desktop py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-surface-container-low rounded-xl p-8 lg:p-12 shadow-xl border border-border/40">
          <div className="lg:col-span-7 flex flex-col">
            <span className="font-caption text-caption uppercase tracking-widest text-primary-container font-semibold mb-2">
              Sustainable Materiality
            </span>
            <h3 className="font-headline-md text-headline-md text-text-primary font-semibold">
              Zero-compromise engineering. Precision over quantity.
            </h3>
            <p className="font-body-md text-body-md text-text-muted mt-4 leading-relaxed">
              From the aerospace-grade 6063 aluminum housing of our audio objects to the
              vegetable-tanned full-grain leather accents of our everyday carry gear, NovaCart rejects
              synthetic shortcuts. Each raw unit is sourced through certified ethical supply
              channels and hand-inspected under high-intensity cross-polarization.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-6 text-text-muted font-caption text-caption">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container text-[18px]">
                  verified_user
                </span>
                <span>Lifetime Mechanical Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container text-[18px]">
                  eco
                </span>
                <span>100% Recyclable Unibody Alloys</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 relative overflow-hidden rounded-lg shadow-lg border border-border/30">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqBfGbjjLCGlS83Kk_1mQREn0bVvbRfA5MwZIFH9NZV_vPw-RWrJPYmG4uD-zX1PwZbmRXy5iJXJhl7ZZ_q2nZMwomexnM3yHDRbXGrkfGJ0Gxuwi-ihW588YV-cBakOM2OD2ZaEYEIft3ren1JJf53sgZGgOTyVy62E6E_AGH2PG9LhFUJ9312BL-SUniB4Fw1h-meGIK8hzPWKnb03EdLcUcsiVy2-k8U-8MJ1K2wzWqndIQL9Sx"
              alt="Macro close-up shot of precision knurled dark titanium hardware"
              className="w-full h-72 object-cover filter contrast-125 hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
            <div className="absolute bottom-3 left-4 font-caption text-caption text-text-primary">
              Macro Scan // 0.05mm Knurling Precision
            </div>
          </div>
        </div>
      </section>

      {/* Thiranex Capstone Project Acknowledgement & GitHub Link */}
      <section className="max-w-[1440px] mx-auto w-full px-margin lg:px-margin-desktop py-12 mb-6">
        <div className="bg-surface rounded-xl p-8 lg:p-12 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-lg border border-border/40">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 rounded bg-primary-container/10 text-primary-container font-caption text-caption uppercase tracking-wider font-semibold">
                Institutional Project
              </span>
              <span className="text-text-muted font-caption text-caption">Cohort 2024–2025</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-text-primary font-semibold">
              Thiranex Capstone Project Acknowledgement
            </h3>
            <p className="font-body-md text-body-md text-text-muted mt-2 leading-relaxed">
              NovaCart was ideated and engineered as a demonstration capstone submission under the
              Thiranex Fullstack Enterprise Curriculum. Designed to showcase modern headless
              e-commerce orchestration, high-speed UX rendering, and uncompromising design token
              precision.
            </p>
            <div className="flex items-center gap-4 mt-4 font-caption text-caption text-text-muted">
              <span>Lead Architecture: NovaCart Core Team</span>
              <span>•</span>
              <span>License: MIT Enterprise</span>
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-space-sm bg-surface-raised hover:bg-surface-bright text-text-primary font-label-md text-label-md font-semibold px-6 py-3.5 rounded transition-all duration-150 shadow-md group border border-border/40"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-current text-primary-container transition-transform group-hover:scale-110"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>View GitHub Repository</span>
              <span className="material-symbols-outlined text-[16px] text-text-muted group-hover:translate-x-0.5 transition-transform">
                open_in_new
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
