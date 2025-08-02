import { getAllInfo} from '@/app/utils/userInfo'
import style from './account.module.css'
import Accountpage from './accountmodule'
import { getCurrentUser } from '@/app/utils/auth'

export default async function Acccount(){
    const userId = await getCurrentUser()
    const allInfo = await getAllInfo(userId)
    return(
        <>
        <Accountpage userId_parameter = {userId} allInfo_parameter={allInfo}/>
        </>
    )
}