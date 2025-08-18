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

import { Merriweather_Sans, Karla, Martel_Sans } from 'next/font/google'

const merriweather_sans = Merriweather_Sans({
    weight: ['300', '400', '500', '600', '700', '800'],
    subsets: ['latin'],
    display: 'swap', // Optional: optimizes font loading
    variable: '--font-merriweather', // Optional: defines a CSS variable
});

const karla = Karla({
    weight: ['300', '400', '500', '600', '700', '800'],
    subsets: ['latin'],
    display: 'swap', // Optional: optimizes font loading
    variable: '--font-karla', // Optional: defines a CSS variable
});

const martel_sans = Martel_Sans({
    weight: ['200', '300', '400', '600', '700', '800', '900'],
    subsets: ['latin'],
    display: 'swap', // Optional: optimizes font loading
    variable: '--font-martel', // Optional: defines a CSS variable
});



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
        <div className={`${merriweather_sans.variable} ${karla.variable} ${martel_sans.variable} `}>
            <Navbar userRoles_parameter={userRoles}/>
            <PopUpContainer />
            <Suspense fallback={                
                <LoadingSkeleton />
            }
            >
                {children}
            </Suspense>
        </div>
    );
}
