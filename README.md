<div align="center">

# winetree94.com

**Personal website, blog, and resume for winetree94.**

[![Web Deployment](https://github.com/winetree94/winetree94.com/actions/workflows/deployment.yaml/badge.svg)](https://github.com/winetree94/winetree94.com/actions/workflows/deployment.yaml)

[Website](https://winetree94.com) · [English](https://winetree94.com/en/) · [한국어](https://winetree94.com/ko/)

</div>

---

A bilingual Astro site for articles, project notes, and resume pages.

## Features

- **Bilingual routes** for English and Korean content
- **Content collections** for articles, pages, and tags
- **RSS, sitemap, and robots.txt** generated at build time
- **Cloudflare deployment** via Wrangler and GitHub Actions

## Development

```bash
pnpm install
pnpm dev
```

## Checks

```bash
pnpm biome
pnpm test:unit
pnpm test:component
pnpm test:e2e
pnpm build
```
