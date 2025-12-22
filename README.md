# Ward&Westminster

An elegant, mobile-first Hugo theme for long-form journalism covering medicine, technology, and politics. Inspired by Guardian Long Reads and quality magazine publishing.

![Long Read Theme](screenshot.png)

## Features

- **Mobile-first design** with smooth scaling to desktop
- **Elegant typography** using Cormorant Garamond and Source Sans 3
- **Reading progress bar** with smooth animation
- **Micro-animations** on scroll for headers, quotes, and content
- **Pull quotes** with decorative styling
- **Drop caps** on article openings
- **Sticky navigation** that hides on scroll down, reveals on scroll up
- **Dark mode support** via `prefers-color-scheme`
- **Reduced motion support** for accessibility
- **SEO optimised** with Open Graph and Twitter Card meta tags
- **RSS feeds** for home and sections

## Installation

### Option 1: Git Submodule (Recommended)

```bash
cd your-hugo-site
git submodule add https://github.com/yourusername/wardwestminster.git themes/wardwestminster
```

### Option 2: Clone

```bash
cd your-hugo-site/themes
git clone https://github.com/yourusername/wardwestminster.git
```

### Option 3: Download

Download the theme and extract it to `themes/wardwestminster`.

## Configuration

Add the theme to your `hugo.toml`:

```toml
theme = "wardwestminster"
```

See `exampleSite/hugo.toml` for a complete configuration example, including:

- Navigation menus
- Site parameters
- Taxonomy setup
- Permalink structure

## Content

### Creating Articles

Create new articles with:

```bash
hugo new posts/my-article.md
```

### Front Matter

```yaml
---
title: "Article Title"
date: 2025-01-15
description: "A brief description for SEO and social sharing"
subtitle: "An optional longer subtitle displayed below the title"
author: "Author Name"
categories: ["Investigation"]
tags: ["topic", "another-topic"]
image: "/images/featured.jpg"
---
```

### Shortcodes

#### Pull Quote

```markdown
{{</* pullquote */>}}
This is a styled pull quote that stands out from the body text.
{{</* /pullquote */>}}

{{</* pullquote cite="Author Name" */>}}
A quote with attribution.
{{</* /pullquote */>}}
```

#### Section Break

```markdown
{{</* break */>}}

{{</* break symbol="◇" */>}}
```

#### Wide Figure

```markdown
{{</* figure-wide src="/images/photo.jpg" alt="Description" caption="Photo caption" */>}}
```

## Customisation

### Custom CSS

Create `layouts/partials/head-custom.html` in your site to add custom styles:

```html
<style>
  :root {
    --color-accent: #your-color;
  }
</style>
```

### Custom Scripts

Create `layouts/partials/scripts-custom.html` for analytics or other scripts.

### Author Bios

Create `data/authors.yaml`:

```yaml
"Author Name":
  name: "Author Name"
  bio: "A brief bio that appears at the end of articles."
  avatar: "/images/authors/name.jpg"
```

## Typography

The theme uses:

- **Cormorant Garamond** for headlines, quotes, and display text
- **Source Sans 3** for body text and UI elements

Both are loaded from Google Fonts.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Graceful degradation for older browsers
- Respects `prefers-reduced-motion` for accessibility

## Colour Scheme

The theme automatically adapts to light/dark mode based on system preferences. Default colours:

| Element | Light | Dark |
|---------|-------|------|
| Background | #faf9f7 | #1a1a1a |
| Text | #1a1a1a | #e8e6e3 |
| Accent | #8b2635 | #8b2635 |
| Quote border | #d4a574 | #c4956a |

## Performance

- Minimal CSS (~15KB minified)
- Minimal JavaScript (~3KB minified)
- No external dependencies beyond Google Fonts
- Lazy loading for images
- CSS-only animations where possible

## Licence

MIT License. See [LICENSE](LICENSE) for details.

## Credits

Inspired by The Guardian's Long Read format and classic editorial design.
