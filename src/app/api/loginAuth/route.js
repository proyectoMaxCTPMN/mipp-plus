import { createSession } from '@/app/utils/auth';
import { createClient } from '../../utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';  // Import bcrypt

export async function POST(request) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { id, password, is_remember } = await request.json();

    const { data: users, error } = await supabase.from('users').select().eq('id', id);

    if (error) {
        console.error("Error fetching user: " + error);
        return NextResponse.json({ msg: "Error fetching user" }, { status: 500 });
    } else {
        if (users.length > 0) {

            // Check if the passwords match
            const passwordMatch = await bcrypt.compare(password, users[0].password);

            if (!passwordMatch) {
                console.log("Incorrect password");
                return NextResponse.json({ msg: "Incorrect password" }, { status: 401 });
            }

            if (users[0].is_pswchange) {
                console.log("User needs to change password");
                return NextResponse.json({ redirectUrl: `/new_user?id=${users[0].id}` }, { status: 200 });
            } else {
                console.log("User authenticated successfully");
                const sessionId = await createSession(id, is_remember, users[0].system_color);
                return NextResponse.json({ redirectUrl: "/mipp/dashboard", sessionId }, { status: 200 });
            }

        } else {
            console.log("User not found");
            return NextResponse.json({ msg: "User not found" }, { status: 401 });
        }
    }
}
