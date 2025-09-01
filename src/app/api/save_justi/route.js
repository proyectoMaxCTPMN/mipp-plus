
import { createClient } from '../../utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';

function getLocalDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`; // siempre YYYY-MM-DD correcto en local
}

function normalizeFileName(name) {
  return name
    .normalize("NFD") // quita acentos
    .replace(/[\u0300-\u036f]/g, "") // elimina diacríticos
    .replace(/\s+/g, "_") // espacios a guion bajo
    .replace(/[^a-zA-Z0-9._-]/g, ""); // solo caracteres seguros
}

export async function POST(request) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const formData = await request.formData();

    
    const changed_input = formData.get('changed_input')
    let new_attachment = formData.get('new_attachment')

    const request_id = formData.get('request_id')
    const userId = formData.get('userId')
    const justification_date = formData.get('justification_date')
    const absence_date = formData.get('absence_date')
    const is_absence = formData.get('is_absence')
    const is_all_day = formData.get('is_all_day')
    const attachment_url = formData.get('attachment_url')
    const justification_reason = formData.get('justification_reason')
    const absent_time = formData.get('absent_time')
    const justification_text = formData.get('justification_text')
    const assembly_type = formData.get('assembly_type')
    const leaving_at = formData.get('leaving_at')
    const from_hour = formData.get('from_hour')
    const to_hour = formData.get('to_hour')
    const justification_comment = formData.get('justification_comment')

    const evidence_file = formData.get('evidence_file')

    let evidence_file_path = null;
    let evidence_file_url = null;

    if (changed_input) {
        console.log(new_attachment.type)
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

        const { data, error } = await supabase.storage.from('evidences').upload(`${userId}/justificaciones/${Date.now()}_${normalizeFileName(new_attachment.name)}`, new_attachment)

        if (error) {
            console.error(JSON.stringify(error))
        }
        
        const { data: { publicUrl } } = supabase.storage.from('evidences').getPublicUrl(data.path)    

        evidence_file_path = data.path
        evidence_file_url = publicUrl + "?download"

    }

    if (typeof evidence_file != null && evidence_file != null && typeof evidence_file == 'object') {
        console.log('entro evidence file')
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
                err: 'fileTypeError',
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
                    err: 'fileSizeError',
                },
                { status: 400 },
            )
        }


        const { data, error } = await supabase.storage.from('evidences').upload(`${userId}/justificaciones/${Date.now()}_${normalizeFileName(evidence_file.name)}`, evidence_file)

        if (error) {
            console.error(JSON.stringify(error))
        }
        
        const { data: { publicUrl } } = supabase.storage.from('evidences').getPublicUrl(data.path)    

        evidence_file_path = data.path
        evidence_file_url = publicUrl + "?download"
    }

    const toSend = { 
      user_id: userId,
      justification_date: justification_date,
      absence_date: absence_date,
      is_absence,
      is_all_day,
      attachment_url: changed_input ? evidence_file_url : evidence_file ? evidence_file_url : attachment_url,
      justification_reason,
      absent_time: parseInt(absent_time),
      assembly_type: (assembly_type == 'null' || assembly_type == '') ? null : parseInt(assembly_type),
      justification_text: justification_text == 'null' ? null : justification_text,
      request_id: request_id == 'null' ? null : request_id,
      leaving_at,
      from_hour: from_hour == '' ? null : from_hour,
      to_hour: to_hour == '' ? null : to_hour,
      justification_comment,
    } 

    const justiReponse = await supabase
    .from('justifications')
    .insert([toSend])
    .select()

    if (justiReponse.error) {
        console.error("error" + JSON.stringify(justiReponse.error) + justiReponse.error)
        console.log(justiReponse)

        if (evidence_file_url) {
            await supabase.storage.from('evidences').remove([`${evidence_file_path}`])
        }

        return NextResponse.json({msg: "Error Sending"}, {status: 500});

    }else{
        if (request_id != 'null') {
            console.log('entro a request_id')
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
        }

        return NextResponse.json({msg: "Succesfully Sent"}, {status: 200});
    }
    
}
