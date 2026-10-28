import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Example Project Docs',
      sidebar: [
        { label: 'Start here', items: ['index', 'architecture'] },
      ],
    }),
  ],
});
