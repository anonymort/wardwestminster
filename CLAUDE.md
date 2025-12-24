# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ward&Westminster is a Hugo theme for long-form editorial content. Mobile-first, dark mode support, optimized for reading. The site is deployed to GitHub Pages at wardwestminster.com.

**Hugo Version:** 0.153.2 (extended)

## Development Commands

```bash
# Run dev server with example site
cd exampleSite && hugo server --themesDir ../.. --theme wardwestminster

# Run with drafts visible
cd exampleSite && hugo server --themesDir ../.. --theme wardwestminster -D

# Build production site (from root - layouts are in root now)
hugo --gc --minify

# Build example site
cd exampleSite && hugo --themesDir ../.. --theme wardwestminster

# Create new content
hugo new posts/article-title.md
```

## Validation

```bash
# Validate Hugo config
hugo config

# Check for broken links (requires htmltest)
hugo && htmltest

# Preview production build locally
hugo --gc --minify && python3 -m http.server -d public 8080

# Check for Hugo warnings/errors
hugo --logLevel info
```

## Architecture

### Directory Structure
```
wardwestminster/
├── .github/workflows/hugo.yml  # GitHub Pages deployment
├── archetypes/default.md       # New content template
├── assets/
│   ├── css/main.css           # All styles, variables, dark mode
│   ├── js/main.js             # Nav, progress bar, animations
│   └── images/                # Theme images (processed by Hugo)
├── content/
│   ├── posts/                 # Blog articles
│   ├── authors/               # Author archive pages
│   ├── about.md              # About page
│   └── search.md             # Search page
├── data/authors.yaml          # Author metadata
├── layouts/                   # Hugo templates
├── static/
│   ├── CNAME                  # Custom domain
│   └── pdf/                   # PDF files for embedding
├── exampleSite/               # Demo site for theme development
│   ├── hugo.toml             # Example configuration
│   ├── content/              # Sample content
│   └── data/                 # Sample data files
├── hugo.toml                  # Site configuration
└── theme.toml                 # Theme metadata
```

### Layout Hierarchy
```
layouts/_default/baseof.html    # Base template (head, fonts, asset pipeline)
    └── layouts/index.html      # Home page (hero + featured + grid)
    └── layouts/_default/single.html  # Article pages
    └── layouts/_default/list.html    # Archive/category pages
    └── layouts/_default/taxonomy.html # Tag/category listing
    └── layouts/_default/terms.html   # Tag/category index
    └── layouts/_default/search.html  # Client-side search
    └── layouts/404.html              # Custom 404 page
    └── layouts/authors/              # Author pages
```

### Key Files

| File | Purpose |
|------|---------|
| `assets/css/main.css` | All styles, CSS variables, dark mode, animations |
| `assets/js/main.js` | Nav, mobile menu, progress bar, scroll animations, back-to-top |
| `layouts/partials/nav.html` | Fixed nav with mobile menu toggle |
| `layouts/partials/head.html` | Meta tags, fonts, CSS pipeline |
| `layouts/partials/footer.html` | Site footer |
| `layouts/partials/picture.html` | Responsive image processing (WebP + srcset) |
| `layouts/partials/reading-time.html` | Medium-style reading time (265 WPM + images + code) |
| `layouts/partials/toc.html` | Auto-generated table of contents |
| `layouts/partials/related.html` | Related articles section |
| `layouts/partials/share.html` | Social share buttons (X, LinkedIn, Email, Copy) |
| `layouts/partials/head-custom.html` | User custom styles/meta (extension point) |
| `layouts/partials/scripts-custom.html` | User custom JS/analytics (extension point) |
| `layouts/404.html` | Custom 404 error page |
| `data/authors.yaml` | Author data (name, bio, avatar, social) |
| `hugo.toml` | Site configuration |

### Shortcodes

**Pull Quote** - Highlighted quote with optional citation:
```markdown
{{< pullquote >}}Quote text here{{< /pullquote >}}
{{< pullquote cite="Author Name" >}}Quote with attribution{{< /pullquote >}}
```

**Section Break** - Visual separator between sections:
```markdown
{{< break >}}              <!-- Default: ◆ -->
{{< break symbol="◇" >}}   <!-- Custom symbol -->
{{< break symbol="***" >}} <!-- Asterisks -->
```

**Wide Figure** - Full-width image breaking out of article column:
```markdown
{{< figure-wide src="/images/photo.jpg" alt="Description" >}}
{{< figure-wide src="/images/photo.jpg" alt="Description" caption="Photo caption" loading="eager" >}}
```
Parameters: `src` (required), `alt`, `caption`, `loading` (default: "lazy")

**PDF Embed** - Embedded PDF viewer with fallback:
```markdown
{{< pdf src="/pdf/document.pdf" >}}
{{< pdf src="/pdf/document.pdf" width="100%" height="800px" caption="Document title" >}}
```
Parameters: `src` (required), `width` (default: "100%"), `height` (default: "600px"), `caption`

### CSS Variables (in main.css :root)

Light/dark mode colors defined via `--color-*` variables. Override in `layouts/partials/head-custom.html`.

**Colors:**
- `--color-accent`: #8b2635 (burgundy)
- `--color-bg`, `--color-bg-dark`, `--color-bg-nav`
- `--color-text`, `--color-text-secondary`, `--color-text-muted`
- `--color-link`, `--color-link-hover`
- `--color-quote-bg`, `--color-quote-border`
- `--color-border`, `--color-border-strong`

**Typography:**
- `--font-display`: 'Cormorant Garamond' (headings)
- `--font-body`: 'Source Sans 3' (body text)
- `--font-mono`: 'JetBrains Mono' (code)

**Layout:**
- `--max-width-article`: 680px
- `--max-width-wide`: 900px
- `--max-width-site`: 1200px
- `--nav-height`: 60px

**Spacing:** `--spacing-xs` through `--spacing-2xl`

**Dark Mode:** Automatic via `prefers-color-scheme`, or manual with `body.dark-mode` / `body.light-mode` classes.

## Content Front Matter

```yaml
---
title: "Article Title"
date: 2025-12-15
draft: false
description: "SEO description and preview text"
subtitle: "Optional subtitle shown below title"
author: "Dr Matt Kneale"  # Must match key in data/authors.yaml
categories: ["Tech"]       # Primary topic
tags: ["AI", "Healthcare"] # Secondary topics
featured_image: "/images/header.png"
featured_image_alt: "Alt text for accessibility"
featured_image_caption: "Optional image caption"
---
```

Use `<!--more-->` to mark the summary break point.

## Author System

Authors are defined in two places:

1. **`data/authors.yaml`** - Metadata (bio, avatar, social links):
```yaml
"Dr Matt Kneale":
  name: "Dr Matt Kneale"
  bio: "Emergency medicine clinical fellow..."
  avatar: "/images/authors/matt-kneale.jpg"
  twitter: "drmattuk"
  bluesky: "drmattuk.bsky.social"
```

2. **`content/authors/{slug}.md`** - Archive pages for each author (minimal front matter, just title)

## Responsive Images

Use the `picture.html` partial for automatic WebP conversion and responsive srcset:
```html
{{ partial "picture.html" (dict "src" .Params.featured_image "alt" "Description" "class" "article-image" "loading" "lazy") }}
```

Generates 480w, 800w, 1200w WebP variants with JPG fallback.

## Menu Configuration

Menus are defined in `hugo.toml`. Two menus are available:

**Main Navigation** (`menus.main`):
```toml
[[menus.main]]
  name = "Home"
  url = "/"
  weight = 1

[[menus.main]]
  name = "Archive"
  url = "/posts/"
  weight = 2

[[menus.main]]
  name = "Topics"
  url = "/categories/"
  weight = 3

[[menus.main]]
  name = "About"
  url = "/about/"
  weight = 4

[[menus.main]]
  name = "Search"
  url = "/search/"
  weight = 5
```

**Footer Navigation** (`menus.footer`):
```toml
[[menus.footer]]
  name = "Home"
  url = "/"
  weight = 1

[[menus.footer]]
  name = "RSS"
  url = "/index.xml"
  weight = 3
```

## Configuration

```toml
baseURL = "https://wardwestminster.com/"
languageCode = "en-GB"
title = "Ward&Westminster"

[pagination]
  pagerSize = 10

[taxonomies]
  category = "categories"
  tag = "tags"

[permalinks]
  posts = "/:year/:month/:slug/"

[params]
  description = "Site description"
  tagline = "Medicine · Tech · Politics"
  author = "Author Name"
  topics = ["Medicine", "Tech", "Politics"]  # Hero section pills

[outputs]
  home = ["HTML", "RSS", "JSON"]  # JSON for search

[markup]
  [markup.goldmark.renderer]
    unsafe = true  # Allow HTML in markdown
  [markup.tableOfContents]
    startLevel = 2
    endLevel = 3

[related]
  includeNewer = true
  threshold = 80
  [[related.indices]]
    name = "categories"
    weight = 100
  [[related.indices]]
    name = "tags"
    weight = 80
```

## Deployment

GitHub Actions workflow (`.github/workflows/hugo.yml`) automatically builds and deploys to GitHub Pages on push to main/master.

## Conventions

- **Mobile-first responsive** - Breakpoints: 640px, 768px, 1024px
- **BEM-like class naming** - `.article`, `.article-header`, `.article-title`
- **Dark mode** - Automatic via `prefers-color-scheme` media query
- **Reduced motion** - Animations respect `prefers-reduced-motion`
- **Vanilla JS only** - No frameworks
- **Image processing** - Place images in `assets/images/` for Hugo processing
- **PDFs** - Place in `static/pdf/` for embedding

## Extension Points

- `layouts/partials/head-custom.html` - Add custom styles/meta
- `layouts/partials/scripts-custom.html` - Add custom JS/analytics
- `data/authors.yaml` - Author bios with avatar support

## Troubleshooting

### Images not processing / showing broken
- Ensure images are in `assets/images/`, not `static/images/`
- Check the image path starts with `/images/` (no `assets` prefix)
- Remote images (http/https) are passed through without processing

### Dark mode not switching
- Check browser's `prefers-color-scheme` setting
- Manual override: add `dark-mode` or `light-mode` class to `<body>`
- CSS variables should cascade from `:root`

### Search not working
- Ensure `[outputs] home = ["HTML", "RSS", "JSON"]` is in config
- Check that `/index.json` is generated in the build output
- Search requires JavaScript enabled

### 404 page not showing
- GitHub Pages: ensure `404.html` exists in root of `public/`
- Custom domains: check DNS and CNAME file in `static/`

### PDF embedding shows grey box
- Use local PDFs in `static/pdf/`, not remote URLs
- Some browsers block cross-origin PDF embedding
- Fallback download link is provided automatically

### Hugo build errors
```bash
# Check Hugo version (requires 0.153.2+ extended)
hugo version

# Verbose build output
hugo --logLevel debug

# Clear cache and rebuild
rm -rf resources/ public/ && hugo --gc
```
