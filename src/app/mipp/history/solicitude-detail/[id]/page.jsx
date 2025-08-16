import { getCurrentUser } from "@/app/utils/auth";
import Solicitude_Detail from "./solicitude-detail";
import { getUserFullName} from "@/app/utils/userFetch";
import { getAbsenceById } from "@/app/utils/allFetch";



export default async function Page({params}){
    const absenceid = params.id;
    const userId = await getCurrentUser();
    const fullName = await getUserFullName(userId)
    const absencef = await getAbsenceById(absenceid)
    return(
        <Solicitude_Detail fullName_parameter={fullName} absencef_parameter={absencef}/>
    )
}
