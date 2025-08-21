import { getCurrentUser } from "@/app/utils/auth";
import Solicitude_Detail from "./solicitude-detail";
import { getUserFullName, getUserJustify_request_id, getUserPosition, getUserTitle, getUserInfo} from "@/app/utils/userFetch";
import { getAbsenceById } from "@/app/utils/allFetch";



export default async function Page({params}){
    const paramsStore = await params;
    const absenceid = paramsStore.id;
    const userId = await getCurrentUser();
    const fullName = await getUserFullName(userId)
    const absencef = await getAbsenceById(absenceid)
    const title = await getUserPosition(userId)
    const position = await getUserTitle(userId)
    const justificationf = await getUserJustify_request_id(userId, absenceid)
    const userInfo = await getUserInfo(absencef[0].user_id);
    return(
        <Solicitude_Detail userInfo_parameter={userInfo} fullName_parameter={fullName} absencef_parameter={absencef[0]} justificationf_parameter={justificationf[0]} title_parameter={title} position_parameter={position}/>
    )
}
