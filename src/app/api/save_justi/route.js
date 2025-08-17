
import { createClient } from '../../utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';

export async function POST(request) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const formData = await request.formData();

    
    const changed_input = formData.get('changed_input')
    const new_attachment = formData.get('new_attachment')

    const request_id = formData.get('request_id')
    const userId = formData.get('userId')
    const absence_date = formData.get('absence_date')
    const justification_category = formData.get('justification_category')
    const is_all_day = formData.get('is_all_day')
    const attachment_url = formData.get('attachment_url')
    const justification_reason = formData.get('justification_reason')
    const absent_time = formData.get('absent_time')
    const justification_text = formData.get('justification_text')
    const assembly_type = formData.get('assembly_type')


    let evidence_file_path = null;
    let evidence_file_url = null;

    if (changed_input) {
        const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        ]

        if (!allowedTypes.includes(new_attachment.type)) {
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
        if (new_attachment.size > maxSize) {
            return NextResponse.json(
                {
                    success: false,
                    message: "El archivo es demasiado grande. El tamaño máximo permitido es 10MB.",
                },
                { status: 400 },
            )
        }

        const { data, error } = await supabase.storage.from('evidences').upload(`${userId}/justificaciones/${Date.now()}_${new_attachment.name}`, new_attachment)

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
      justification_category,
      is_all_day,
      attachment_url: changed_input ? evidence_file_url : attachment_url,
      justification_reason,
      absent_time: parseInt(absent_time),
      assembly_type: (assembly_type == 'null' || assembly_type == '') ? null : parseInt(assembly_type),
      justification_text: justification_text == 'null' ? null : justification_text,
      request_id: request_id
    }


    const justiReponse = await supabase
    .from('justifications')
    .insert([toSend])
    .select()

    if (justiReponse.error) {
        console.error("error" + JSON.stringify(justiReponse.error) + justiReponse.error)
        console.log(dataJusti)

        if (evidence_file_url) {
            await supabase.storage.from('evidences').remove([`${evidence_file_path}`])
        }
        return NextResponse.json({msg: "Error Sending"}, {status: 500});

    }else{
        const absenceResponse = await supabase
        .from('absence_requests')
        .update({is_justified: true, justification_id: justiReponse.data[0].id})
        .eq('id', request_id)
        .select()

        if (absenceResponse.error) {
            if (evidence_file_url) {
                await supabase.storage.from('evidences').remove([`${evidence_file_path}`])
            }
            return NextResponse.json({msg: "Error Sending"}, {status: 500});
        }


        return NextResponse.json({msg: "Succesfully Sent"}, {status: 200});
    }
    
}
