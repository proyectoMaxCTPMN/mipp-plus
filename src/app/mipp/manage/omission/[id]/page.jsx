import { getUserFullName, getUserPosition, getUserTitle } from "@/app/utils/userFetch";
import Omission_Formulary_Detail_Page from "./omission-detail";
import { getUserOmission } from "@/app/utils/allFetch";

export default async function Omission_Detail({params}){
    const paramsStore = await params;
    const omissionid = paramsStore.id;
    const omissionf = await getUserOmission(omissionid)
    const fullName = await getUserFullName(omissionf[0].user_id)
    const position = await getUserPosition(omissionf[0].user_id)
    const title = await getUserTitle(omissionf[0].user_id)
    console.log(position)
    
    return(
        <Omission_Formulary_Detail_Page omissionf_parameter={omissionf[0]} fullName_parameter={fullName} position_parameter={position} title_parameter={title}/>
    )
}