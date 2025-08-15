import Justification_Formulary_Page from './justification-formulary'
import { redirect } from 'next/navigation'
import { getUserAbsence_id, getUserFullName, getUserPosition, getUserProhibitedIds, getUserTitle } from '@/app/utils/userFetch';
import { getCurrentUser } from '@/app/utils/auth';

export default async function Justification_Formulary({params}){
    
    const userId = await getCurrentUser()
    const prohibitedIds = await getUserProhibitedIds(userId);
    const {id} = await params;

    if (typeof prohibitedIds.find(element => element == id) != undefined) {
        redirect('/') 
    }

    const fullName = await getUserFullName(userId)
    const position = await getUserPosition(userId)
    const title = await getUserTitle(userId)
    const absenceData = await getUserAbsence_id(userId, id)
    
    if (!absenceData ) {
       redirect('/') 
    }

    return(
        <>
        {
            (fullName && title && position) && (
                <Justification_Formulary_Page userId_parameter={userId} request_id_parameter={id} fullName_parameter={fullName} title_parameter={title} position_parameter={position} absenceData_parameter={absenceData[0]}/>
            )
        }
        </>
    )
}