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

export async function getPreviewData() {
    const supabase = await createSupabase();

    // Helper function to handle queries
    const fetchData = async (table, select, label, type) => {
      let { data, error } = await supabase.from(table).select(select);

      if (error) {
        console.error(`No se pudo obtener el registro de ${type}:`, error);
        return [];
      }

      // Map to unified format
      return data.map((item, index) => ({
        type,
        label,
        data: item,
        date: item?.request_date || item?.report_date || item?.justification_date || item?.omission_date
      }));
    };

    // Fetch all data
    const absences = await fetchData(
      "absence_requests",
      "id, request_date, is_pending, is_denied, is_approved, is_justified, user_id(id, first_name, last_name)",
      "Solicitud de Aus/Tar/Sal",
      "absence"
    );

    const infra = await fetchData(
      "infraestructure_reports",
      "id, report_date, report_place, is_revised, user_id(id, first_name, last_name)",
      "Reporte de Infraestructura",
      "infra"
    );

    const justifications = await fetchData(
      "justifications",
      "id, justification_date, has_response, justification_response_state, user_id(id, first_name, last_name)",
      "Justificacion de Aus/Tar",
      "justi"
    );

    const omissions = await fetchData(
      "mark_omissions",
      "id, omission_date, user_id(id, first_name, last_name), is_revised",
      "Omision de Marca",
      "omission"
    );

    // Merge everything
    const unifiedData = [
      ...absences,
      ...infra,
      ...justifications,
      ...omissions
    ];

    return unifiedData;

}