import { getCurrentUser } from '@/app/utils/auth'
import style from './dashboard.module.css'
import { getFullName, getTitle } from '@/app/utils/userInfo';
import RecentHistory from './RecentHistory';

export default async function Dashboard(){
    const userId = await getCurrentUser();
    const fullName = await getFullName(userId);


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