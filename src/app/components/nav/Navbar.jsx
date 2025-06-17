'use client'

import style from './navbar.module.css'
import Image from 'next/image'
import {useState } from 'react';

export default function Navbar(){
    const [pageIndex, setPageIndex] = useState(1)
    let barHeight = pageIndex * 12.5;
    return(
        <div className={style.sidebarContainer}>
            <div className={style.selectedBar} style={{top: `${barHeight}dvh`}}></div>
            <div className={style.logo}>
                <Image src={"/logo-short.svg"} height={20} width={20} alt='Logo' className={style.logoImage}/>
            </div>

            <div className={style.dashboard} onClick={() => setPageIndex(1)}>
                <Image src={pageIndex == 1 ? "/menuIcons/home_selected.svg" : "/menuIcons/home_unselected.svg"} height={20} width={20} alt='Logo' className={style.iconImage}/>
                <p className={style.subText}>Inicio</p>
            </div>

            <div className={style.history} onClick={() => setPageIndex(2)}>
                <Image src={pageIndex == 2 ? "/menuIcons/hist_selected.svg" : "/menuIcons/hist_unselected.svg"} height={20} width={20} alt='Logo' className={style.iconImage}/>
                <p className={style.subText}>Historial</p>
            </div>

            <div className={style.soli} onClick={() => setPageIndex(3)}>
                <Image src={pageIndex == 3 ? "/menuIcons/soli_selected.svg" : "/menuIcons/soli_unselected.svg"} height={20} width={20} alt='Logo' className={style.iconImage}/>
                <p className={style.subText}>Solicitud</p>
            </div>

            <div className={style.account} onClick={() => setPageIndex(4)}>
                <Image src={pageIndex == 4 ? "/menuIcons/account_selected.svg" : "/menuIcons/account_unselected.svg"} height={20} width={20} alt='Logo' className={style.iconImage}/>
                <p className={style.subText}>Cuenta</p>
            </div>

            <div className={style.logoff}>
                <Image src={"/menuIcons/logoff.svg"} height={20} width={20} alt='Logo' className={style.iconImage}/>
                <p className={style.subText} style={{color: "#940202"}}>Salir</p>
            </div>
        </div>
    )
}