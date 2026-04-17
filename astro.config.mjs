// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://adiggstion.github.io',
  base: '/TheSchneiderHair/',
  outDir: './docs',
  vite: {
    plugins: [tailwindcss()]
  }
});