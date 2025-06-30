# Dante - Tema de Astro & Tailwind CSS por justgoodui.com

Dante es un tema de blog y portafolio de autor único para Astro.js. Cuenta con un diseño minimalista, elegante, responsivo y enfocado en el contenido. Para más temas de Astro.js, por favor revisa [justgoodui.com](https://justgoodui.com/).

![Tema Dante de Astro.js](public/dante-preview.jpg)

[![Botón de Despliegue a Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/JustGoodUI/dante-astro-theme)

Si haces clic en este botón☝️, creará un nuevo repositorio para ti que se ve exactamente como este, y configurará ese repositorio inmediatamente para el despliegue en Netlify.

## Características del Tema:

- ✅ Modo de color oscuro y claro
- ✅ Sección hero con biografía
- ✅ Colección de portafolio
- ✅ Soporte de paginación
- ✅ Soporte de etiquetas de posts
- ✅ Formulario de suscripción
- ✅ Transiciones de vista
- ✅ Tailwind CSS
- ✅ Diseño responsivo mobile-first
- ✅ SEO-friendly con URLs canónicas y datos OpenGraph
- ✅ Soporte de sitemap
- ✅ Soporte de RSS Feed
- ✅ Soporte de Markdown & MDX

## Integraciones de Plantilla

- @astrojs/tailwind - https://docs.astro.build/en/guides/integrations-guide/tailwind/
- @astrojs/sitemap - https://docs.astro.build/en/guides/integrations-guide/sitemap/
- @astrojs/mdx - https://docs.astro.build/en/guides/markdown-content/
- @astrojs/rss - https://docs.astro.build/en/guides/rss/

## Estructura del Proyecto

Dentro del tema Dante de Astro, verás las siguientes carpetas y archivos:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── data/
│   ├── icons/
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   └── utils/
├── astro.config.mjs
├── package.json
├── README.md
└── tsconfig.json
```

Astro busca archivos `.astro` o `.md` en el directorio `src/pages/`. Cada página se expone como una ruta basada en su nombre de archivo.

No hay nada especial sobre `src/components/`, pero es donde nos gusta poner cualquier componente Astro (`.astro`).

El directorio `src/content/` contiene "colecciones" de documentos Markdown y MDX relacionados. Usa `getCollection()` para recuperar posts de `src/content/blog/`, y verifica el tipo de tu frontmatter usando un esquema opcional. Ve la [documentación de Colecciones de Contenido de Astro](https://docs.astro.build/en/guides/content-collections/) para aprender más.

Cualquier activo estático, como imágenes, puede ser colocado en el directorio `public/`.

## Comandos de Astro.js

Todos los comandos se ejecutan desde la raíz del proyecto, desde una terminal:

| Comando                   | Acción                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Instala dependencias                             |
| `npm run dev`             | Inicia el servidor de desarrollo local en `localhost:4321` |
| `npm run build`           | Construye tu sitio de producción en `./dist/`    |
| `npm run preview`         | Previsualiza tu build localmente, antes de desplegar |
| `npm run astro ...`       | Ejecuta comandos CLI como `astro add`, `astro check` |
| `npm run astro -- --help` | Obtén ayuda usando el CLI de Astro               |

## ¿Quieres aprender más sobre Astro.js?

Revisa [nuestra documentación](https://docs.astro.build) o únete a nuestro [servidor de Discord](https://astro.build/chat).

## Créditos

- Contenido demo generado con [Chat GPT](https://chat.openai.com/)
- Imágenes para contenido demo de [Unsplash](https://unsplash.com/)

## Temas de Astro por Just Good UI

- [Ovidius](https://github.com/JustGoodUI/ovidius-astro-theme) es un tema de blog de autor único gratuito.

## Licencia

Licenciado bajo la licencia [GPL-3.0](https://github.com/JustGoodUI/dante-astro-theme/blob/main/LICENSE).
