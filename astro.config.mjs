import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import solidJs from '@astrojs/solid-js';
import icon from 'astro-icon';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    tailwind(),
    mdx(),
    react({
      include: ['**/react/**/*'],
    }),
    solidJs({
      include: ['**/solid/**/*'],
    }),
    icon(),
  ],
});
