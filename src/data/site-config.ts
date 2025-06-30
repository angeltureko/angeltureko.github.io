export type Image = {
    src: string;
    alt?: string;
    caption?: string;
};

export type Link = {
    text: string;
    href: string;
};

export type Hero = {
    title?: string;
    text?: string;
    image?: Image;
    actions?: Link[];
};

export type Subscribe = {
    title?: string;
    text?: string;
    formUrl: string;
};

export type SiteConfig = {
    website: string;
    logo?: Image;
    title: string;
    subtitle?: string;
    description: string;
    image?: Image;
    headerNavLinks?: Link[];
    footerNavLinks?: Link[];
    socialLinks?: Link[];
    hero?: Hero;
    subscribe?: Subscribe;
    postsPerPage?: number;
    projectsPerPage?: number;
};

const siteConfig: SiteConfig = {
    website: 'https://example.com',
    title: 'Dante',
    subtitle: 'Tema minimalista de Astro.js',
    description: 'Tema de Astro.js y Tailwind CSS para blog y portafolio por justgoodui.com',
    image: {
        src: '/dante-preview.jpg',
        alt: 'Dante - Tema de Astro.js y Tailwind CSS'
    },
    headerNavLinks: [
        {
            text: 'Inicio',
            href: '/'
        },
        {
            text: 'Proyectos',
            href: '/projects'
        },
        {
            text: 'Blog',
            href: '/blog'
        },
        {
            text: 'Etiquetas',
            href: '/tags'
        }
    ],
    footerNavLinks: [
        {
            text: 'Acerca de',
            href: '/about'
        },
        {
            text: 'Contacto',
            href: '/contact'
        },
        {
            text: 'Términos',
            href: '/terms'
        },
        {
            text: 'Descargar tema',
            href: 'https://github.com/JustGoodUI/dante-astro-theme'
        }
    ],
    socialLinks: [
        {
            text: 'Dribbble',
            href: 'https://dribbble.com/'
        },
        {
            text: 'Instagram',
            href: 'https://instagram.com/'
        },
        {
            text: 'X/Twitter',
            href: 'https://twitter.com/'
        }
    ],
    hero: {
        title: '¡Hola! Bienvenido a mi rincón del internet',
        text: "Soy **Ethan Donovan**, un desarrollador web en Amazing Studio, dedicado a los reinos de la colaboración y la inteligencia artificial. Mi enfoque involucra abrazar la intuición, hacer solo la investigación necesaria y aprovechar la estética como catalizador para productos excepcionales. Tengo una profunda apreciación por el software de primera, el diseño visual y los principios del crecimiento impulsado por productos. Siéntete libre de explorar algunos de mis proyectos de programación en <a href='https://github.com/JustGoodUI/dante-astro-theme'>GitHub</a> o sígueme en <a href='https://twitter.com/justgoodui'>Twitter/X</a>.",
        image: {
            src: '/hero.jpeg',
            alt: 'Una persona sentada en un escritorio frente a una computadora'
        },
        actions: [
            {
                text: 'Ponte en contacto',
                href: '/contact'
            }
        ]
    },
    subscribe: {
        title: 'Suscríbete al boletín de Dante',
        text: 'Una actualización por semana. Todos los últimos posts directamente en tu bandeja de entrada.',
        formUrl: '#'
    },
    postsPerPage: 8,
    projectsPerPage: 8
};

export default siteConfig;
