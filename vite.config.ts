import { defineConfig } from 'vite';

// Served from https://sharath-b-naik.github.io/portfolio/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/portfolio/' : '/',
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    assetsInlineLimit: 0,
  },
}));
