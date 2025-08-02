'use client'

import "../globals.css";
import { useMounted } from "../hooks/useMounted";
import Navbar from './components/nav/Navbar'
import {PopUpContainer} from "./components/popup/Popup";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function MippLayout({children }) {
    const mounted = useMounted()
    const {theme, setTheme} = useTheme()

    useEffect(() => {
        const cookie = Cookies.get('system_color')
        console.log(cookie)
        setTheme(cookie)
    }, [])


    if (!mounted) {
        return (
            <div className="loaderContainer">
                <span className="loader"></span>
            </div>
            
        );
    }

    return (
        <>
            <Navbar />
            <PopUpContainer />
            {children}
        </>
    );
}
