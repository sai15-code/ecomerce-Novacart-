# NovaCart — UI Theme & Frontend Design System

## 1. Product direction
**Project:** NovaCart E-commerce Product Catalog  
**Purpose:** Thiranex final capstone demonstrating modular frontend architecture, client-side routing, responsive UI, asset optimization, and live deployment.

Design a premium, modern storefront with a dark editorial look. The interface should feel polished and credible—not like a generic admin dashboard. Use a near-black/charcoal foundation, warm white typography, and a restrained electric-lime accent. Product photography should be the main visual focus.

## 2. Visual principles
- Premium, minimal, product-first layout.
- Clear hierarchy and generous whitespace.
- Strong product photography with consistent image ratios.
- Subtle borders and surfaces rather than heavy shadows.
- Motion should be brief and purposeful; respect `prefers-reduced-motion`.
- Avoid excessive gradients, glassmorphism, neon outlines, and oversized rounded cards.

## 3. Color tokens
Use CSS variables so the theme is easy to maintain.

```css
:root {
  color-scheme: dark;
  --color-bg: #101110;
  --color-surface: #181A18;
  --color-surface-raised: #202320;
  --color-border: #303530;
  --color-text: #F4F5F1;
  --color-text-muted: #A4AAA2;
  --color-accent: #C8F169;
  --color-accent-hover: #D8FF83;
  --color-danger: #FF7777;
  --color-success: #8FE0A0;
  --color-overlay: rgb(0 0 0 / 65%);
  --shadow-card: 0 12px 32px rgb(0 0 0 / 18%);
}
```

Contrast must remain readable. Use the accent for primary actions, selected states, and small highlights—not for large blocks of text.

## 4. Typography
- Preferred UI font: `Inter`, with a system sans-serif fallback.
- Hero heading: 48–64px desktop, 36–42px mobile; tight line height.
- Page heading: 32–40px desktop, 28–32px mobile.
- Product name: 15–17px, medium weight.
- Body: 14–16px with comfortable line height.
- Metadata/labels: 12–13px; do not use muted text for important information.

## 5. Layout and spacing
- Main content max width: 1440px.
- Desktop page gutters: 48–64px; tablet: 28–32px; mobile: 16–20px.
- Use a consistent 4px spacing scale: 4, 8, 12, 16, 24, 32, 40, 48, 64.
- Header height: approximately 72px desktop.
- Product grid: 4 columns on wide desktop, 3 on medium screens, 2 on mobile, with consistent gaps.
- Product image ratio: 4:5 or 1:1, consistent within each section.
- Keep controls aligned and avoid horizontal overflow at 320px widths.

## 6. Core pages
### Home (`/`)
- Announcement strip (optional and dismissible).
- Header with wordmark, nav links, search, and cart count.
- Hero section with a strong headline, short supporting copy, CTA, and product/lifestyle image.
- Featured categories or collection tiles.
- Featured products grid.
- Small editorial/brand-value section.
- Footer with navigation, contact, and project links.

### Product listing (`/products`)
- Page title and concise intro.
- Search field, category filter, sort selector, and clear-filters action.
- Responsive product grid.
- Loading skeletons, no-results state, and recoverable API error state.
- Filters and sort should actually work, not be decorative.

### Product details (`/products/:id`)
- Product image gallery or main image.
- Product title, category, price, rating when available, description.
- Quantity selector and add-to-cart action.
- Clear unavailable/loading/error state for missing products.
- Back-to-products navigation.

### Cart (`/cart`)
- Cart item image, title, price, quantity controls, remove action.
- Subtotal and item count; handle empty cart gracefully.
- Persist cart to `localStorage`.
- If checkout is only a demo, label it clearly and do not imply real payments.

### About (`/about`) and Not Found (`*`)
- Brief brand/project story and a polished 404 page with a return-home CTA.

## 7. Components and architecture
Build reusable components, for example:
- `Header`, `Footer`, `AnnouncementBar`
- `Button`, `IconButton`, `SearchInput`, `Select`
- `ProductCard`, `ProductGrid`, `ProductGallery`
- `CategoryChip`, `Price`, `QuantitySelector`
- `CartDrawer` or cart page, `Toast`, `Skeleton`, `EmptyState`, `ErrorState`

Suggested structure:

```text
src/
  assets/
  components/
  layouts/
  pages/
  routes/
  services/
  hooks/
  context/
  utils/
  styles/
  App.jsx
  main.jsx
```

Use React + Vite and React Router for client-side navigation. Keep API calls in a service module and shared cart state in a context or a small, clearly separated state layer. Do not put the entire app in one component.

## 8. Interactions and states
- Header remains usable on small screens; mobile navigation opens and closes accessibly.
- Search supports Enter and clear actions.
- Category filters and sort update the visible products.
- Product cards have clear hover/focus states and clickable targets.
- Add-to-cart updates the header count and cart contents; show a small confirmation toast.
- Quantity cannot drop below 1; removing an item updates totals.
- Preserve cart after refresh using `localStorage`.
- Include loading, success, empty, and error states.
- Use `button` for actions and links for navigation. All interactive elements need visible keyboard focus.

## 9. Responsive behavior
- Desktop: full navigation and spacious grid.
- Tablet: compact header and 2–3-column grid.
- Mobile: collapsible menu, 2-column product grid where space allows, stacked filters, comfortable touch targets (minimum about 44px).
- Test at 320px, 375px, 768px, 1024px, and 1440px widths.
- Avoid fixed heights that clip product names or buttons.

## 10. Accessibility
- Use semantic landmarks and heading order.
- Add meaningful alt text for product images; decorative images use empty alt text.
- Associate form controls with labels.
- Ensure keyboard operation and focus visibility.
- Maintain sufficient contrast and do not convey status through color alone.
- Announce cart updates and errors with suitable live regions.
- Respect reduced-motion preferences.

## 11. Asset and performance guidance
- Prefer appropriately sized WebP/AVIF images when available.
- Use `width` and `height` or aspect-ratio containers to prevent layout shift.
- Lazy-load below-the-fold product images; do not lazy-load the main hero image if it is the LCP element.
- Avoid shipping unnecessarily large assets or unused libraries.
- Use Vite production build and check for console errors and failed network requests.
- Add meaningful page titles and meta descriptions.
- Ensure client-side routes work after refresh on the deployment platform.

## 12. Data and API behavior
- Use a reliable public product API or a clearly documented local fallback dataset.
- Never present invented placeholder values as live API data without indicating they are demo content.
- Handle network failures, invalid responses, missing product IDs, and empty results.
- Keep API/data transformation separate from presentation components.
- Do not add payment processing or authentication unless explicitly required.

## 13. Definition of done
- [ ] Home, products, product detail, cart, about, and not-found routes work.
- [ ] Product search, category filter, sorting, and cart interactions work.
- [ ] Cart persists after refresh.
- [ ] Loading, empty, and error states are present.
- [ ] Responsive layout works at mobile, tablet, and desktop widths.
- [ ] Keyboard focus and accessible labels are included.
- [ ] Production build succeeds with no blocking errors.
- [ ] Images and assets are optimized.
- [ ] Source code is pushed to GitHub.
- [ ] Live deployment is tested using its public URL, including refreshing a nested route.

## 14. Implementation note
This is a frontend capstone unless the internship evaluator explicitly requires a backend. A public product API plus local cart persistence is enough to demonstrate the listed frontend architecture and deployment objectives. If a backend is later required, add it as a separate, documented layer rather than mixing server logic into UI components.
