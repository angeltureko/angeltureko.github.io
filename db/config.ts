import { column, defineDb, defineTable } from 'astro:db';

// Tabla de usuarios para el sistema de comentarios y suscripciones
const Users = defineTable({
    columns: {
        id: column.number({ primaryKey: true, autoIncrement: true }),
        name: column.text(),
        email: column.text({ unique: true }),
        password: column.text({ optional: true }), // Para usuarios autenticados
        avatar: column.text({ optional: true }),
        createdAt: column.date({ default: new Date() }),
        isSubscribed: column.boolean({ default: false }),
    }
});

// Tabla de comentarios para los posts del blog
const Comments = defineTable({
    columns: {
        id: column.number({ primaryKey: true, autoIncrement: true }),
        postId: column.text(), // ID del post del blog
        authorId: column.number({ references: () => Users.columns.id }),
        content: column.text(),
        createdAt: column.date({ default: new Date() }),
        isApproved: column.boolean({ default: false }),
    }
});

// Tabla de analytics para rastrear visitas
const PageViews = defineTable({
    columns: {
        id: column.number({ primaryKey: true, autoIncrement: true }),
        pageUrl: column.text(),
        userAgent: column.text({ optional: true }),
        ipAddress: column.text({ optional: true }),
        viewedAt: column.date({ default: new Date() }),
    }
});

// Tabla de suscripciones al newsletter
const Subscriptions = defineTable({
    columns: {
        id: column.number({ primaryKey: true, autoIncrement: true }),
        email: column.text({ unique: true }),
        isActive: column.boolean({ default: true }),
        subscribedAt: column.date({ default: new Date() }),
    }
});

// Tabla de proyectos destacados
const FeaturedProjects = defineTable({
    columns: {
        id: column.number({ primaryKey: true, autoIncrement: true }),
        projectId: column.text(),
        isActive: column.boolean({ default: true }),
        addedAt: column.date({ default: new Date() }),
    }
});

export default defineDb({
    tables: {
        Users,
        Comments,
        PageViews,
        Subscriptions,
        FeaturedProjects
    }
}); 