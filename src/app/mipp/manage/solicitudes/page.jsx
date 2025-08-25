import { getAllAbsence, getAllJustification } from "@/app/utils/allFetch";
import SolicitudesHistory from "./solicitudes";
import style from './solicitudes.module.css'

export default async function Page(){
    const absencesf = await getAllAbsence()
    const justificationsf = await getAllJustification()
    console.log(justificationsf)
    return(
        <div className={style.container}>
            <div className={style.historyContainer}>
                <h1 className={style.titleText}>Historial solicitudes/justificaciones de Ausencias -Tardías - Salida - Incapacidad</h1>
                <SolicitudesHistory absencesf_parameter = {absencesf} justificationsf_parameter={justificationsf}/>
            </div>
        </div>
    )
}