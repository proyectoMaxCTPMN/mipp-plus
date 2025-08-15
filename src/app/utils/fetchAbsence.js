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

export async function getUserAbsence_soli(userId) {
    const supabase = await createSupabase()

    const linkedResponse = await supabase
    .from('justi_and_req')
    .select()
    .eq('user_id', userId)

    let prohibited_ids = [];
    linkedResponse.data.map(row => prohibited_ids.push(row.request_id))

    let absenceResponse = await supabase
    .from('absence_requests')
    .select('id, absence_date, reason')
    .eq('user_id', userId)
    .eq('is_approved', true)
    .eq('is_expired', false)
    .not("id", "in", "(" + prohibited_ids + ")")

    if (absenceResponse.error) {
      console.error("No se pudo obtener el registro" + JSON.stringify(absenceResponse.error))
      return
    }

    return absenceResponse.data
}

export async function getProhibitedIds(userId) {
    const supabase = await createSupabase()

    const linkedResponse = await supabase
    .from('justi_and_req')
    .select()
    .eq('user_id', userId)

    let prohibited_ids = [];
    linkedResponse.data.map(row => prohibited_ids.push(row.request_id))


    return prohibited_ids
}


export async function getUserAbsence_id(userId, id) {
    const supabase = await createSupabase()

    let { data: data, error } = await supabase
    .from('absence_requests')
    .select('')
    .eq('user_id', userId)
    .eq('is_approved', true)
    .eq('is_expired', false)
    .eq('id', id)

    if (error) {
      console.error("No se pudo obtener el registro" + JSON.stringify(error))
      return
    }

    return data
}
