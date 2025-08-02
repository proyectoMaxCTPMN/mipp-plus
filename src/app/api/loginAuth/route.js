
import { createSession } from '@/app/utils/auth';
import { createClient } from '../../utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';

export async function POST(request) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const {id, password, is_remember} = await request.json();

    const { data: users, error } = await supabase.from('users').select().eq('id', id).eq('password', password);

    if (error) {
        console.error("error" + error)
    }else{
        if (users.length > 0) {
          const sessionId = await createSession(id, is_remember, users[0].system_color)

          return NextResponse.json({redirectUrl: "/mipp/dashboard", sessionId}, {status: 200});
        }else {
          return NextResponse.json({msg: "not allowed"}, {status: 401})
        }
    }



    
}


