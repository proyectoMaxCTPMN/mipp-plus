import { getCurrentUser } from "@/app/utils/auth";
import Solicitude_Detail from "./solicitude-detail";
import {getUserAbsence_id, getUserFullName} from "@/app/utils/userFetch";



export default async function Page({params}){
    const absenceid = params.id;
    const userId = await getCurrentUser();
    const fullName = await getUserFullName(userId)
    const absencef = await getUserAbsence_id(absenceid)
    return(
        <Solicitude_Detail fullName_parameter={fullName}/>
    )
}
