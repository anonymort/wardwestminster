# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ward&Westminster is a Hugo theme for long-form editorial content. Mobile-first, dark mode support, optimized for reading.

## Development Commands

```bash
# Run dev server with example site
cd exampleSite && hugo server --themesDir ../.. --theme wardwestminster

# Run with drafts visible
cd exampleSite && hugo server --themesDir ../.. --theme wardwestminster -D

# Build production site
cd exampleSite && hugo --themesDir ../.. --theme wardwestminster

# Create new content
hugo new posts/article-title.md
```

## Architecture

### Layout Hierarchy
```
layouts/_default/baseof.html    # Base template (head, fonts, asset pipeline)
    └── layouts/index.html      # Home page (hero + featured + grid)
    └── layouts/_default/single.html  # Article pages
    └── layouts/_default/list.html    # Archive/category pages
    └── layouts/_default/taxonomy.html # Tag/category listing
    └── layouts/_default/terms.html   # Tag/category index
```

### Key Files

| File | Purpose |
|------|---------|
| `assets/css/main.css` | All styles, CSS variables, dark mode, animations |
| `assets/js/main.js` | Nav, mobile menu, scroll animations, back-to-top, search |
| `layouts/partials/nav.html` | Fixed nav with mobile menu toggle |
| `layouts/partials/reading-time.html` | Medium-style reading time (265 WPM + images + code) |
| `layouts/partials/toc.html` | Auto-generated table of contents |
| `layouts/partials/related.html` | Related articles section |
| `layouts/partials/share.html` | Social share buttons (X, LinkedIn, Email, Copy) |
| `layouts/_default/search.html` | Search page with client-side search |
| `layouts/authors/` | Author archive pages |
| `exampleSite/hugo.toml` | Example configuration |
| `exampleSite/data/authors.yaml` | Author data (name, bio, avatar, social) |

### CSS Variables (in main.css :root)

Light/dark mode colors defined via `--color-*` variables. Override in `layouts/partials/head-custom.html`.

Key variables: `--color-accent` (#8b2635), `--color-bg`, `--color-text`, `--font-display`, `--font-body`

### Shortcodes

```markdown
{{< pullquote cite="Author" >}}Quote text{{< /pullquote >}}
{{< break symbol="◇" >}}
{{< figure-wide src="/image.jpg" alt="..." caption="..." >}}
```

### Extension Points

- `layouts/partials/head-custom.html` - Add custom styles/meta
- `layouts/partials/scripts-custom.html` - Add custom JS/analytics
- `data/authors.yaml` - Author bios with avatar support

## Configuration

```toml
theme = "wardwestminster"

[params]
  description = "Site description"
  tagline = "Medicine · Tech · Politics"
  author = "Author Name"
  topics = ["Medicine", "Tech", "Politics"]  # Hero section pills

[taxonomies]
  category = "categories"
  tag = "tags"

[permalinks]
  posts = "/:year/:month/:slug/"

[outputs]
  home = ["HTML", "RSS", "JSON"]  # JSON for search

[related]
  includeNewer = true
  threshold = 80
  [[related.indices]]
    name = "categories"
    weight = 100
  [[related.indices]]
    name = "tags"
    weight = 80

[markup.tableOfContents]
  startLevel = 2
  endLevel = 3
```

## Conventions

- Mobile-first responsive (breakpoints: 640px, 768px, 1024px)
- BEM-like class naming: `.article`, `.article-header`, `.article-title`
- Dark mode via `prefers-color-scheme` media query
- Animations respect `prefers-reduced-motion`
- Vanilla JS only (no frameworks)
