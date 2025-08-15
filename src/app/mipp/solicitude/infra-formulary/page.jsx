import Infra_Formulary_Page from './infra-formulary'
import { getCurrentUser } from '@/app/utils/auth'
import { getUserFullName } from '@/app/utils/userFetch'

export default async function Infra_Formulary(){
    const userId = await getCurrentUser()
    const fullName = await getUserFullName(userId)
    return(
        <>
        {
            fullName && (
                <Infra_Formulary_Page fullName_parameter={fullName} userId_parameter={userId}/>
            )
        }
        </>
    )
}