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

## Content

Articles live in Outline under `Articles / winetree94`, not in this repository.

- The Korean original is the article document; translations are child documents titled `<title> (en)`.
- Drafts are unpublished Outline documents and are never deployed.
- Each body starts with a `yaml` block. The original holds `routeSlug`, `publishedAt`, `updatedAt`, `tags`, `featureImage`, `commentsTerm`, and `excerpt`; translations only override `publishedAt`, `updatedAt`, or `excerpt`.
- `pnpm content:pull` converts them into `content/articles` (gitignored). Tests use `pnpm content:fixtures` instead.

To publish content-only changes, run the **Web Deployment** workflow manually:

```bash
gh workflow run deployment.yaml --ref main
```

## Development

```bash
pnpm install
export OUTLINE_API_KEY=...   # read-only Outline API key
pnpm content:pull            # or: pnpm content:fixtures
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
