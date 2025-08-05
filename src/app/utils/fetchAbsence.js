"use server"

import { cookies } from "next/headers"
import { createClient } from './supabase/server'

async function createSupabase(){
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  return supabase
}

export async function getAllAbsence() {
    const supabase = await createSupabase()

    let { data: data, error } = await supabase
    .from('absence_requests')
    .select('')

    if (error) {
      console.error("No se pudo obtener el registro" + JSON.stringify(error))
      return
    }

    return data
}

export async function getUserAbsence(userId) {
    const supabase = await createSupabase()

    let { data: data, error } = await supabase
    .from('absence_requests')
    .select('')
    .eq('user_id', userId)

    if (error) {
      console.error("No se pudo obtener el registro" + JSON.stringify(error))
      return
    }

    return data
}
