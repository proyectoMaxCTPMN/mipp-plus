

import { getCurrentUser } from '@/app/utils/auth'
import Accountpage from './accountmodule'
import { getUserAllInfo } from '@/app/utils/userFetch'
import { getPositions, getTitles } from '@/app/utils/allFetch'

export default async function Acccount(){
    const userId = await getCurrentUser()
    const allInfo = await getUserAllInfo(userId)
    const positionsInfo = await getPositions();
    const titlesInfo = await getTitles();

    return(
        <>
        <Accountpage userId_parameter = {userId} allInfo_parameter={allInfo} positions_parameter={positionsInfo} titles_parameter={titlesInfo}/>
        </>
    )
}