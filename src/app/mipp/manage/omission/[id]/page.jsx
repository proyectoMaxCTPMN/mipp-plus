import { getUserOmission } from "@/app/utils/allFetch";
import Manage_Omission_Formulary_page from "./omission";
import { getCurrentUser } from "@/app/utils/auth";
import { getUserInfo, getUserPosition, getUserRoles, getUserTitle } from "@/app/utils/userFetch";

export default async function Manage_Omission_Formulary({params}){
    const paramsStore = await params;
        const omissionid = paramsStore.id;
        const omissionf = await getUserOmission(omissionid)
        const userId = await getCurrentUser()
        const userInfo = await getUserInfo(omissionf[0].user_id)
        const title = await getUserPosition(userId)
        const position = await getUserTitle(userId)
        const roles = await getUserRoles(userId)
        console.log(userInfo)
    return(
        <Manage_Omission_Formulary_page omissionf_parameter={omissionf[0]} userInfo_parameter = {userInfo}/>
    )
}