import { getCurrentUser } from "@/app/utils/auth";
import Solicitude_Detail from "./solicitude-detail";
import { getUserFullName, getUserPosition, getUserTitle} from "@/app/utils/userFetch";
import { getAbsenceById } from "@/app/utils/allFetch";



export default async function Page({params}){
    const paramsStore = await params;
    const absenceid = paramsStore.id;
    const userId = await getCurrentUser();
    const fullName = await getUserFullName(userId)
    const absencef = await getAbsenceById(absenceid)
    const title = await getUserPosition(userId)
    const position = await getUserTitle(userId)
    console.log(absencef)
    return(
        <Solicitude_Detail fullName_parameter={fullName} absencef_parameter={absencef[0]} title_parameter={title} position_parameter={position}/>
    )
}
