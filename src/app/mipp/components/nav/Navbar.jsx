'use client'

import stylesDesktop from './navbar.module.css';
import stylesCellphone from './navbarCellphone.module.css';
import Image from 'next/image'
import {useState, useRef, useEffect } from 'react';
import { redirect } from 'next/navigation'



{/* Cambiar esto cuando ya se tengan los links a las paginas especificamente */}

const solicitudeArray = [
    {
        "id": 0,
        "text": "Solicitud permiso de salida, tardía o ausencia", 
        "link": "/mipp/dashboard",
        "icon": "/menuIcons/mobile/new-soli.svg"
    },
    {
        "id": 1,
        "text": "Justificación permiso de salida, tardía o ausencia",
        "link": "/mipp/dashboard",
        "icon": "/menuIcons/mobile/soli-justify.svg"
    },
    {
        "id": 2,
        "text": "Justificación omisión de marca", 
        "link": "/mipp/dasboard",
        "icon": "/menuIcons/mobile/fingerprint.svg"
    },
    {
        "id": 3,
        "text": "Reporte en infraestructura",
        "link": "/mipp/dashboard",
        "icon": "/menuIcons/mobile/infra-broken.svg"
    }
]

const historyArray = [
    {
        "id": 0,
        "text": "Solicitudes, justificaciones de ausencias y tardías", 
        "link": "/mipp/dashboard",
        "icon": "/menuIcons/mobile/user-clock.svg"
    },
    {
        "id": 1,
        "text": "Justificaciones de omisión de marca",
        "link": "/mipp/dashboard",
        "icon": "/menuIcons/mobile/fingerprint.svg"
    },
    {
        "id": 2,
        "text": "Reportes de Infraestructura", 
        "link": "/mipp/dashboard",
        "icon": "/menuIcons/mobile/infra-broken.svg"
    },
]


export default function Navbar(){
    const [hoverIndex, setHoverIndex] = useState(0)
    const [pageIndex, setPageIndex] = useState(1)
    //Solicitude Sidebar State
    const [solicitudeShow, setSolicitudeShow] = useState(false)
    const [optionsArray, setOptionsArray] = useState(solicitudeArray);
    const [width, setWitdth] = useState(0);
    const [gotWidth, setGotWidth] = useState(false)

    const [mobileHist, setMobileHist] = useState(false)
    const [mobileSoli, setMobileSoli] = useState(false)

    useEffect(() => {
        const updateWidth = () => setWitdth(window.innerWidth);
        updateWidth(); // obtener el ancho inicial
        setGotWidth(true)
        window.addEventListener("resize", updateWidth);


        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    const isMobile = width > 480 ? false : true;
    const style = isMobile ? stylesCellphone : stylesDesktop;

    let barHeight = pageIndex * 12.5;
    const componentRef = useRef(null);
    
    useEffect(() => {
        setSolicitudeShow(false)
        setMobileHist(false)
        setMobileSoli(false)

        function handleClickOutside(event) {
            if (componentRef.current && !componentRef.current.contains(event.target)) {
            // This code runs when a click occurs outside the component
            setSolicitudeShow(false)
            setMobileHist(false)
            setMobileSoli(false)
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

    const setBothMobile = (bool) => {setMobileHist(bool); setMobileSoli(bool)};

    if (!gotWidth) {
        return (<></>)
    }

    return(
        <div ref={componentRef}>
            <div className={style.sidebarContainer} ref={componentRef}>
                {
                    !isMobile ?
                     <>
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

                        
                     </>
                    :
                     <>
                        <div className={style.dashboard} onClick={() => {setPageIndex(1); setBothMobile(false); redirect("/mipp/dashboard");}}>
                            <Image src={"/menuIcons/mobile/home.svg"} height={20} width={20} alt='Home' className={style.iconImage}/>
                        </div>

                        <div className={style.history} onClick={() => {setPageIndex(2);setOptionsArray(historyArray); setBothMobile(false); setMobileHist(!mobileHist);}}>
                            <Image src={"/menuIcons/mobile/history.svg"} height={20} width={20} alt='History' className={style.iconImage}/>
                            <div className={style.mobileHistoryBox} style={mobileHist ? {opacity: 1} : {opacity: 0}}>
                                {historyArray.map(item  => (
                                    <div className={style.mobileHistItem} key={item.id} onClick={() => redirect(item.link)}>
                                        <Image 
                                            className={style.mobileHistContent}    
                                            src={item.icon}
                                            height={20} 
                                            width={20} 
                                            alt='Solicitude' 
                                        />
                                    </div>

                                ))
                                }
                            </div>

                        </div>

                        <div className={style.soli} onClick={() => {setPageIndex(3); setOptionsArray(solicitudeArray); setBothMobile(false); setMobileSoli(!mobileSoli);}}>
                            <Image src={"/menuIcons/mobile/soli.svg"} height={20} width={20} alt='Solicitude' className={style.iconImage}/>

                            <div className={style.mobileSoliBox} style={mobileSoli ? {opacity: 1} : {opacity: 0}}>
                                {solicitudeArray.map(item  => (
                                    <div className={style.mobileSoliItem} key={item.id} onClick={() => redirect(item.link)}>
                                        <Image 
                                            className={style.mobileSoliContent}    
                                            src={item.icon}
                                            height={20} 
                                            width={20} 
                                            alt='History' 
                                        />
                                    </div>

                                ))
                                }
                            </div>
                        </div>

                        <div className={style.account} onClick={() => {setPageIndex(4); setBothMobile(false); redirect("/mipp/account");}} >
                            <Image src={"/menuIcons/mobile/account.svg"} height={20} width={20} alt='Account' className={style.iconImage}/>
                        </div>

                        <div className={style.logoff}>
                            <Image src={"/menuIcons/mobile/logoff.svg"} height={20} width={20} alt='Logoff' className={style.iconImage}/>

                        </div>
                     </>
                }

            </div>
                {
                    !isMobile && <SolicitudeBar solicitudeShow={solicitudeShow} setSolicitudeShow={setSolicitudeShow} optionsArray={optionsArray}/>
                }
            
        </div>

    )
}


function SolicitudeBar({solicitudeShow, setSolicitudeShow, optionsArray}){
    const [width, setWitdth] = useState(0);
    useEffect(() => {
        const updateWidth = () => setWitdth(window.innerWidth);
        updateWidth(); // obtener el ancho inicial
        window.addEventListener("resize", updateWidth);

        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    const isMobile = width > 480 ? false : true;

    const style = isMobile ? stylesCellphone : stylesDesktop;


    return(
        <div className={style.solicitudeSideBar} style={solicitudeShow ? {left:" 5dvw"} : {left:"-4dvw"}}>
            <div className={style.logoSpace}/>

            {optionsArray?.map((item ) => (
                <p className={style.SSScontent} key={item.id} onClick={() => {setSolicitudeShow(false); redirect(item.link)}}> 
                    {item.text}
                </p>
            ))
            }
        </div>
    )
}