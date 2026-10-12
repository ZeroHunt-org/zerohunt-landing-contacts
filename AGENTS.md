# zerohunt-landing-contacts

Contacts page for Zero Hunt: media kit / press kit downloads + collaboration request form.
Visual style mirrors [zerohunt-landing](https://github.com/ZeroHunt-org/zerohunt-landing) (`src/pages/ContactPage.tsx`).

## Stack

Vite 6 + React 18 + TypeScript + Tailwind 3. Fonts: IBM Plex via `@fontsource` (no CDN). Node via nvm, npm (`package-lock.json`).

## Commands

```bash
npm install
npm run dev      # local dev server
npm run build    # tsc type-check + vite build → dist/
```

## Deploy

GitHub Pages via `.github/workflows/deploy.yml`, on every push to `main`. Custom domain `contact.zerohunt.ai` from `public/CNAME`; DNS is a CNAME `contact` → `zerohunt-org.github.io` in the Cloudflare zone `zerohunt.ai` (DNS only, not proxied).

## Structure

- `src/App.tsx` — whole page (header, kit tiles, form, footer).
- `src/index.css` — Tailwind + `.cta-button` (copied from landing `landing.css`).
- `tailwind.config.ts` — landing's retuned `cyan` / `emerald` / `gray` scales; keep in sync with landing.
- `public/downloads/` — kit files: `zerohunt-media-kit.zip`, `zerohunt-press-kit.zip` (paths in `KITS`, `src/App.tsx`).

## Conventions

- Reuse landing class recipes (`inputClass`, `labelClass`, card `rounded-xl border-gray-800 bg-gray-900/30`) instead of new styles.
- Form has no backend: `onSubmit` only prevents default and shows the confirmation state.
