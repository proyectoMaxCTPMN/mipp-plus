
import { createClient } from '../../utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';

export async function POST(request) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const formData = await request.formData();

    const userId = formData.get('userId')
    const omission_date = formData.get('omission_date')
    const omission_reason = formData.get('omission_reason')
    const entry_time = formData.get('entry_time')
    const exit_time = formData.get('exit_time')
    const omission_type = formData.get('omission_type')

    const toSend = { 
        user_id: parseInt(userId),
        omission_date: new Date(omission_date).toISOString().split('T')[0],
        omission_reason,
        entry_time,
        exit_time,
        omission_type: parseInt(omission_type)
    }

    const { data, error } = await supabase
    .from('mark_omissions')
    .insert([toSend])
    .select()

    if (error) {
        console.error("error" + JSON.stringify(error) + error)
        console.log(data)
        return NextResponse.json({msg: "Error Sending"}, {status: 500});

    }else{
      return NextResponse.json({msg: "Succesfully Sent"}, {status: 200});
    }
    
}

