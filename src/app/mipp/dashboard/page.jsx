import { getCurrentUser } from '@/app/utils/auth'
import style from './dashboard.module.css'
import RecentHistory from './RecentHistory';
import { getUserFullName } from '@/app/utils/userFetch';

export default async function Dashboard(){
    const userId = await getCurrentUser();
    const fullName = await getUserFullName(userId);


    return(
         <div className={style.container}>
            <div className={style.dashboardContainer}>
                <h1>Inicio</h1>
                <h1>Bienvenid@ {fullName.full_name}</h1>
                <RecentHistory />
            </div>
         </div>
    )
}