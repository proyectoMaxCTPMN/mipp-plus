import Omission_Formulary_Page from './omission-formulary'
import { getCurrentUser } from '@/app/utils/auth'
import { getFullName, getPosition, getTitle} from '@/app/utils/userInfo'

export default async function Omission_Formulary(){
    const userId = await getCurrentUser()
    const fullName = await getFullName(userId)
    const position = await getPosition(userId)
    const title = await getTitle(userId)

    return(
        <>
        {
            fullName && (
                <Omission_Formulary_Page fullName_parameter={fullName}/>
            )
        }
        </>
    )
}