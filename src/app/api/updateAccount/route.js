
import { createSession } from '@/app/utils/auth';
import { createClient } from '../../utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';

export async function POST(request) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const body = await request.json();

    const userID = body.userID
    const formData = body.formData

    const { data, error } = await supabase
    .from('users')
    .update({ 
      first_name: formData.first_name,
      last_name: formData.last_name,
      second_last_name: formData.second_last_name,
      email: formData.email,
      phone: formData.phone,
      has_ownership: (formData.title_id == 2) ? formData.has_ownership : null,
      position: formData.position_id,
      title: formData.title_id
    })
    .eq('id', userID)
    .select()

    if (error) {
      console.error("error" + error)
      return NextResponse.json({msg: "Error Updating"}, {status: 500});
    }else{
      return NextResponse.json({msg: "Succesfully Updated"}, {status: 200});
    }
    
}


