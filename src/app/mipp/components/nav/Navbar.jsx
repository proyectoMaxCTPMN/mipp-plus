'use client'

import style from './navbar.module.css'
import Image from 'next/image'
import {useState, useRef, useEffect } from 'react';
import { redirect } from 'next/navigation'

export default function Navbar(){
    const [hoverIndex, setHoverIndex] = useState(0)
    const [pageIndex, setPageIndex] = useState(1)
    //Solicitude Sidebar State
    const [solicitudeShow, setSolicitudeShow] = useState(false)

    const [optionsArray, setOptionsArray] = useState();

    const solicitudeArray = ["Solicitud permiso de salida, tardía o ausencia", "Justificación permiso de salida, tardía o ausencia", "Justificación omisión de marca", "Reporte en infraestructura"]
    const historyArray = ["Solicitudes, justificaciones de ausencias y tardías", "Justificaciones de omisión de marca", "Reportes de Infraestructura"]


    let barHeight = pageIndex * 12.5;
    const componentRef = useRef(null);
    
    useEffect(() => {
        function handleClickOutside(event) {
            if (componentRef.current && !componentRef.current.contains(event.target)) {
            // This code runs when a click occurs outside the component
            setSolicitudeShow(false)
            // Perform actions like closing a modal, dropdown, etc.
            }
        }

        // Add event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [componentRef]);

    



    


    return(
        <div ref={componentRef}>
            <div className={style.sidebarContainer} ref={componentRef}>
                <div className={style.selectedBar} style={{top:`${barHeight}dvh`}}></div>
                <div className={style.logo} style={solicitudeShow ? {width: "12dvw", placeContent: "start"} : {width: "5dvw", placeContent: "center"} }>
                    <Image 
                        style={solicitudeShow ? {width: "9dvw", left: "30%"} : {width: "5dvw", left: "0"}}
                        src={solicitudeShow ? "/logo-extended.svg" : "/logo-short.svg"} 
                        height={20} 
                        width={20} 
                        alt='Logo' 
                        className={style.logoImage}
                        unoptimized
                    />
                </div>

                <div className={style.dashboard} onClick={() => {setPageIndex(1); setSolicitudeShow(false); redirect("/mipp/dashboard");}} onMouseEnter={() => setHoverIndex(1)} onMouseLeave={() => setHoverIndex(0)}>
                    <Image src={pageIndex == 1 || hoverIndex == 1? "/menuIcons/home_selected.svg" : "/menuIcons/home_unselected.svg"} height={20} width={20} alt='Logo' className={style.iconImage}/>
                    <p className={style.subText}>Inicio</p>
                </div>

                <div className={style.history} onClick={() => {setPageIndex(2); setOptionsArray(historyArray); setSolicitudeShow(true);}} onMouseEnter={() => setHoverIndex(2)} onMouseLeave={() => setHoverIndex(0)}>
                    <Image src={pageIndex == 2 || hoverIndex == 2 ? "/menuIcons/hist_selected.svg" : "/menuIcons/hist_unselected.svg"} height={20} width={20} alt='Logo' className={style.iconImage}/>
                    <p className={style.subText}>Historial</p>
                </div>

                <div className={style.soli} onClick={() => {setPageIndex(3); setOptionsArray(solicitudeArray); setSolicitudeShow(true);}} onMouseEnter={() => setHoverIndex(3)} onMouseLeave={() => {setHoverIndex(0);}}>
                    <Image src={pageIndex == 3 || hoverIndex == 3 ? "/menuIcons/soli_selected.svg" : "/menuIcons/soli_unselected.svg"} height={20} width={20} alt='Logo' className={style.iconImage}/>
                    <p className={style.subText}>Solicitud</p>
                </div>

                <div className={style.account} onClick={() => {setPageIndex(4); setSolicitudeShow(false); redirect("/mipp/account");}} onMouseEnter={() => setHoverIndex(4)} onMouseLeave={() => setHoverIndex(0)}>
                    <Image src={pageIndex == 4 || hoverIndex == 4 ? "/menuIcons/account_selected.svg" : "/menuIcons/account_unselected.svg"} height={20} width={20} alt='Logo' className={style.iconImage}/>
                    <p className={style.subText}>Cuenta</p>
                </div>

                <div className={style.logoff}>
                    <Image src={"/menuIcons/logoff.svg"} height={20} width={20} alt='Logo' className={style.iconImage}/>
                    <p className={style.subText} style={{color: "#940202"}}>Salir</p>
                </div>
            </div>

            <SolicitudeBar solicitudeShow={solicitudeShow} setSolicitudeShow={setSolicitudeShow} optionsArray={optionsArray} />
        </div>

    )
}


function SolicitudeBar({solicitudeShow, setSolicitudeShow, optionsArray}){
    return(
        <div className={style.solicitudeSideBar} style={solicitudeShow ? {left:" 5dvw"} : {left:"-4dvw"}}>
            <div className={style.logoSpace}/>

            <div className={style.SSScontent}>
                {optionsArray?.map((item, index ))
            
                }
            </div>
        </div>
    )
}