import db from '@astrojs/db';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    output: 'server',
    site: 'https://angeltureko.github.io',
    vite: {
        plugins: [tailwindcss()]
    },
    integrations: [
        db({
            // Configuración de la base de datos
        }),
        mdx(),
        sitemap(),
    ]
});
