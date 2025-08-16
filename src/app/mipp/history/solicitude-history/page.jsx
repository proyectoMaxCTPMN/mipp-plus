import style from './soliHistory.module.css'
import SolicitudeHistory from './solicitude-history';
import { getUserAbsence, getUserJustifiedRequestsId } from '@/app/utils/userFetch';
import { getCurrentUser } from '@/app/utils/auth';

export default async function Page(){
    const userId = await getCurrentUser();
    const userAbsence = await getUserAbsence(userId)
    const justifiedRequests = await getUserJustifiedRequestsId(userId);
    return(
         <div className={style.container}>
            <div className={style.historyContainer}>
                <h1 className={style.titleText}>Historial de Solicitudes de Ausencias y Tardias</h1>
                <SolicitudeHistory userAbsence_parameter={userAbsence} justifiedRequests_parameter={justifiedRequests}/>
            </div>
         </div>
    )
}