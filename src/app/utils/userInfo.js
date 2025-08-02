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
    .eq('id', userId)
    
    if (error) {
      console.log(JSON.stringify(data))
      console.error("No se pudo obtener el registro" + JSON.stringify(error))
      return
    }

    const data = {
      first_name: user[0].first_name, 
      last_name: user[0].last_name,
      second_last_name: user[0].second_last_name,
      full_name: user[0].first_name + " " + user[0].last_name + " " + user[0].second_last_name
    }

    return data
}

export async function getPosition(userId) {
    const supabase = await createSupabase()

    let { data: user, error } = await supabase
    .from('users')
    .select('positions(position)')
    .eq('id', userId)

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
        position,
        titles (title),
        title,
        has_ownership
    `)
    .eq('id', userId)

      if (error) {
      console.error("No se pudo obtener el registro" + JSON.stringify(error))
      return
    }
    const data = {
        first_name: user[0].first_name,
        last_name: user[0].last_name,
        second_last_name: user[0].second_last_name,
        email: user[0].email,
        phone: user[0].phone,
        position: user[0].positions.position,
        position_id: user[0].position,
        title: user[0].titles.title,
        title_id:user[0].title,
        has_ownership: user[0].has_ownership,
        paid_in_lessons: user[0].positions.paid_in_lessons
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
    .eq('id', userId)

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

export async function getSystemColor(userId) {
    const supabase = await createSupabase()

    let { data: user, error } = await supabase
    .from('users')
    .select(`
        system_color
    `)
    .eq('id', userId)

    if (error) {
      console.error("No se pudo obtener el registro" + JSON.stringify(error))
      return
    }

    return user[0].system_color
}
