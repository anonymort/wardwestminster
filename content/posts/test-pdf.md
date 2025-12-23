---
title: "Test PDF Embedding"
date: 2025-12-23T00:20:00Z
draft: false
categories: ["Tech"]
tags: ["Test", "PDF"]
author: "Dr Matt Kneale"
description: "Testing the new PDF embedding shortcode."
---

This post tests the new `{{< pdf >}}` shortcode.

## Embedded PDF

Below is an embedded PDF (using a sample PDF from the web).

{{< pdf src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" caption="A dummy PDF for testing purposes" >}}

## Height and Width Customization

{{< pdf src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" height="400px" width="80%" caption="A smaller PDF embed" >}}

## Fallback Test

If the PDF doesn't load or is viewed on a mobile browser that doesn't support embedding, you should see a download button below (we can simulate this by using an invalid source).

{{< pdf src="invalid.pdf" caption="This should show a fallback" >}}
