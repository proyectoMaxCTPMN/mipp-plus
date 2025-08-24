import { getUserAbsencesAndJustifications } from '@/app/utils/userFetch';
import style from './soliHistory.module.css'
import SolicitudeHistory from './solicitude-history';

import { getCurrentUser } from '@/app/utils/auth';

export default async function Page(){
    const userId = await getCurrentUser();
    const allData = await getUserAbsencesAndJustifications(userId)
    return(
         <div className={style.container}>
            <div className={style.historyContainer}>
                <h1 className={style.titleText}>Historial de Solicitudes de Ausencias y Tardias</h1>
                <SolicitudeHistory allData_parameter={allData} />
            </div>
         </div>
    )
}