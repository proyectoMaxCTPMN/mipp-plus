import { getCurrentUser } from "@/app/utils/auth";
import JustiMenu from "./Justi_Menu";
import { getUserAbsence_soli } from "@/app/utils/fetchAbsence";

export default async function Page(){
    const userId = await getCurrentUser()
    const data = await getUserAbsence_soli(userId)

    return(
        <JustiMenu soli_data={data} />
    )
}