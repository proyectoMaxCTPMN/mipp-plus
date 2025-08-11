import style from './soliHistory.module.css'
import ManageDashboard from './manage-dashboard';
import { getAllDocuments } from '@/app/utils/dataInfo';

export default async function Page(){
    const allDocs = await getAllDocuments()
    return(
         <div className={style.container}>
            <div className={style.historyContainer}>
                <h1 className={style.titleText}>Todos los documentos</h1>
                <ManageDashboard allDocs_parameter={allDocs}/>
            </div>
         </div>
    )
}