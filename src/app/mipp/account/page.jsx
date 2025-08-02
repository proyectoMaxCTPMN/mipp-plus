import { getAllInfo, getPosition} from '@/app/utils/userInfo'
import style from './account.module.css'
import Accountpage from './accountmodule'
import { getCurrentUser } from '@/app/utils/auth'
import { getPositions, getTitles } from '@/app/utils/dataInfo'

export default async function Acccount(){
    const userId = await getCurrentUser()
    const allInfo = await getAllInfo(userId)
    const positionsInfo = await getPositions();
    const titlesInfo = await getTitles();

    return(
        <>
        <Accountpage userId_parameter = {userId} allInfo_parameter={allInfo} positions_parameter={positionsInfo} titles_parameter={titlesInfo}/>
        </>
    )
}