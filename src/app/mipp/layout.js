'use client'

import "../globals.css";
import LoadingSkeleton from "./components/LoadingSkeleton";
import Navbar from './components/nav/NavbarClient'
import Cookies from "js-cookie";
import { useMounted } from "../hooks/useMounted";
import {PopUpContainer} from "./components/popup/Popup";
import { useTheme } from "next-themes";
import { Suspense, useEffect, useState } from "react";
import { getCurrentUser } from "../utils/auth";
import { getUserRoles } from "../utils/userFetch";





export default function MippLayout({children}) {
    const mounted = useMounted()
    const {theme, setTheme} = useTheme()

    const [userRoles, setUserRoles] = useState(null);

    useEffect(() => {
        const cookie = Cookies.get('system_color')
        setTheme(cookie)
        

        const fetchUserRoles = async () => {
            const userId = await getCurrentUser();
            const roles = await getUserRoles(userId);
            setUserRoles(roles);
        }
        fetchUserRoles();

        return
    }, [])


    if (!mounted || !userRoles) {
        return (
            <LoadingSkeleton />
        );
    }

    return (
        <>
            <Navbar userRoles_parameter={userRoles}/>
            <PopUpContainer />
            <Suspense fallback={                
                <LoadingSkeleton />
            }
            >
                {children}
            </Suspense>
        </>
    );
}
