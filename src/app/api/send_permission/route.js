
import { createClient } from '../../utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';

export async function POST(request) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const formData = await request.formData();

    
    const evidence_file = formData.get('evidence_file')

    const userId = formData.get('userId')
    const absence_date = formData.get('absence_date')
    const is_whole_day = formData.get('is_whole_day')
    const is_absence = formData.get('is_absence')
    const from_hour = formData.get('from_hour')
    const to_hour = formData.get('to_hour')
    const leaving_at = formData.get('leaving_at')
    const absent_time = formData.get('absent_time')
    const reason = formData.get('reason')
    const assembly_type = formData.get('assembly_type')
    const personal_reason = formData.get('personal_reason')


    let evidence_file_path = null;
    let evidence_file_url = null;

    if (typeof evidence_file == File) {
        const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        ]

        if (!allowedTypes.includes(evidence_file.type)) {
            return NextResponse.json(
                {
                success: false,
                message:
                    "Tipo de archivo no permitido. Solo se aceptan PDF, imágenes, documentos de Word y archivos de texto.",
                },
                { status: 400 },
            )
        }

        const maxSize = 200 * 1024 * 1024 // 200MB en bytes
        if (evidence_file.size > maxSize) {
            return NextResponse.json(
                {
                    success: false,
                    message: "El archivo es demasiado grande. El tamaño máximo permitido es 10MB.",
                },
                { status: 400 },
            )
        }

        const { data, error } = await supabase.storage.from('evidences').upload(`${userId}/solicitudes/${Date.now()}_${evidence_file.name}`, evidence_file)

        if (error) {
            console.error(JSON.stringify(error))
        }
        
        const { data: { publicUrl } } = supabase.storage.from('evidences').getPublicUrl(data.path)    

        evidence_file_path = data.path
        evidence_file_url = publicUrl + "?download"

    }

    const toSend = { 
      user_id: userId,
      absence_date: absence_date,
      is_whole_day: is_whole_day,
      is_absence: is_absence,
      from_hour: from_hour == '' ? "7:00" : from_hour,
      to_hour: to_hour == '' ? "7:40" : to_hour,
      leaving_at: leaving_at == '' ? null:leaving_at,
      absent_time: absent_time,
      reason: reason,
      assembly_type: assembly_type == 'null' ? null : assembly_type,
      personal_reason: personal_reason == 'null' ? null : personal_reason,
      evidence_file_url: evidence_file_url
    }

    console.log(toSend)

    const { data, error } = await supabase
    .from('absence_requests')
    .insert([toSend])
    .select()

    if (error) {
        console.error("error" + JSON.stringify(error))
        console.log(data)

        if (evidence_file_url) {
            await supabase.storage.from('evidences').remove([`${evidence_file_path}`])
        }
        return NextResponse.json({msg: "Error Sending"}, {status: 500});

    }else{
      return NextResponse.json({msg: "Succesfully Sent"}, {status: 200});
    }
    
}

