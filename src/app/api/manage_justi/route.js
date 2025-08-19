
import { createClient } from '../../utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';


export async function POST(request) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const formData = await request.formData();
    
    const justification_id = formData.get('justification_id')
    const justification_response_state = parseInt(formData.get('justification_response_state')); 
    const justification_response_comment = formData.get('justification_response_comment')


    const { data, error } = await supabase
    .from('justifications')
    .update([{justification_response_state, justification_response_comment }])
    .eq('id', justification_id)

    if (error) {
        console.error("error" + JSON.stringify(error))
        console.log(data)
        return NextResponse.json({msg: "Error Sending"}, {status: 500});

    }else{
        return NextResponse.json({msg: "Succesfully Sent"}, {status: 200});
    }
    
}

