import { getAbsenceById, updateRevised } from '@/app/utils/allFetch';
import Permission_Formulary_Page from './permission-formulary'
import { getCurrentUser } from '@/app/utils/auth'
import { getUserInfo, getUserPosition, getUserRoles, getUserTitle } from '@/app/utils/userFetch'

export default async function Page({params}){
    const paramsStore = await params;
    const request_id = paramsStore.id;
    const absencef = await getAbsenceById(request_id);
    const userId = await getCurrentUser()
    const userInfo = await getUserInfo(absencef[0].user_id);
    const title = await getUserPosition(userId)
    const position = await getUserTitle(userId)
    const roles = await getUserRoles(userId);
    
    
    return(
        <>
        {
            (userInfo && title && position) && (
                <Permission_Formulary_Page userInfo_parameter={userInfo} title_parameter={title} position_parameter={position} absencef_parameter={absencef} userRoles={roles}/>
            )
        }
        </>
    )
}