import Justification_Formulary_Page from './justification-formulary'
import { getCurrentUser } from '@/app/utils/auth'
import { getProhibitedIds, getUserAbsence_id } from '@/app/utils/fetchAbsence'
import { getFullName, getPosition, getTitle} from '@/app/utils/userInfo'
import { redirect } from 'next/navigation'

export default async function Justification_Formulary({params}){
    
    const userId = await getCurrentUser()
    const prohibitedIds = await getProhibitedIds(userId);
    const {id} = await params;

    if (typeof prohibitedIds.find(element => element == id) != undefined) {
        redirect('/') 
    }

    
    
    const fullName = await getFullName(userId)
    const position = await getPosition(userId)
    const title = await getTitle(userId)
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