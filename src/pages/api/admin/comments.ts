import type { APIRoute } from 'astro';
import { db } from 'astro:db';

// Configurar para modo servidor
export const prerender = false;

export const PUT: APIRoute = async ({ request }) => {
    try {
        const { commentId, action } = await request.json();

        if (!commentId || !action) {
            return new Response(JSON.stringify({
                success: false,
                message: 'ID del comentario y acción son requeridos'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (action !== 'approve' && action !== 'reject') {
            return new Response(JSON.stringify({
                success: false,
                message: 'Acción inválida. Debe ser "approve" o "reject"'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (action === 'approve') {
            // Aprobar comentario usando SQL directo
            await db.run(`UPDATE Comments SET isApproved = 1 WHERE id = ${commentId}`);

            return new Response(JSON.stringify({
                success: true,
                message: 'Comentario aprobado exitosamente'
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            // Rechazar comentario (eliminarlo) usando SQL directo
            await db.run(`DELETE FROM Comments WHERE id = ${commentId}`);

            return new Response(JSON.stringify({
                success: true,
                message: 'Comentario rechazado y eliminado'
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

    } catch (error) {
        console.error('Error al moderar comentario:', error);

        return new Response(JSON.stringify({
            success: false,
            message: 'Error interno del servidor'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}; 