import { redirect } from "next/navigation";
import LoadingSkeleton from "../mipp/components/LoadingSkeleton";
import { getIsPswChange } from "../utils/auth";
import { getPositions, getTitles } from "../utils/dataInfo";
import NewUser from "./new_user";


export default async function Page({searchParams}) {
    const positionsInfo = await getPositions();
    const titlesInfo = await getTitles();
    const searchParamsData = await searchParams;
    const userId_parameter = searchParamsData.id;
    const user_ispswchange = await getIsPswChange(userId_parameter)

    if (!user_ispswchange) {
        redirect('/');
    }

    if (!positionsInfo || !titlesInfo) {
        return <LoadingSkeleton />
        
    }

    return(
        <NewUser positionsInfo_parameter={positionsInfo} titlesInfo_parameter={titlesInfo} />
    )
}