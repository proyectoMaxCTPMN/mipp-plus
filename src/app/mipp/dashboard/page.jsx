import { getCurrentUser } from '@/app/utils/auth'
import style from './dashboard.module.css'
import RecentHistory from './RecentHistory';
import { getUserAllDocuments, getUserFullName } from '@/app/utils/userFetch';

export default async function Dashboard(){
    const userId = await getCurrentUser();
    const fullName = await getUserFullName(userId);
    const AllDocuments = await getUserAllDocuments(userId)

    return(
         <div className={style.container}>
            <div className={style.dashboardContainer}>
                <RecentHistory AllDocuments_parameter={AllDocuments}/>
            </div>
         </div>
    )
}