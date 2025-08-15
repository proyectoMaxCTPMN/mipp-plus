'use client'

import { useState } from 'react'
import style from './justi-menu.module.css'
import { useRouter } from 'next/navigation'

const reasons = ["", "Cita médica", "Convocatoria Asamblea", "Asuntos Personales"]

export default function JustiMenu({soli_data}){
    const router = useRouter()
    const [soliSel, setSoliSel] = useState('')

    const handleRedirect = (url) => {
        router.push(`/mipp/solicitude/justification-formulary/${url}`)
    }

    return(
        <div className={style.container}>
            <div className={style.justiContainer}>
                <h1 className={style.justiTitle}>Nueva Justificacin de Permiso de Salida</h1>
                <label htmlFor="soli_select" className={style.justiLabel}>Seleccione la Solicitud de Permiso de Salida (Fecha de la ausencia)</label>
                <select name="soli_select" id="soli_select" className={style.justiSelect} value={soliSel} onChange={(e) => setSoliSel(e.target.value)}>
                    <option value=''>Seleccione una opcion</option>
                    {
                        soli_data && soli_data.map((soli) => (
                            <option key={soli.id} value={soli.id}>{new Date(soli.absence_date).toLocaleDateString()} - {reasons[soli.reason]}</option>
                        ))
                    }
                </select>
                <input type="button" className={style.justiBtn} value={'Crear nueva justificación'} onClick={() => handleRedirect(soliSel)}/>
            </div>

            <div className={style.newContainer} onClick={() => handleRedirect("new")}>
                Nueva Justificación sin Solicitud Previa
            </div>
        </div>
    )

}