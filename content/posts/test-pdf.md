---
title: "Test PDF Embedding"
date: 2025-12-23T00:20:00Z
draft: true
categories: ["Tech"]
tags: ["Test", "PDF"]
author: "Dr Matt Kneale"
description: "Testing the new PDF embedding shortcode."
---

This post tests the new `{{< pdf >}}` shortcode.

## Embedded PDF

Below is an embedded PDF (using a local file).

{{< pdf src="/pdf/test.pdf" caption="A test PDF hosted locally" >}}

## Height and Width Customization

{{< pdf src="/pdf/test.pdf" height="400px" width="80%" caption="A smaller PDF embed" >}}

## Fallback Test

If the PDF doesn't load or is viewed on a mobile browser that doesn't support embedding, you should see a download button below (we can simulate this by using an invalid source).

{{< pdf src="invalid.pdf" caption="This should show a fallback" >}}
