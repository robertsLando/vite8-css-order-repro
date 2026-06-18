# Vite 8 CSS Cascade Order Reproduction

Minimal reproduction for [vitejs/vite#21903](https://github.com/vitejs/vite/issues/21903).

Reproduces on **Vite 8.0.16** (the latest 8.x patch at the time of writing). The
issue was first seen on `8.0.0` and still happens on `8.0.16` — bumping Vite does
not fix it.

## The Bug

When using `vite-plugin-vuetify` with `autoImport` and
`material-design-icons-iconfont`, the CSS cascade order differs between dev and
production builds in Vite 8:

- **Dev mode**: VIcon CSS loads **after** the material-icons CSS, so
  `.v-icon--size-default { font-size: calc(var(--v-icon-size-multiplier) * 1.5em) }`
  wins.
- **Production**: Rolldown emits the Vuetify component CSS as a separate
  stylesheet that is linked **before** `index.css`, so `.material-icons
  { font-size: 24px }` (which lives in `index.css`) wins instead.

`.v-icon--size-default` and `.material-icons` have the same specificity, so the
later-linked rule wins. Reversing the link order between dev and production flips
the result: icons appear bigger and bolder in production, and `display:
inline-block` from `.material-icons` also overrides Vuetify's `display:
inline-flex`.

## Why this setup

The bug only shows up once Rolldown splits the Vuetify component CSS into its own
eager chunk — exactly what happens in a real app. This repro forces that split
**without any `manualChunks` config** by using a shared, icon-heavy component
(`src/components/IconPanel.vue`) in two ways:

- eagerly, in `src/App.vue` (part of the entry graph), and
- in several lazy-loaded routes (`src/views/Page*.vue`).

That shared eager/async Vuetify usage makes Rolldown hoist the Vuetify component
CSS (including `.v-icon--size-default`) into a standalone eager stylesheet that is
linked before `index.css`. Meanwhile `index.css` carries the
`material-design-icons-iconfont` import from `src/plugins/vuetify.js`, so its
`.material-icons` rule ends up later in the cascade and wins.

A trivially minimal repro (a single component, no shared lazy routes) does **not**
reproduce on `8.0.16`: Rolldown merges everything into one `index.css` in the
correct order. The extra routes/component are what reproduce the real-app
chunking.

## Steps to Reproduce

```bash
npm install

# 1. Start dev server — icons render correctly
npm run dev

# 2. Build and preview — icons are bigger/bolder
npm run build
npm run preview
```

Open both in the browser and compare icon sizes. Inspect a `.v-icon` element in
DevTools to see which `font-size` rule wins.

You can also inspect the build output directly:

```bash
npm run build
# The HTML links the Vuetify component CSS chunk *before* index.css:
grep -oE 'assets/[A-Za-z0-9_-]+\.css' dist/index.html
# .v-icon--size-default lives in the earlier chunk, .material-icons in index.css:
grep -l 'v-icon--size-default' dist/assets/*.css
grep -l 'font-size:24px'       dist/assets/*.css
```

## Expected

CSS cascade order should be consistent between dev and production.
`.v-icon--size-default` should win in both modes.

## Workaround

Wrap the icon font import in a CSS `@layer` so the unlayered Vuetify component
styles always win regardless of stylesheet link order:

```css
@import 'material-design-icons-iconfont/dist/material-design-icons.css' layer(icon-fonts);
```
