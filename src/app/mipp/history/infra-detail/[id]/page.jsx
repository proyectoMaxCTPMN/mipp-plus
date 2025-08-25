import { getUserFullName, getUserPosition, getUserTitle } from "@/app/utils/userFetch";
import Infrastructure_Formulary_Detail_Page from "./infra-detail";
import { getCurrentUser } from '@/app/utils/auth'
import { getUserReport } from "@/app/utils/allFetch";

export default async function Infrastructure_Formulary_Detail({params}){
    const paramsStore = await params;
    const infraid = paramsStore.id;
    const userId = await getCurrentUser()
    const fullName = await getUserFullName(userId)
    const position = await getUserPosition(userId)
    const title = await getUserTitle(userId)
    const infraf = await getUserReport(infraid)
    return(
        <Infrastructure_Formulary_Detail_Page infraf_parameter = {infraf[0]} fullName_parameter={fullName} position_parameter={position} title_parameter={title}/>
    )
}