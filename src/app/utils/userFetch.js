"use server"

import { cookies } from "next/headers"
import { createClient } from './supabase/server'

async function createSupabase(){
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  return supabase
}

export async function getUserFullName(userId) {
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

export async function getUserPosition(userId) {
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

export async function getUserAllInfo(userId) {
    const supabase = await createSupabase()

    let { data: user, error } = await supabase
    .from('users')
    .select(`
        first_name,
        last_name,
        second_last_name,
        email,
        phone,
        positions (position, paid_in_lessons),
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

export async function getUserTitle(userId) {
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

export async function getUserSystemColor(userId) {
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

export async function getUserAllDocuments(userId) {
    const supabase = await createSupabase()

    let { data: absences, error_absences } = await supabase
    .from('absence_requests')
    .select('*,justifications!absence_requests_justification_id_fkey(justification_response_state)')
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
    .select('')
    .eq('user_id', userId)
    .filter('request_id', 'is', null)

    if (error_justi) {
      console.error("No se pudo obtener el registro de justificaciones" + JSON.stringify(error))
      return
    }

    let { data: omissions, error_omission } = await supabase
    .from('mark_omissions')
    .select('')
    .eq('user_id', userId)

    if (error_omission) {
      console.error("No se pudo obtener el registro de omisiones de marca" + JSON.stringify(error))
      return

    }
    return {infra, absences, justi, omissions}
}

export async function getUserAbsence(userId) {
    const supabase = await createSupabase()

    let { data: data, error } = await supabase
    .from('absence_requests')
    .select('*, justifications!absence_requests_justification_id_fkey(justification_response_state)')
    .eq('user_id', userId)

    if (error) {
      console.error("No se pudo obtener el registro" + JSON.stringify(error))
      return
    }

    return data
}

export async function getUserAbsence_soli(userId) {
    const supabase = await createSupabase()

    let absenceResponse = await supabase
    .from('absence_requests')
    .select('id, absence_date, reason')
    .eq('user_id', userId)
    .eq('is_approved', true)
    .eq('is_expired', false)
    .filter("justification_id", "is", null)

    if (absenceResponse.error) {
      console.error("No se pudo obtener el registro" + JSON.stringify(absenceResponse.error))
      return
    }

    return absenceResponse.data
}

export async function getUserJustifiedRequestsId(userId) {
    const supabase = await createSupabase()

    const linkedResponse = await supabase
    .from('absence_requests')
    .select('id')
    .eq('user_id', userId)
    .not('justification_id', 'is', null)


    if (linkedResponse.error) {
      console.log(linkedResponse.error)
    }
    
    let prohibited_ids = [];
    linkedResponse.data.map(row => prohibited_ids.push(row.id))
    console.log(prohibited_ids)

    return prohibited_ids
}

export async function getUserJustifications_noRequest(userId) {
    const supabase = await createSupabase()

    const justifications = await supabase
    .from('justifications')
    .select('')
    .filter('request_id', 'is', null)


    if (justifications.error) {
      console.log(justifications.error)
    }

  

    return justifications.data
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

export async function getUserJustification_id(userId, id) {
    const supabase = await createSupabase()

    let { data: data, error } = await supabase
    .from('justifications')
    .select('')
    .eq('user_id', userId)
    .eq('id', id)

    if (error) {
      console.error("No se pudo obtener el registro" + JSON.stringify(error))
      return
    }

    return data
}

export async function getUserRoles(userId) {
  const supabase = await createSupabase()

  const { data, error } = await supabase
  .from('roles')
  .select("basic_user, read_documents, manage_documents, manage_read_reports, create_users, root")
  .eq("user_id", userId)

  if (error) {
    console.error("Error fetching roles:", error)
    return null
  }
  
  const roles = data[0]

  return roles
}

export async function getUserInfo(userId) {
  const supabase = await createSupabase()

  const { data, error } = await supabase
  .from('users')
  .select("id, first_name, last_name, second_last_name, has_ownership, positions(position)")
  .eq("id", userId)

  if (error) {
    console.error("Error fetching info:", error)
    return null
  }
  
  

  return data[0]
}

export async function getUserJustify_request_id(id) {
    const supabase = await createSupabase()


    let { data: data, error } = await supabase
    .from('justifications')
    .select('')
    .eq('request_id', id)


    if (error) {
      console.error("No se pudo obtener el registro" + JSON.stringify(error))
      return
    }

    return data
}

export async function getUserAbsencesAndJustifications(userId){
  const supabase = await createSupabase();

    // Helper function to handle queries
    const fetchData = async (table, select, label, type) => {
      if (type == 'justi') {
        let { data, error } = await supabase.from(table).select(select).eq('user_id', userId).filter('request_id', 'is', 'null');
        if (error) {
          console.error(`No se pudo obtener el registro de ${type}:`, error);
          return [];
        }

        const response = data.map((item, index) => ({
          type,
          label,
          data: item,
          date: item?.absence_date,
          created_at: item.created_at,
          reason: item?.reason || item?.justification_reason,
          is_expired: item.is_expired != null ? item.is_expired : null,
          justi_state: 
          item?.justifications?.justification_response_state != null ? item.justifications.justification_response_state : item?.justification_response_state != null ? item.justification_response_state : item.expire_date
        }));


        // Map to unified format
        return response
      } else {
        let { data, error } = await supabase.from(table).select(select).eq('user_id', userId)
        if (error) {
          console.error(`No se pudo obtener el registro de ${type}:`, error);
          return [];
        }

        const response = data.map((item, index) => ({
          type,
          label,
          data: item,
          date: item?.absence_date,
          created_at: item.created_at,
          reason: item?.reason || item?.justification_reason,
          is_expired: item.is_expired != null ? item.is_expired : null,
          justi_state: 
          item?.justifications?.justification_response_state != null ? item.justifications.justification_response_state : item?.justification_response_state != null ? item.justification_response_state : item.expire_date
        }));


        // Map to unified format
        return response
      }

    };

    // Fetch all data
    const absences = await fetchData(
      "absence_requests",
      "id, absence_date, is_pending, is_denied, is_approved, is_justified, reason, expire_date, is_expired, justifications!absence_requests_justification_id_fkey(justification_response_state), justification_id",
      "Solicitud de Aus/Tar/Sal",
      "absence"
    );

    const justifications = await fetchData(
      "justifications",
      "id, absence_date, request_id, justification_response_state, justification_reason",
      "Justificacion de Aus/Tar",
      "justi"
    );

    // Merge everything
    const unifiedData = [
      ...absences,
      ...justifications,
    ];

    console.log("Unified Data:", unifiedData);

    return unifiedData;
}