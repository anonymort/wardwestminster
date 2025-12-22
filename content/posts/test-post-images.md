---
title: "The Art of Analog: A Tidy Workspace"
date: 2025-12-22
description: "Exploring the aesthetic of clear desks and clear minds through the lens of vintage typography and handwritten notes."
author: "Antigravity"
featured_image: "/images/header-typewriter.png"
featured_image_alt: "A vintage typewriter on a wooden desk"
featured_image_caption: "The structured chaos of a creative mind, distilled into a tidy workspace."
categories: ["Design", "Lifestyle"]
tags: ["Images", "Typography", "Vintage"]
---

In a world increasingly dominated by digital noise, there is something profoundly grounding about the tactile nature of analog tools. The click-clack of a typewriter, the scratch of a nib on paper—these are the sounds of intention.

## The Header Image

As you can see above, we have implemented a **Featured Image** (or Header Image) capability. This image sits neatly between the article header (title, metadata) and the content. It respects the text column width (`max-width-article`) to maintain a "tidy" reading experience, preventing the image from becoming overwhelming or distracting.

By setting the `featured_image` param in the front matter, you can add a visual anchor to your posts.

## Inline Images

Further down the page, we can use inline images to illustrate specific points. Using the standard Hugo `figure` shortcode, we can include images with captions that are perfectly styled.

{{< figure src="/images/inline-pen.png" title="The Pen is Mightier" caption="A close-up of a vintage fountain pen nib, ready to write." >}}

Notice how the caption is subtly styled and the image has a gentle border radius to match the site's aesthetic.

### How to use?

To add a header image, simply add this to your front matter:

```yaml
featured_image: "/images/your-image.jpg"
featured_image_caption: "Optional caption here"
```

To add an inline image such as the one above, use the shortcode:

```go
{{< figure src="/images/your-image.jpg" caption="Your caption" >}}
```

This ensures consistent spacing and styling across all your posts.
