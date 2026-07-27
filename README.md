# Wachira Spotless Furniture — Website

A premium, mobile-first single-page site for Wachira Spotless Furniture, a
family-owned custom furniture workshop in Kerugoya, Kenya. Built for
Wachira Spotless Furniture by **Nexus AI Enterprise**.

## Stack

- HTML5 (semantic, ARIA-labeled, one page)
- Tailwind CSS (compiled ahead of time — no runtime CDN script)
- Vanilla JavaScript (no framework, no build step required to run it)
- [Lucide](https://lucide.dev) icons, loaded via CDN
- Google Fonts: Playfair Display (headings) + Inter (body)

No React/Vue/build tooling is required to **run** the site — open
`index.html` in a browser, or serve the folder with any static file
server. Tailwind's CLI is only used at **build time** to compile
`output.css`; it is not a runtime dependency.

## Folder structure

Everything lives in one flat folder — no subfolders — so the site works
correctly no matter how the files are downloaded, copied, or moved:

```
wachira-spotless-furniture/
├── index.html            # The entire site (one page, one file)
├── input.css             # Tailwind source: base styles, components, animations
├── output.css            # Compiled, minified CSS — what index.html actually loads
├── main.js                # All interactivity, grouped by feature
├── tailwind.config.js    # Brand color/font tokens and design system
├── package.json          # Build scripts (see below)
└── README.md
```

> If you ever reorganize these into `css/` and `js/` subfolders, update
> the two `<link>`/`<script>` paths near the bottom of `index.html`
> (`output.css`, `main.js`) and the `content` paths in
> `tailwind.config.js` to match — otherwise the page will load unstyled.

Every major section of `index.html` is wrapped in an HTML comment like
`<!-- COMPONENT: Hero -->`, `<!-- COMPONENT: FeaturedProducts -->`, etc.
Each one maps cleanly to what would become its own component (`<Hero />`,
`<FeaturedProducts />`, `<ProductCard />` repeated six times, and so on)
if this is ever rebuilt in React — the markup blocks were written with
that 1:1 mapping in mind.

## Editing content

Almost everything a non-developer would want to change — prices, product
descriptions, testimonials, FAQ answers, business hours, the WhatsApp
number — is plain text inside `index.html`. Search for the section
comment (e.g. `COMPONENT: FeaturedProducts`) to find it quickly.

**WhatsApp messages:** every WhatsApp button uses a
`data-whatsapp-msg="..."` attribute instead of a hardcoded link.
`main.js` turns these into real `wa.me` links on page load. To change
the WhatsApp number, edit the single `WHATSAPP_NUMBER` constant at the
top of `main.js` — it is not duplicated anywhere else.

**Images:** all product/gallery/hero images are hotlinked from Unsplash
as placeholders. Replace the `src` (and matching `alt` text) on any
`<img>` tag with real photography before launch — the layout, aspect
ratios and hover effects will keep working unchanged.

## Rebuilding the CSS

You only need to rebuild `output.css` if you change a Tailwind utility
class in `index.html`/`main.js`, or edit `input.css` or
`tailwind.config.js` (colors, fonts, custom components).

```bash
npm install        # one-time, installs the Tailwind CLI
npm run build       # compiles input.css -> output.css (minified)
npm run watch        # rebuilds automatically while you edit
npm run serve         # serves the folder at http://localhost:8080
```

## Design notes

- **Brand tokens** (colors, fonts) live in `tailwind.config.js` — change
  a hex value there and every use across the site updates.
- **Signature motif:** the concentric "growth ring" mark (seen in the
  logo, section icons and process-step badges) is a deliberate nod to
  reading a tree's age in its rings — echoing "furniture that lasts
  generations." It's plain inline SVG, no icon font needed.
- **Accessibility:** skip-to-content link, visible keyboard focus
  states, ARIA labels/roles on the nav, accordion and gallery filters,
  and `prefers-reduced-motion` support throughout.
- **Performance:** compiled/minified CSS (no in-browser Tailwind JIT),
  lazy-loaded below-the-fold images, `fetchpriority="high"` on the hero
  image, and system-safe font fallbacks while Google Fonts load.

## SEO / sharing

`index.html` includes meta description/keywords, Open Graph and Twitter
card tags, and a `FurnitureStore` JSON-LD schema block (name, address,
phone, hours, price range, product list) for local search. Update the
placeholder canonical URL (`https://www.wachiraspotlessfurniture.co.ke/`)
once a real domain is live.
