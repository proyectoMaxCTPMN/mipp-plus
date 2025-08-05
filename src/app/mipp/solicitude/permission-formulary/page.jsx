import Permission_Formulary_Page from './permission-formulary'
import { getCurrentUser } from '@/app/utils/auth'
import { getFullName, getPosition, getTitle } from '@/app/utils/userInfo'


export default async function Permission_Formulary(){
    const userId = await getCurrentUser()
    const fullName = await getFullName(userId)
    const title = await getTitle(userId)
    const position = await getPosition(userId)
    return(
        <>
        {
            (fullName && title && position) && (
                <Permission_Formulary_Page fullName_parameter={fullName} title_parameter={title} position_parameter={position}/>
            )
        }
        </>
    )
}