# Contributing to Ward&Westminster

Thank you for your interest in contributing to Ward&Westminster! This document provides guidelines for contributing to the project.

## Getting Started

### Prerequisites

- [Hugo Extended](https://gohugo.io/installation/) v0.153.0 or later
- Git

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/anonymort/wardwestminster.git
   cd wardwestminster
   ```

2. Run the development server:
   ```bash
   cd exampleSite && hugo server --themesDir ../.. --theme wardwestminster
   ```

3. Open http://localhost:1313 in your browser

## How to Contribute

### Reporting Issues

- Search existing issues before creating a new one
- Use a clear, descriptive title
- Include steps to reproduce the issue
- Include your Hugo version (`hugo version`)
- Include browser/OS information if relevant

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Test your changes locally
5. Commit with a descriptive message
6. Push to your fork
7. Open a Pull Request

### Commit Messages

Use clear, descriptive commit messages:

- `feat: add new shortcode for video embedding`
- `fix: resolve dark mode toggle issue`
- `docs: update README with installation steps`
- `style: improve mobile navigation spacing`
- `refactor: simplify reading time calculation`

## Code Style

### CSS

- Use CSS variables for colors, fonts, and spacing
- Follow mobile-first responsive design
- Use BEM-like naming: `.block`, `.block-element`, `.block--modifier`
- Respect `prefers-reduced-motion` for animations

### JavaScript

- Vanilla JS only (no frameworks)
- Use strict mode (`'use strict'`)
- Comment complex logic
- Ensure accessibility (ARIA attributes, keyboard navigation)

### Hugo Templates

- Use meaningful partial names
- Include usage comments in shortcodes
- Provide sensible defaults for optional parameters

## Testing

Before submitting a PR:

1. Test on multiple browsers (Chrome, Firefox, Safari)
2. Test responsive design at various breakpoints
3. Test dark mode
4. Verify accessibility with keyboard navigation
5. Run Hugo build without errors: `hugo --gc --minify`

## Project Structure

```
wardwestminster/
├── assets/css/main.css    # All styles
├── assets/js/main.js      # All JavaScript
├── layouts/               # Hugo templates
│   ├── _default/         # Base templates
│   ├── partials/         # Reusable components
│   └── shortcodes/       # Content shortcodes
├── exampleSite/          # Demo site
└── static/               # Static files
```

## Questions?

Open an issue with the `question` label or reach out via the project's GitHub Discussions.
