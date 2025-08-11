import { createClient } from '../../utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';

export async function POST(request) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const body = await request.json();

    const userID = body.userID


    const { data, error } = await supabase
    .from('users')
    .insert([{
      id: userID,
    }])
    .select()

    if (error) {
      console.error("error" + error)
      return NextResponse.json({msg: "Error Updating"}, {status: 500});
    }else{
      return NextResponse.json({msg: "Succesfully Updated"}, {status: 200});
    }
    
}

