import style from './soliHistory.module.css'
import SolicitudeHistory from './solicitude-history';

import { getCurrentUser } from '@/app/utils/auth';
import { getAllInfra } from '@/app/utils/allFetch';

export default async function Page(){
    const userId = await getCurrentUser();
    const reports = await getAllInfra()
    return(
         <div className={style.container}>
            <div className={style.historyContainer}>
                <h1 className={style.titleText}>Historial de Reportes de Infraestructura</h1>
                <SolicitudeHistory Reports_parameter={reports} />
            </div>
         </div>
    )
}