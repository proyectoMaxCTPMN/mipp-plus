import { getUserFullName, getUserPosition, getUserTitle } from "@/app/utils/userFetch";
import Omission_Formulary_Detail_Page from "./omission-detail";
import { getCurrentUser } from '@/app/utils/auth'
import { getUserOmission } from "@/app/utils/allFetch";

export default async function Omission_Detail({params}){
    const paramsStore = await params;
    const omissionid = paramsStore.id;
    const userId = await getCurrentUser()
    const fullName = await getUserFullName(userId)
    const position = await getUserPosition(userId)
    const title = await getUserTitle(userId)
    const omissionf = await getUserOmission(omissionid)
    console.log(omissionf)
    return(
        <Omission_Formulary_Detail_Page omissionf_parameter={omissionf}/>
    )
}