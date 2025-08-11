"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from './supabase/server'

async function createSupabase(){
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  return supabase
}

export async function createSession(userId, is_remember, system_color) {
    const supabase = await createSupabase()
    const sessionId = `session_${Date.now()}`

    let expiresAt;
    if (is_remember) {
      expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 año
    } else {
      expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 horas
    }

    

    const { data, error } = await supabase
        .from('sessions')
        .insert([
            {id: sessionId, user_id: userId, expires_at: expiresAt},
        ])
        .select()
    
    if (error) {
      console.log(JSON.stringify(data))
      console.error("No se pudo crear el registro" + JSON.stringify(error))
      return
    }

    const cookieStore = await cookies()
    cookieStore.set("session_id", sessionId, {
        httpOnly: true, // Importante: no accesible desde JavaScript del cliente
        secure: false,
        sameSite: "strict",
        expires: expiresAt,
    })

    cookieStore.set("system_color", system_color, {
        httpOnly: false, // Importante: no accesible desde JavaScript del cliente
        secure: false,
        sameSite: "strict",
        expires: expiresAt,
    })

    return sessionId
}

export async function getCurrentUser() {
  const supabase = await createSupabase()
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("session_id")?.value

  let { data: session, error } = await supabase
  .from('sessions')
  .select('')
  .eq('id', sessionId)


  if (!sessionId || !session[0]) {
    console.log("no session")
    return null
  }

  
  if (session[0].expires_at < new Date()) {
    const { error } = await supabase
    .from('sessions')
    .delete()
    .eq('id', sessionId)
    return null
  }

  return session[0].user_id || null
}

export async function requireAuth() {
  const user = await getCurrentUser()
  return user
}


export async function getRoles(user) {
  const supabase = await createSupabase()

  const { data, error } = await supabase
  .from('roles')
  .select("basic_user, read_documents, manage_documents, manage_read_reports, create_users, root")
  .eq("user_id", user)

  if (error) {
    console.error("Error fetching roles:", error)
    return null
  }
  
  const roles = data[0]

  return roles
}

export async function getIsPswChange(user) {
  const supabase = await createSupabase()

  const { data, error } = await supabase
  .from('users')
  .select("is_pswchange")
  .eq("id", user)

  if (error) {
    console.error("Error fetching psw change:", error)
    return null
  }

  return data[0]?.is_pswchange
}


/*
export async function hasPermission(permission) {
  const user = await getCurrentUser()
  return user?.permissions.includes(permission) || false
}
*/

export async function logout() {
  const supabase = await createSupabase()
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("session_id")?.value

  if (sessionId) {
    const { error } = await supabase
    .from('sessions')
    .delete()
    .eq('id', sessionId)

    console.error(error)
  }

  cookieStore.delete("session_id")
  cookieStore.delete("system_color")
  redirect("/login")
}
