
import Omission_Formulary_Page from './omission-formulary'
import { getUserFullName} from '@/app/utils/userFetch'
import { getCurrentUser } from '@/app/utils/auth'


export default async function Omission_Formulary(){
    const userId = await getCurrentUser()
    const fullName = await getUserFullName(userId)

    return(
        <>
        {
            fullName && (
                <Omission_Formulary_Page fullName_parameter={fullName} userId_parameter={userId}/>
            )
        }
        </>
    )
}