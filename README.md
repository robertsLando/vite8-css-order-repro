# Vite 8 CSS Cascade Order Reproduction

Minimal reproduction for [vitejs/vite#21903](https://github.com/vitejs/vite/issues/21903).

## The Bug

When using `vite-plugin-vuetify` with `autoImport` and `material-design-icons-iconfont`, the CSS cascade order differs between dev and production builds in Vite 8:

- **Dev mode**: VIcon CSS loads **after** material-icons CSS (via auto-import), so `.v-icon--size-default { font-size: 1.5em }` wins
- **Production**: Rolldown places VIcon CSS **before** material-icons CSS, so `.material-icons { font-size: 24px }` wins

This causes icons to appear bigger and bolder in production.

## Steps to Reproduce

```bash
npm install

# 1. Start dev server — icons render correctly
npm run dev

# 2. Build and preview — icons are bigger/bolder
npm run build
npm run preview
```

Open both in the browser and compare icon sizes. Inspect a `.v-icon` element in DevTools to see which `font-size` rule wins.

## Expected

CSS cascade order should be consistent between dev and production. `.v-icon--size-default` should win in both modes.

## Workaround

Wrap the icon font import in a CSS `@layer`:

```css
@import 'material-design-icons-iconfont/dist/material-design-icons.css' layer(icon-fonts);
```
