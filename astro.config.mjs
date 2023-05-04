import { defineConfig } from 'astro/config';

// https://astro.build/config
import image from '@astrojs/image';

// https://astro.build/config

// https://astro.build/config
import mdx from '@astrojs/mdx';

// https://astro.build/config
import react from '@astrojs/react';

// https://astro.build/config
import solidJs from '@astrojs/solid-js';

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  integrations: [
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
    mdx(),
    react(),
    solidJs(),
  ],
});
