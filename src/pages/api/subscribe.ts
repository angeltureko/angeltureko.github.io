import type { APIRoute } from 'astro';
import { db, Subscriptions } from 'astro:db';
import { eq } from 'drizzle-orm';

export const POST: APIRoute = async ({ request }) => {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return new Response(JSON.stringify({
                success: false,
                message: 'Email inválido'
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        // Verificar si ya existe la suscripción
        const existingSubscription = await db
            .select()
            .from(Subscriptions)
            .where(eq(Subscriptions.email, email))
            .limit(1);

        if (existingSubscription.length > 0) {
            return new Response(JSON.stringify({
                success: false,
                message: 'Ya estás suscrito a nuestro newsletter'
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        // Crear nueva suscripción
        await db.insert(Subscriptions).values({
            email
        });

        return new Response(JSON.stringify({
            success: true,
            message: '¡Te has suscrito exitosamente a nuestro newsletter!'
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        console.error('Error al suscribir:', error);

        return new Response(JSON.stringify({
            success: false,
            message: 'Error interno del servidor'
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}; 