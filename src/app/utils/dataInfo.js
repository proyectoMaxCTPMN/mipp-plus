"use server"

import { cookies } from "next/headers"
import { createClient } from './supabase/server'

async function createSupabase(){
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  return supabase
}

export async function getPositions() {
    const supabase = await createSupabase()

    let { data: data, error } = await supabase
    .from('positions')
    .select('')

    if (error) {
      console.error("No se pudo obtener el registro" + JSON.stringify(error))
      return
    }

    return data
}

export async function getTitles() {
    const supabase = await createSupabase()

    let { data: data, error } = await supabase
    .from('titles')
    .select('')

    if (error) {
      console.error("No se pudo obtener el registro" + JSON.stringify(error))
      return
    }

    return data
}
