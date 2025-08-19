
import { createClient } from '../../utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';


export async function POST(request) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const formData = await request.formData();
    
    const evidence_file = formData.get('evidence_file')

    const userId = formData.get('userId')
    const report_place = formData.get('report_place')
    const report_building = formData.get('report_building')
    const report_floor = formData.get('report_floor')
    const report_classroom = formData.get('report_classroom')
    const report_detail = formData.get('report_detail')

    let evidence_file_path = null;
    let evidence_file_url = null;
    if (typeof evidence_file != null && evidence_file != null && typeof evidence_file == 'object') {
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

        const { data, error } = await supabase.storage.from('evidences').upload(`${userId}/reportes_infra/${Date.now()}_${evidence_file.name}`, evidence_file)

        if (error) {
            console.error(JSON.stringify(error))
        }
        
        const { data: { publicUrl } } = supabase.storage.from('evidences').getPublicUrl(data.path)    

        evidence_file_path = data.path
        evidence_file_url = publicUrl + "?download"

    }
    

    const toSend = { 
        user_id: userId,
        report_place,
        report_building,
        report_floor,
        report_classroom,
        report_detail,
        attachment_url: evidence_file_url,
    }

    console.log(toSend)

    const { data, error } = await supabase
    .from('infraestructure_reports')
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

