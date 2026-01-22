import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import solidJs from '@astrojs/solid-js';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react({
      include: ['**/react/**/*'],
    }),
    solidJs({
      include: ['**/solid/**/*'],
    }),
    icon(),
  ],
});
