import { redirect } from "next/navigation"
import { requireAuth } from "./utils/auth"

export default async function Page(){
    const user = await requireAuth()

    if (user) {
        redirect("/mipp/dashboard")
    } else {
        redirect("/login")
    }

    

    return
}