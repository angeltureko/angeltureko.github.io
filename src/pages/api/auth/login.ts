import type { APIRoute } from 'astro';
import { db, Users } from 'astro:db';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

// Configurar para server-side rendering
export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
    try {
        const { email, password, remember, redirect } = await request.json();

        // Validación
        if (!email || !password) {
            return new Response(JSON.stringify({
                success: false,
                message: 'Email y contraseña son requeridos'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Buscar usuario
        const user = await db
            .select()
            .from(Users)
            .where(eq(Users.email, email))
            .limit(1);

        if (user.length === 0) {
            return new Response(JSON.stringify({
                success: false,
                message: 'Credenciales inválidas'
            }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const foundUser = user[0];

        // Verificar si el usuario tiene contraseña (usuarios autenticados)
        if (!foundUser.password) {
            return new Response(JSON.stringify({
                success: false,
                message: 'Este email no tiene una cuenta registrada. Regístrate primero.'
            }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Verificar contraseña
        const isValidPassword = await bcrypt.compare(password, foundUser.password);

        if (!isValidPassword) {
            return new Response(JSON.stringify({
                success: false,
                message: 'Credenciales inválidas'
            }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Crear sesión
        const sessionData = {
            userId: foundUser.id,
            email: foundUser.email,
            name: foundUser.name,
            isAdmin: foundUser.email === 'admin@example.com' // Lógica simple de admin
        };

        // Configurar cookie de sesión
        const sessionCookie = cookies.set('session', JSON.stringify(sessionData), {
            path: '/',
            httpOnly: true,
            secure: import.meta.env.PROD,
            sameSite: 'lax',
            maxAge: remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24 // 30 días o 1 día
        });

        // Validar redirección para evitar open redirect
        const safeRedirect = redirect && redirect.startsWith('/') ? redirect : '/admin';

        return new Response(JSON.stringify({
            success: true,
            message: 'Inicio de sesión exitoso',
            user: {
                id: foundUser.id,
                name: foundUser.name,
                email: foundUser.email
            },
            redirect: safeRedirect
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': sessionCookie.toString()
            }
        });

    } catch (error) {
        console.error('Error al iniciar sesión:', error);

        return new Response(JSON.stringify({
            success: false,
            message: 'Error interno del servidor'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}; 