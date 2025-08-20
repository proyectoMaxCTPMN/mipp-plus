
import { createClient } from '../../utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';


export async function POST(request) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const formData = await request.formData();
    
    const isAccept = formData.get('isAccept')
    const request_id = formData.get('request_id')

    let query
    if (isAccept == 'true' || isAccept == true) {
        query = {is_approved: true}
    } else{
        query = {is_denied: true}
    }

    const { data, error } = await supabase
    .from('absence_requests')
    .update(query)
    .eq('id', request_id)

    if (error) {
        console.error("error" + JSON.stringify(error))
        console.log(data)
        return NextResponse.json({msg: "Error Sending"}, {status: 500});

    }else{
        return NextResponse.json({msg: "Succesfully Sent"}, {status: 200});
    }
    
}

