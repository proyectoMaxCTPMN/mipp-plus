import { NextResponse } from 'next/server';
import { requireAdmin, requireAuth } from './app/utils/auth';



export async function middleware(request) {
    const user = await requireAuth()
    const authCookie = request.cookies.get('session_id');

    // Si la cookie o la sesion no existe, redirige a la página de login
    if (!authCookie || !user) {
        console.error("Se ha salido del sistema porque la sesion expiró")
        return NextResponse.redirect(new URL('/login', request.url));
    }

}

// Aplica el middleware solo en la ruta de 'protected'
export const config = {
    matcher: '/mipp/:path*',
};
