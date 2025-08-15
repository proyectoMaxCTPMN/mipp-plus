import Permission_Formulary_Page from './permission-formulary'
import { getCurrentUser } from '@/app/utils/auth'
import { getUserFullName, getUserPosition, getUserTitle } from '@/app/utils/userFetch'


export default async function Permission_Formulary(){
    const userId = await getCurrentUser()
    const fullName = await getUserFullName(userId)
    const title = await getUserPosition(userId)
    const position = await getUserTitle(userId)
    return(
        <>
        {
            (fullName && title && position) && (
                <Permission_Formulary_Page userId_parameter={userId} fullName_parameter={fullName} title_parameter={title} position_parameter={position}/>
            )
        }
        </>
    )
}