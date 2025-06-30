import type { APIRoute } from 'astro';

// Configurar para server-side rendering
export const prerender = false;

export const POST: APIRoute = async ({ cookies, redirect }) => {
    try {
        // Eliminar la cookie de sesión
        cookies.delete('session', {
            path: '/',
            httpOnly: true,
            secure: import.meta.env.PROD,
            sameSite: 'lax'
        });

        return new Response(JSON.stringify({
            success: true,
            message: 'Sesión cerrada exitosamente'
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error al cerrar sesión:', error);

        return new Response(JSON.stringify({
            success: false,
            message: 'Error al cerrar sesión'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

export const GET: APIRoute = async ({ cookies, redirect }) => {
    // También permitir logout por GET para enlaces directos
    cookies.delete('session', {
        path: '/',
        httpOnly: true,
        secure: import.meta.env.PROD,
        sameSite: 'lax'
    });

    return redirect('/auth/login');
}; 