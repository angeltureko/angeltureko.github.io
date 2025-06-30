import { db, Users } from 'astro:db';
import { defineMiddleware } from 'astro:middleware';
import { eq } from 'drizzle-orm';

// Tipos para la sesión
interface SessionData {
    userId: number;
    email: string;
    name: string;
    isAdmin: boolean;
}

// Extender el tipo Locals
declare namespace App {
    interface Locals {
        user?: {
            id: number;
            name: string;
            email: string;
            isAdmin: boolean;
        };
    }
}

// Rutas que requieren autenticación
const protectedRoutes = [
    '/admin',
    '/admin/',
    '/admin/comments',
    '/admin/users',
    '/admin/analytics'
];

// Rutas de autenticación (no requieren estar logueado)
const authRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password'
];

export const onRequest = defineMiddleware(async ({ request, cookies, redirect, locals }) => {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Verificar si es una ruta protegida
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    // Verificar si es una ruta de autenticación
    const isAuthRoute = authRoutes.some(route =>
        pathname.startsWith(route)
    );

    // Si no es una ruta protegida, continuar
    if (!isProtectedRoute) {
        return;
    }

    // Obtener la sesión de las cookies
    const sessionCookie = cookies.get('session');

    if (!sessionCookie?.value) {
        // No hay sesión, redirigir al login
        return redirect('/auth/login?redirect=' + encodeURIComponent(pathname));
    }

    try {
        // Parsear la sesión
        const sessionData: SessionData = JSON.parse(sessionCookie.value);

        // Verificar que el usuario existe en la base de datos
        const user = await db
            .select()
            .from(Users)
            .where(eq(Users.id, sessionData.userId))
            .limit(1);

        if (user.length === 0) {
            // Usuario no existe, limpiar cookie y redirigir
            cookies.delete('session');
            return redirect('/auth/login?redirect=' + encodeURIComponent(pathname));
        }

        const foundUser = user[0];

        // Verificar que el email coincide
        if (foundUser.email !== sessionData.email) {
            // Email no coincide, limpiar cookie y redirigir
            cookies.delete('session');
            return redirect('/auth/login?redirect=' + encodeURIComponent(pathname));
        }

        // Sesión válida, agregar datos del usuario a locals
        locals.user = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            isAdmin: sessionData.isAdmin
        };

        // Si está en una ruta de auth y ya está logueado, redirigir al admin
        if (isAuthRoute) {
            return redirect('/admin');
        }

    } catch (error) {
        console.error('Error al verificar sesión:', error);
        // Error al parsear la sesión, limpiar cookie y redirigir
        cookies.delete('session');
        return redirect('/auth/login?redirect=' + encodeURIComponent(pathname));
    }
});

// Función helper para verificar si el usuario está autenticado
export function isAuthenticated(locals: App.Locals): boolean {
    return !!locals.user;
}

// Función helper para verificar si el usuario es admin
export function isAdmin(locals: App.Locals): boolean {
    return locals.user?.isAdmin === true;
}

// Función helper para obtener datos del usuario
export function getUser(locals: App.Locals) {
    return locals.user;
} 