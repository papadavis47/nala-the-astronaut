# AGENTS.md

Guidance for AI agents working in this repo. This file is the **source of truth**;
`CLAUDE.md` just imports it.

## What this is

**Nala the Astronaut** — a small personal website about a golden retriever, used as
a playground for practicing current web-dev tech. Static, content-only marketing-style
site (home / about / gallery). No backend, no database, no auth.

## Stack

- **Astro 7** (static output) — `astro.config.mjs`
- **Tailwind CSS v4** via the `@tailwindcss/vite` plugin (NOT the old `@astrojs/tailwind`
  integration, and NOT a `tailwind.config.js` — v4 is configured in CSS; see `src/styles/global.css`)
- **TypeScript** strict (`astro/tsconfigs/strict`)
- **pnpm** (see `pnpm-lock.yaml`) — use pnpm, not npm/yarn
- **Node** v22 (`.nvmrc` absent; developed on v22.15)
- **astro-icon** + Iconify sets: `@iconify-json/mdi`, `radix-icons`, `grommet-icons`
- Fonts via `@fontsource-variable/*`: **Space Grotesk** (display/headings) + **Inter** (body)
- **React 19** and **Solid** integrations are installed and configured but **currently unused** —
  they only activate for files under `**/react/**/*` and `**/solid/**/*` globs (none exist yet).
  `sharp` powers Astro's image optimization.

## Commands

| Task | Command |
|------|---------|
| Dev server | `pnpm dev` (http://localhost:4321) |
| Type/diagnostics check | `pnpm check` (`astro check`) — run before considering work done |
| Production build | `pnpm build` |
| Preview built site | `pnpm preview` |

There is **no test suite, linter, or formatter** configured. `astro check` is the only
automated gate. Verify UI changes in the browser via `pnpm dev`.

## Layout / conventions

Components are organized by **feature/area**, not by generic "components" folder:

```
src/
  pages/        route entry points (index, about, gallery)
  layout/       MainLayout, NavBar, Footer (site chrome)
  home/         home-page section components (Hero, NamePun, OriginStory, CozyBanner, ...)
  about/        about-page sections (AboutHero, QuickFacts, AboutStory, Achievements)
  gallery/      GalleryHeader, GalleryGrid, gallery-images.ts
  shared/       cross-page components (CtaSection)
  images/       .webp assets (optimized by Astro <Image>)
  styles/       global.css (design system lives here)
  types/        ambient .d.ts (fontsource, images)
```

- **Path alias:** `@/*` → `src/*` (tsconfig). Use `@/layout/MainLayout.astro`, etc.
  Older granular aliases (`@components`, `@layouts`, ...) were removed — don't reintroduce them.
- Pages compose section components; keep page files thin.
- Use Astro's `<Image>` from `astro:assets` for photos (responsive `widths`/`sizes`).
- `learning/` is a gitignored scratch dir for notes; never rely on it.

## Design system (read before touching styles)

Defined entirely in `src/styles/global.css` (Tailwind v4 CSS config):

- **Semantic tokens** as CSS vars on `:root` (light) with `.dark` overrides, mapped to
  Tailwind color utilities via `@theme inline`: `background`, `surface`, `surface-2`,
  `text`, `heading`, `muted`, `border`, `gold`, `gold-strong`, `on-gold`.
  Use these (`bg-background`, `text-heading`, `border-border`, ...) — not raw colors.
- **Dark mode is class-based**: `.dark` on `<html>`, toggled by the theme button in NavBar
  and pre-set before paint by an inline script in `MainLayout` (reads `localStorage.theme`,
  falls back to `prefers-color-scheme`). `@custom-variant dark` enables `dark:` variants.
- **Custom utilities** (`@utility`): `bg-gold-gradient`, `text-gold-gradient`,
  `reveal` / `reveal-visible` (scroll-reveal, driven by an IntersectionObserver in MainLayout).
- **Fonts**: `font-display` (Space Grotesk), `font-body` (Inter).
- **Standard page container**: `w-full max-w-5xl lg:max-w-[85vw] 2xl:max-w-350 px-6 lg:px-8`
  (`max-w-350` == 1400px on the spacing scale; kept consistent across all containers).

## Gotchas / hard-won knowledge

- **Never put unlayered element/global CSS that a Tailwind utility could set.** In Tailwind v4,
  utilities live in `@layer utilities`, and **unlayered CSS beats any layered rule regardless of
  specificity**. An unlayered `* { margin: 0 }` once silently disabled every `mb-*`/`mt-*`
  site-wide, and an unlayered `h1..h4 { color }` overrode `text-white` on a heading. All global
  element defaults in `MainLayout`'s `<style is:global>` are therefore wrapped in `@layer base`.
  Keep them there; let Tailwind's Preflight handle the reset.
- **Tailwind v4 renamed utilities.** e.g. `bg-gradient-to-*` → `bg-linear-to-*`. Prefer current
  v4 names; the language server flags deprecated ones.
- **`gallery-images.ts` globs `../images/*.webp`** eagerly — every `.webp` in `src/images/`
  appears in the gallery. Add a caption entry for new files (falls back to a generic caption).
  Note the folder still contains older `nala*.webp` assets that also render in the gallery.

## Workflow notes

- Commit style: concise, conventional-commit prefixes (`feat`, `fix`, `chore`, `refactor`),
  imperative, scoped where useful (`feat(gallery): ...`). Break unrelated work into logical commits.
- Confirm before pushing; branch off `main` for non-trivial work.
