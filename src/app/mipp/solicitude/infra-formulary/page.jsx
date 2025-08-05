import { getCurrentUser } from '@/app/utils/auth'
import { getFullName, getPosition, getTitle} from '@/app/utils/userInfo'
import Infra_Formulary_Page from './infra-formulary'

export default async function Infra_Formulary(){
    const userId = await getCurrentUser()
    const fullName = await getFullName(userId)
    const position = await getPosition(userId)
    const title = await getTitle(userId)

    return(
        <>
        {
            fullName && (
                <Infra_Formulary_Page fullName_parameter={fullName}/>
            )
        }
        </>
    )
}