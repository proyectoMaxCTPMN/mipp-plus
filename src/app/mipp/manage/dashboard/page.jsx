import style from './manage-dashboard.module.css'
import ManageDashboard from './manage-dashboard';
import { getPreviewData } from '@/app/utils/allFetch';

import { revalidatePath } from 'next/cache'


export default async function Page(){
    const allDocs = await getPreviewData()

    return(

        <div className={style.container}>
            <div className={style.historyContainer}>
                <h1 className={style.titleText}>Todos los documentos</h1>
                <ManageDashboard allDocs_parameter={allDocs}/>
            </div>
        </div>

    )
}