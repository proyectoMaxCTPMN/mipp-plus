import { NextResponse } from 'next/server';
import { getRoles, requireAuth } from './app/utils/auth';



export async function middleware(request) {
    const user = await requireAuth()
    const authCookie = request.cookies.get('session_id');
    const roles = await getRoles(user);

    // Si la cookie o la sesion no existe, redirige a la página de login
    if (!authCookie || !user) {
        console.error("Se ha salido del sistema porque la sesion expiró")
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (request.nextUrl.pathname == '/mipp/manage' ) {
        if (roles && (roles.read_documents || roles.manage_documents || roles.manage_read_reports)) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/mipp/unauthorized', request.url));
        }
    }

        if (request.nextUrl.pathname == '/mipp/create_account' ) {
        if (roles && roles.create_users) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/mipp/unauthorized', request.url));
        }
    }

    

}

// Aplica el middleware solo en la ruta de 'protected'
export const config = {
    matcher: '/mipp/:path*',
};
