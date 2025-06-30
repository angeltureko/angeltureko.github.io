import type { APIRoute } from 'astro';
import { db, Users } from 'astro:db';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

export const POST: APIRoute = async ({ request }) => {
    try {
        const { name, email, password } = await request.json();

        // Validación
        if (!name || !email || !password) {
            return new Response(JSON.stringify({
                success: false,
                message: 'Todos los campos son requeridos'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (password.length < 6) {
            return new Response(JSON.stringify({
                success: false,
                message: 'La contraseña debe tener al menos 6 caracteres'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (!email.includes('@')) {
            return new Response(JSON.stringify({
                success: false,
                message: 'Email inválido'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Verificar si el usuario ya existe
        const existingUser = await db
            .select()
            .from(Users)
            .where(eq(Users.email, email))
            .limit(1);

        if (existingUser.length > 0) {
            return new Response(JSON.stringify({
                success: false,
                message: 'Ya existe una cuenta con este email'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
        const newUser = await db.insert(Users).values({
            name,
            email,
            password: hashedPassword
        }).returning();

        return new Response(JSON.stringify({
            success: true,
            message: 'Usuario registrado exitosamente',
            userId: newUser[0].id
        }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error al registrar usuario:', error);

        return new Response(JSON.stringify({
            success: false,
            message: 'Error interno del servidor'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}; 