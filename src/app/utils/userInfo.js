"use server"

import { cookies } from "next/headers"
import { createClient } from './supabase/server'

async function createSupabase(){
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  return supabase
}

export async function getFullName(userId) {
    const supabase = await createSupabase()

    let { data: user, error } = await supabase
    .from('users')
    .select('first_name, last_name, second_last_name')
    .eq('identification', userId)
    
    if (error) {
      console.log(JSON.stringify(data))
      console.error("No se pudo obtener el registro" + JSON.stringify(error))
      return
    }

    return user[0].first_name + " " + user[0].last_name + " " + user[0].second_last_name
}

export async function getPosition(userId) {
    const supabase = await createSupabase()

    let { data: user, error } = await supabase
    .from('users')
    .select('positions(position)')
    .eq('identification', userId)

    const position= user[0].positions.position
    
    if (error) {
      console.log(JSON.stringify(data))
      console.error("No se pudo obtener el registro" + JSON.stringify(error))
      return
    }

    return position[0]
}

export async function getAllInfo(userId) {
    const supabase = await createSupabase()

    let { data: user, error } = await supabase
    .from('users')
    .select(`
        first_name,
        last_name,
        second_last_name,
        email,
        phone,
        positions (position),
        titles (title),
        has_ownership
    `)
    .eq('identification', userId)

    const data = {
        first_name: user[0].first_name,
        last_name: user[0].last_name,
        second_last_name: user[0].second_last_name,
        email: user[0].email,
        phone: user[0].phone,
        position: user[0].positions.position,
        title: user[0].titles.title,
        has_ownership: user[0].has_ownership
    }
    
    if (error) {
      console.log(JSON.stringify(data))
      console.error("No se pudo obtener el registro" + JSON.stringify(error))
      return
    }

    return data
}

export async function getTitle(userId) {
    const supabase = await createSupabase()

    let { data: user, error } = await supabase
    .from('users')
    .select(`
        title,
        titles (title)
    `)
    .eq('identification', userId)

    if (error) {
      console.error("No se pudo obtener el registro" + JSON.stringify(error))
      return
    }

    const data = {
        title_id: user[0].title,
        title: user[0].titles.title,
    }
    

    return data
}
