import Justification_Formulary_Page from './justification-formulary'
import { getCurrentUser } from '@/app/utils/auth'
import { getFullName, getPosition, getTitle} from '@/app/utils/userInfo'

export default async function Justification_Formulary(){
    const userId = await getCurrentUser()
    const fullName = await getFullName(userId)
    const position = await getPosition(userId)
    const title = await getTitle(userId)

    return(
        <>
        {
            (fullName && title && position) && (
                <Justification_Formulary_Page fullName_parameter={fullName} title_parameter={title} position_parameter={position}/>
            )
        }
        </>
    )
}