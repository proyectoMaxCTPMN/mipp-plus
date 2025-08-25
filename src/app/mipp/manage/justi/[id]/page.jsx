import Justification_Formulary_Page from './justification-formulary'
import {  getUserPosition, getUserTitle, getUserInfo, getUserRoles } from '@/app/utils/userFetch';
import { getCurrentUser } from '@/app/utils/auth';
import { getJustiById } from '@/app/utils/allFetch';


export default async function Justification_Formulary({params}){

    const paramsStore = await params;
    const request_id = paramsStore.id;
    const justif = await getJustiById(request_id);
    const userId = await getCurrentUser()
    const userInfo = await getUserInfo(justif[0].user_id);
    const title = await getUserPosition(userId)
    const position = await getUserTitle(userId)
    const roles = await getUserRoles(userId);
    
    console.log(justif[0])

    return(
        <>
        {
            (justif && title && position) && (
                <Justification_Formulary_Page userId_parameter={userId} justif_parameter={justif[0]} userInfo_parameter={userInfo} title_parameter={title} position_parameter={position} userRoles={roles}/>
            )
        }
        </>
    )
}