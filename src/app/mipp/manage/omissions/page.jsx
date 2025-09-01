
import style from './soliHistory.module.css'
import SolicitudeHistory from './solicitude-history';
import { getAllOmissions } from '@/app/utils/allFetch';

export default async function Page(){
    const omissions = await getAllOmissions()
    return(
         <div className={style.container}>
            <div className={style.historyContainer}>
                <h1 className={style.titleText}>Historial de Omisiones de Marca</h1>
                <SolicitudeHistory Omissions_parameter={omissions} />
            </div>
         </div>
    )
}