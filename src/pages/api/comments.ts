import type { APIRoute } from 'astro';
import { Comments, db, Users } from 'astro:db';
import { eq } from 'drizzle-orm';

// Configurar para server-side rendering
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    try {
        const { postId, authorName, authorEmail, content } = await request.json();

        // Validación
        if (!postId || !authorName || !authorEmail || !content) {
            return new Response(JSON.stringify({
                success: false,
                message: 'Todos los campos son requeridos'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (!authorEmail.includes('@')) {
            return new Response(JSON.stringify({
                success: false,
                message: 'Email inválido'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Buscar o crear usuario
        let user = await db
            .select()
            .from(Users)
            .where(eq(Users.email, authorEmail))
            .limit(1);

        let userId: number;

        if (user.length === 0) {
            // Crear nuevo usuario
            const newUser = await db.insert(Users).values({
                name: authorName,
                email: authorEmail
            }).returning();
            userId = newUser[0].id;
        } else {
            userId = user[0].id;

            // Actualizar nombre si es diferente
            if (user[0].name !== authorName) {
                await db
                    .update(Users)
                    .set({ name: authorName })
                    .where(eq(Users.id, userId));
            }
        }

        // Crear comentario
        await db.insert(Comments).values({
            postId,
            authorId: userId,
            content
        });

        return new Response(JSON.stringify({
            success: true,
            message: 'Comentario enviado exitosamente. Será revisado antes de publicarse.'
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error al crear comentario:', error);

        return new Response(JSON.stringify({
            success: false,
            message: 'Error interno del servidor'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}; 