import style from './omissions.module.css'
import OmissionsHistory from './omissions'
import { getAllOmission } from '@/app/utils/allFetch'

export default async function Page(){
    const omissionsf = await getAllOmission()
    console.log(omissionsf)
    return(
        <div className={style.container}>
            <div className={style.historyContainer}>
                <h1 className={style.titleText}>Historial de Justificaciones de Omisión de Marca</h1>
                <OmissionsHistory omissionsf_parameter = {omissionsf}/>
            </div>
        </div>
    )
}