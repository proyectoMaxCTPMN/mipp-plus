
import { createClient } from '../../utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';


export async function POST(request) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const formData = await request.formData();
    
    const report_id = formData.get('report_id')


    const { data, error } = await supabase
    .from('infraestructure_reports')
    .update([{is_managed: true }])
    .eq('id', report_id)

    if (error) {
        console.error("error" + JSON.stringify(error))
        console.log(data)
        return NextResponse.json({msg: "Error Sending"}, {status: 500});

    }else{
        return NextResponse.json({msg: "Succesfully Sent"}, {status: 200});
    }
    
}

