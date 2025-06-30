import { Comments, db, FeaturedProjects, PageViews, Subscriptions, Users } from 'astro:db';
import bcrypt from 'bcryptjs';

export default async function seed() {
    console.log('🌱 Poblando base de datos...');

    // Crear usuario administrador
    const adminPassword = await bcrypt.hash('admin123', 10);
    await db.insert(Users).values({
        name: 'Administrador',
        email: 'admin@example.com',
        password: adminPassword,
        isSubscribed: true
    });

    // Crear usuarios de ejemplo
    const user1Password = await bcrypt.hash('user123', 10);
    const user2Password = await bcrypt.hash('user456', 10);

    await db.insert(Users).values([
        {
            name: 'María González',
            email: 'maria@example.com',
            password: user1Password,
            isSubscribed: true
        },
        {
            name: 'Carlos Rodríguez',
            email: 'carlos@example.com',
            password: user2Password,
            isSubscribed: false
        },
        {
            name: 'Ana López',
            email: 'ana@example.com',
            isSubscribed: true
        },
        {
            name: 'Luis Pérez',
            email: 'luis@example.com',
            isSubscribed: false
        }
    ]);

    // Crear comentarios de ejemplo
    await db.insert(Comments).values([
        {
            postId: 'post-1',
            authorId: 2, // María
            content: '¡Excelente artículo! Muy informativo y bien escrito.',
            isApproved: true
        },
        {
            postId: 'post-1',
            authorId: 3, // Carlos
            content: 'Gracias por compartir esta información tan útil.',
            isApproved: true
        },
        {
            postId: 'post-2',
            authorId: 4, // Ana
            content: 'Interesante perspectiva sobre el tema.',
            isApproved: false // Pendiente de moderación
        },
        {
            postId: 'post-3',
            authorId: 5, // Luis
            content: 'Me gustaría saber más sobre este tema.',
            isApproved: true
        }
    ]);

    // Crear suscripciones de ejemplo
    await db.insert(Subscriptions).values([
        {
            email: 'maria@example.com',
            isActive: true
        },
        {
            email: 'ana@example.com',
            isActive: true
        },
        {
            email: 'nuevo@example.com',
            isActive: true
        }
    ]);

    // Crear vistas de página de ejemplo
    await db.insert(PageViews).values([
        {
            pageUrl: '/',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            ipAddress: '192.168.1.1'
        },
        {
            pageUrl: '/blog',
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
            ipAddress: '192.168.1.2'
        },
        {
            pageUrl: '/blog/post-1',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            ipAddress: '192.168.1.3'
        },
        {
            pageUrl: '/projects',
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15',
            ipAddress: '192.168.1.4'
        },
        {
            pageUrl: '/about',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            ipAddress: '192.168.1.5'
        }
    ]);

    // Crear proyectos destacados de ejemplo
    await db.insert(FeaturedProjects).values([
        {
            projectId: 'project-1',
            isActive: true
        },
        {
            projectId: 'project-2',
            isActive: true
        },
        {
            projectId: 'project-3',
            isActive: false
        }
    ]);

    console.log('✅ Base de datos poblada con datos de ejemplo');
    console.log('👤 Usuario administrador: admin@example.com / admin123');
} 