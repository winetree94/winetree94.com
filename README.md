<div align="center">

# winetree94.com

**Personal website, blog, and resume for winetree94.**

[![Web Deployment](https://github.com/winetree94/winetree94.com/actions/workflows/deployment.yaml/badge.svg)](https://github.com/winetree94/winetree94.com/actions/workflows/deployment.yaml)

[Website](https://winetree94.com) · [English](https://winetree94.com/en/) · [한국어](https://winetree94.com/ko/)

</div>

---

A trilingual (English, Korean, Japanese) Astro site for articles, project notes, and resume pages.

## Features

- **Localized routes** for English, Korean, and Japanese content
- **Content collections** for articles, pages, and tags
- **RSS, sitemap, and robots.txt** generated at build time
- **Cloudflare deployment** via Wrangler and GitHub Actions

## Content

Articles live in the Outline collection `Blog: winetree94`, not in this repository.

- Each top-level document is an original article; translations (`en`, `ja`) are its child documents. Document titles are used as-is.
- Drafts are unpublished Outline documents and are never deployed.
- Every document starts with the same header: a feature image (Outline attachment), a `yaml` block, and a `---` divider before the body.

  ````markdown
  ![](/api/attachments.redirect?id=<attachment-id>)

  ```yaml
  lang: "ko"
  routeSlug: "my-article"
  publishedAt: "2026-01-01T00:00:00.000+09:00"
  commentsTerm: "my-article"
  ```

  ---

  Body...
  ````

- The image is required in the original and optional in translations, which otherwise reuse it.
- Every document declares its language with `lang`. The original also holds `routeSlug`, `publishedAt`, `updatedAt`, `tags`, `commentsTerm`, and `excerpt`; translations may only override `publishedAt`, `updatedAt`, or `excerpt` and inherit the rest.
- `pnpm content:pull` converts published documents into `content/articles` (gitignored). Tests use `pnpm content:fixtures` instead.
- `pnpm content:check` validates every document, drafts included, without writing files. Run it before publishing.

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
