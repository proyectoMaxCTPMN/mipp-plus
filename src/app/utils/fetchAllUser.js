"use server"

import { cookies } from "next/headers"
import { createClient } from './supabase/server'

async function createSupabase(){
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  return supabase
}

export async function getAllDocumentsUser(userId) {
    const supabase = await createSupabase()

    let { data: absences, error_absences } = await supabase
    .from('absence_requests')
    .select('')
    .eq('user_id', userId)

    if (error_absences) {
      console.error("No se pudo obtener el registro de ausencias" + JSON.stringify(error))
      return
    }

    let { data: infra, error_infra } = await supabase
    .from('infraestructure_reports')
    .select('')
    .eq('user_id', userId)

    if (error_infra) {
      console.error("No se pudo obtener el registro de reportes de infra" + JSON.stringify(error))
      return
    }

    let { data: justi, error_justi } = await supabase
    .from('justifications')
    .select('user_id', userId)

    if (error_justi) {
      console.error("No se pudo obtener el registro de justificaciones" + JSON.stringify(error))
      return
    }

    let { data: omissions, error_omission } = await supabase
    .from('justifications')
    .select('')
    .eq('user_id', userId)

    if (error_omission) {
      console.error("No se pudo obtener el registro de omisiones de marca" + JSON.stringify(error))
      return
    }

    return {infra, absences, justi, omissions}
}