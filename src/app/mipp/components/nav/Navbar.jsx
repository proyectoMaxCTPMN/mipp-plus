'use client'

import style from './navbar.module.css'
import Image from 'next/image'
import {useState } from 'react';
import { redirect } from 'next/navigation'

export default function Navbar(){
    const [hoverIndex, setHoverIndex] = useState(0)
    const [pageIndex, setPageIndex] = useState(1)

    //Solicitude Sidebar State
    const [solicitudeShow, setSolicitudeShow] = useState(true)

    let barHeight = pageIndex * 12.5;
    return(
        <>
            <div className={style.sidebarContainer}>
                <div className={style.selectedBar} style={{top:`${barHeight}dvh`}}></div>
                <div className={style.logo} style={solicitudeShow ? {width: "12dvw"} : {width: "5dvw"} }>
                    <Image src={"/logo-short.svg"} height={20} width={20} alt='Logo' className={style.logoImage}/>
                </div>

                <div className={style.dashboard} onClick={() => {setPageIndex(1); redirect("/mipp/dashboard");}} onMouseEnter={() => setHoverIndex(1)} onMouseLeave={() => setHoverIndex(0)}>
                    <Image src={pageIndex == 1 || hoverIndex == 1? "/menuIcons/home_selected.svg" : "/menuIcons/home_unselected.svg"} height={20} width={20} alt='Logo' className={style.iconImage}/>
                    <p className={style.subText}>Inicio</p>
                </div>

                <div className={style.history} onClick={() => {setPageIndex(2); redirect("/mipp/history");}} onMouseEnter={() => setHoverIndex(2)} onMouseLeave={() => setHoverIndex(0)}>
                    <Image src={pageIndex == 2 || hoverIndex == 2 ? "/menuIcons/hist_selected.svg" : "/menuIcons/hist_unselected.svg"} height={20} width={20} alt='Logo' className={style.iconImage}/>
                    <p className={style.subText}>Historial</p>
                </div>

                <div className={style.soli} onClick={() => {setPageIndex(3); redirect("/mipp/solicitude");}} onMouseEnter={() => setHoverIndex(3)} onMouseLeave={() => setHoverIndex(0)}>
                    <Image src={pageIndex == 3 || hoverIndex == 3 ? "/menuIcons/soli_selected.svg" : "/menuIcons/soli_unselected.svg"} height={20} width={20} alt='Logo' className={style.iconImage}/>
                    <p className={style.subText}>Solicitud</p>
                </div>

                <div className={style.account} onClick={() => {setPageIndex(4); redirect("/mipp/account");}} onMouseEnter={() => setHoverIndex(4)} onMouseLeave={() => setHoverIndex(0)}>
                    <Image src={pageIndex == 4 || hoverIndex == 4 ? "/menuIcons/account_selected.svg" : "/menuIcons/account_unselected.svg"} height={20} width={20} alt='Logo' className={style.iconImage}/>
                    <p className={style.subText}>Cuenta</p>
                </div>

                <div className={style.logoff}>
                    <Image src={"/menuIcons/logoff.svg"} height={20} width={20} alt='Logo' className={style.iconImage}/>
                    <p className={style.subText} style={{color: "#940202"}}>Salir</p>
                </div>
            </div>

            <SolicitudeBar solicitudeShow={solicitudeShow}/>
        </>

    )
}


function SolicitudeBar({solicitudeShow}){
    return(
        <div className={style.solicitudeSideBar} style={solicitudeShow ? {left:" 5dvw"} : {left:"-2dvw"}}>

        </div>
    )
}