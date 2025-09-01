import { getUserFullName, getUserPosition, getUserTitle } from "@/app/utils/userFetch";
import Infrastructure_Formulary_Detail_Page from "./infra-detail";
import { getCurrentUser } from '@/app/utils/auth'
import { getUserReport } from "@/app/utils/allFetch";

export default async function Infrastructure_Formulary_Detail({params}){
    const paramsStore = await params;
    const infraid = paramsStore.id;

    const infraf = await getUserReport(infraid)
    const fullName = await getUserFullName(infraf[0].user_id)
    const position = await getUserPosition(infraf[0].user_id)
    const title = await getUserTitle(infraf[0].user_id)
    
    return(
        <Infrastructure_Formulary_Detail_Page infraf_parameter = {infraf[0]} fullName_parameter={fullName} position_parameter={position} title_parameter={title}/>
    )
}