'use client'

import stylesDesktop from './navbar.module.css';
import stylesCellphone from './navbarCellphone.module.css';
import Image from 'next/image'
import {useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { logout } from '@/app/utils/auth';
import { useMounted } from '@/app/hooks/useMounted';




{/* Cambiar esto cuando ya se tengan los links a las paginas especificamente */}

const solicitudeArray = [
    {
        "id": 0,
        "text": "Solicitud permiso de salida, tardía o ausencia", 
        "link": "/mipp/solicitude/permission-formulary",
        "icon": "/menuIcons/mobile/new-soli.svg"
    },
    {
        "id": 1,
        "text": "Justificación permiso de salida, tardía o ausencia",
        "link": "/mipp/solicitude/justification-formulary/menu",
        "icon": "/menuIcons/mobile/soli-justify.svg"
    },
    {
        "id": 2,
        "text": "Justificación omisión de marca", 
        "link": "/mipp/solicitude/omission-formulary",
        "icon": "/menuIcons/mobile/fingerprint.svg"
    },
    {
        "id": 3,
        "text": "Reporte en infraestructura",
        "link": "/mipp/solicitude/infra-formulary",
        "icon": "/menuIcons/mobile/infra-broken.svg"
    }
]

const historyArray = [
    {
        "id": 0,
        "text": "Solicitudes, justificaciones de ausencias y tardías", 
        "link": "/mipp/history/solicitude-history",
        "icon": "/menuIcons/mobile/user-clock.svg"
    },
    {
        "id": 1,
        "text": "Justificaciones de omisión de marca",
        "link": "/mipp/history/justify-history",
        "icon": "/menuIcons/mobile/fingerprint.svg"
    },
    {
        "id": 2,
        "text": "Reportes de Infraestructura", 
        "link": "/mipp/dashboard",
        "icon": "/menuIcons/mobile/infra-broken.svg"
    },
]

const othersArray = [
    {
        "id": 3,
        "text": "Todos los documentos", 
        "link": "/mipp/manage/dashboard",
        "icon": "/menuIcons/mobile/infra-broken.svg"

    },
    {
        "id": 1,
        "text": "Justificaciones de omisión de marca",
        "link": "/mipp/manage/omissions",
        "icon": "/menuIcons/mobile/fingerprint.svg"
    },
    {
        "id": 2,
        "text": "Reportes de Infraestructura", 
        "link": "/mipp/manage/infra",
        "icon": "/menuIcons/mobile/infra-broken.svg"
    },
    {
        "id": 0,
        "text": "Solicitudes, justificaciones de ausencias y tardías", 
        "link": "/mipp/manage/solicitudes",
        "icon": "/menuIcons/mobile/user-clock.svg"
    },
]


export default function NavbarClient({userRoles_parameter, defaultSelected}) {

    const mounted = useMounted()
    const router = useRouter()
    const [hoverIndex, setHoverIndex] = useState()
    const [pageIndex, setPageIndex] = useState(1)
    const [currentName, setCurrentName] = useState(defaultSelected || 'dashboard');
    //Solicitude Sidebar State
    const [solicitudeShow, setSolicitudeShow] = useState(false)
    const [optionsArray, setOptionsArray] = useState(solicitudeArray);
    const [width, setWitdth] = useState(0);
    const [gotWidth, setGotWidth] = useState(false)

    const [optionsHistory, setOptionsHistory] = useState(false);
    const [optionsSoli, setOptionsSoli] = useState(false);
    const [optionsOthers, setOptionsOthers] = useState(false);

    const [showNav, setShowNav] = useState(false);

    const optionsRef = useRef(null);

    const isMobile = width > 480 ? false : true;
    const style = isMobile ? stylesCellphone : stylesDesktop;

    let barHeight = 12.5 + ((pageIndex - 1) * 11.25);

    const componentRef = useRef(null);

    const hideAll = () => {
        setOptionsHistory(false);
        setOptionsSoli(false);
        setOptionsOthers(false);
    }

    useEffect(() => {
        const updateWidth = () => {setWitdth(window.innerWidth)};
        updateWidth(); // obtener el ancho inicial
        setGotWidth(true)
        window.addEventListener("resize", updateWidth);

        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    useEffect(() => {
        setSolicitudeShow(false)


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

    useEffect(() => {
        if (optionsRef.current) {
            for (let i = 0; i < optionsRef.current.children.length; i++) {
                optionsRef.current.children[i].setAttribute("data-child-id", i + 1);
                if (optionsRef.current.children[i].id == currentName) {
                    setPageIndex(i + 1);
                }
            }
        }

        
    }, [mounted]);

    useEffect(() => {
        setCurrentName(defaultSelected || 'dashboard');

        if (optionsRef.current) {
            for (let i = 0; i < optionsRef.current.children.length; i++) {
                if (optionsRef.current.children[i].id == defaultSelected) {
                    setPageIndex(i + 1);
                }
            }
        }

        
    }, [mounted, defaultSelected]);

    const handleLogout = async () => {
        await logout()
    }

    const handleRedirect = (link) => {
        router.push(link)
    }

    if (!gotWidth) {
        return (<></>)
    }

    return(
        <>
            <div className={style.sidebarContainer} ref={componentRef} style={isMobile ? showNav ? {top: 0} : {top: '-380px'} : ''}>
                {
                    !isMobile ?
                     <>
                        <div className={style.selectedBar} style={{top:`${barHeight}dvh`}}></div>


                        <div className={style.logo} style={solicitudeShow ? {width: "12dvw", placeContent: "start"} : {width: "5dvw", placeContent: "center"} }>
                            <Image 
                                style={solicitudeShow ? {width: "9dvw", left: "30%"} : {width: "5dvw", left: "0"}}
                                src={solicitudeShow ? "/logo/logo-extended.svg" : "/logo/logo-short.svg"} 
                                height={20} 
                                width={20} 
                                alt='Logo' 
                                className={style.logoImage}
                                unoptimized
                                priority
                            />
                        </div>


                        <div className={style.optionsContainer} ref={optionsRef}>
                            <div 
                            className={style.dashboard} 
                            id='dashboard'
                            onClick={(e) => {
                                setPageIndex(e.currentTarget.dataset.childId); 
                                setCurrentName("dashboard");
                                setSolicitudeShow(false); 
                                handleRedirect("/mipp/dashboard")
                            }} 
                            onMouseEnter={() => setHoverIndex("dashboard")} 
                            onMouseLeave={() => setHoverIndex()}                             
                            >
                                <Image 
                                src={
                                    currentName == "dashboard" || 
                                    hoverIndex == "dashboard"
                                    ? 
                                        "/menuIcons/home_selected.svg" 
                                    : 
                                        "/menuIcons/home_unselected.svg"
                                } height={20} width={20} alt='Logo' className={style.iconImage}
                                />
                                <p className={style.subText}>Inicio</p>
                            </div>

                            {
                                (userRoles_parameter.basic_user || userRoles_parameter.root) &&
                                <>
                                    <div 
                                    className={style.history} 
                                    id='history'
                                    onClick={(e) => {
                                        setPageIndex(e.currentTarget.dataset.childId); 
                                        setCurrentName("history");
                                        setOptionsArray(historyArray); 
                                        setSolicitudeShow(true);
                                    }} 
                                    onMouseEnter={() => setHoverIndex("history")} 
                                    onMouseLeave={() => setHoverIndex()}
                                    >
                                        <Image 
                                        src={
                                            currentName == "history" || 
                                            hoverIndex == "history" 
                                            ? 
                                                "/menuIcons/hist_selected.svg" 
                                            : 
                                                "/menuIcons/hist_unselected.svg"
                                        } height={20} width={20} alt='Logo' className={style.iconImage}
                                        />
                                        <p className={style.subText}>Historial</p>
                                    </div>

                                    <div 
                                    className={style.soli} 
                                    id='solicitude'
                                    onClick={(e) => {
                                        setPageIndex(e.currentTarget.dataset.childId); 
                                        setCurrentName("solicitude");
                                        setOptionsArray(solicitudeArray); 
                                        setSolicitudeShow(true);
                                    }} 
                                    onMouseEnter={() => setHoverIndex("solicitude")} 
                                    onMouseLeave={() => {setHoverIndex();}}
                                    >
                                        <Image 
                                        src={
                                            currentName == "solicitude" || 
                                            hoverIndex == "solicitude" 
                                            ? 
                                                "/menuIcons/soli_selected.svg" 
                                            : 
                                                "/menuIcons/soli_unselected.svg"
                                            } height={20} width={20} alt='Logo' className={style.iconImage}
                                            />
                                        <p className={style.subText}>Solicitud</p>
                                    </div>
                                
                                </>
                            }

                            {
                                (userRoles_parameter.read_documents == true || userRoles_parameter.manage_documents || userRoles_parameter.root) &&
                                <div 
                                className={style.soli} 
                                id='manage'
                                onClick={(e) => {setPageIndex(e.currentTarget.dataset.childId); setOptionsArray(othersArray); setSolicitudeShow(true);}} 
                                onMouseEnter={(e) => setHoverIndex(e.currentTarget.dataset.childId)} 
                                onMouseLeave={() => {setHoverIndex(0);}}
                                >
                                    <p className={style.subText}>Manejar</p>
                                </div>
                            }

                            {
                                (userRoles_parameter.create_users == true || userRoles_parameter.root) &&
                                <div 
                                className={style.soli} 
                                id='create_account'
                                onClick={(e) => {setPageIndex(e.currentTarget.dataset.childId); setSolicitudeShow(false); handleRedirect("/mipp/create_account");}} 
                                onMouseEnter={(e) => setHoverIndex(e.currentTarget.dataset.childId)} 
                                onMouseLeave={() => {setHoverIndex(0);}}
                                >
                                    <p className={style.subText}>Añadir cuenta</p>
                                </div>
                            }


                            <div 
                            className={style.account} 
                            id='account'
                            onClick={(e) => {
                                setPageIndex(e.currentTarget.dataset.childId); 
                                setCurrentName("account");
                                setSolicitudeShow(false); 
                                handleRedirect("/mipp/account");}} 
                            onMouseEnter={(e) => setHoverIndex("account")} 
                            onMouseLeave={() => setHoverIndex()}>
                                <Image 
                                src={
                                currentName == "account" || 
                                hoverIndex == "account" 
                                ? 
                                    "/menuIcons/account_selected.svg" 
                                : 
                                    "/menuIcons/account_unselected.svg"
                                } height={20} width={20} alt='Logo' className={style.iconImage}
                                />
                                <p className={style.subText}>Cuenta</p>
                            </div>
                        </div>

                        <div className={style.logoff} onClick={handleLogout}>
                            <Image src={"/menuIcons/logoff.svg"} height={20} width={20} alt='Logo' className={style.logOffLogo}/>
                            <p className={style.logOffText}>Salir</p>
                        </div>

                        
                     </>
                    :
                    <>
                        <Image src={'/hamburger.svg'} width={20} height={20} alt='ham' className={style.menuIcon}
                        onClick={() => {setShowNav(!showNav); hideAll()}}
                        ></Image>



                        <div className={style.optionsContainer} ref={optionsRef}>

                            <div 
                            className={style.dashboard} 
                            id='dashboard'
                            onClick={(e) => {handleRedirect("/mipp/dashboard"); hideAll()}}                            
                            >
                                <Image 
                                    src={"/menuIcons/home_unselected.svg"} height={20} width={20} alt='Logo' className={style.iconImage}
                                />
                                <p className={style.subText}>Inicio</p>
                            </div>

                            {
                                (userRoles_parameter.basic_user || userRoles_parameter.root) &&
                                <>
                                    <div 
                                    className={style.history} 
                                    id='history'
                                    onClick={() => {setOptionsHistory(true); setOptionsSoli(false); setOptionsOthers(false);}} 
                                    >
                                        <Image 
                                            src={"/menuIcons/hist_unselected.svg"} height={20} width={20} alt='Logo' className={style.iconImage}
                                        />
                                        <p className={style.subText}>Historial</p>
                                    </div>

                                    <div 
                                    className={style.soli} 
                                    id='solicitude'
                                    onClick={() => {{setOptionsHistory(false); setOptionsSoli(true); setOptionsOthers(false);}}} 
                                    >
                                        <Image 
                                            src={"/menuIcons/soli_unselected.svg"} height={20} width={20} alt='Logo' className={style.iconImage}
                                        />
                                            <p className={style.subText}>Solicitud</p>
                                    </div>
                                
                                </>
                            }

                            {
                                (userRoles_parameter.read_documents == true || userRoles_parameter.manage_documents || userRoles_parameter.root) &&
                                <div 
                                className={style.manage} 
                                id='manage'
                                onClick={() => {{setOptionsHistory(false); setOptionsSoli(false); setOptionsOthers(true);}}} 
                                >
                                    <p className={style.subText}>Manejar</p>
                                </div>
                            }

                            {
                                (userRoles_parameter.create_users == true || userRoles_parameter.root) &&
                                <div 
                                className={style.create} 
                                id='create_account'
                                onClick={() => {handleRedirect("/mipp/create_account"); hideAll()}} 
                                >
                                    <p className={style.subText}>Añadir cuenta</p>
                                </div>
                            }


                            <div 
                            className={style.account} 
                            id='account'
                            onClick={() => {
                            handleRedirect("/mipp/account"); hideAll()}}
                            >
                                <Image 
                                    src={ "/menuIcons/account_unselected.svg"} height={20} width={20} alt='Logo' className={style.iconImage}
                                />
                                <p className={style.subText}>Cuenta</p>
                            </div>

                            <div className={style.logoff} onClick={handleLogout}>
                            <Image src={"/menuIcons/logoff.svg"} height={20} width={20} alt='Logo' className={style.logOffLogo}/>
                            <p className={style.logOffText}>Salir</p>


                            <div className={style.alternateOptions} style={optionsHistory ? {opacity: 1} : {opacity: 0}} >
                                {
                                    historyArray.map((item) => (
                                        <p className={style.alternateOption} key={item.id} onClick={() => {handleRedirect(item.link)}}> 
                                             <Image src={item.icon} height={20} width={20} alt='Logo' className={style.logOffLogo}/>
                                            {item.text}
                                        </p>
                                    ))
                                }
                            </div>

                            <div className={style.alternateOptions} style={optionsSoli ? {opacity: 1} : {opacity: 0}} >
                                {
                                    solicitudeArray.map((item) => (
                                        <p className={style.alternateOption} key={item.id} onClick={() => {handleRedirect(item.link)}}> 
                                            <Image src={item.icon} height={20} width={20} alt='Logo' className={style.logOffLogo}/>
                                            {item.text}
                                        </p>
                                    ))
                                }
                            </div>

                            <div className={style.alternateOptions} style={optionsOthers ? {opacity: 1} : {opacity: 0}} >
                                {
                                    othersArray.map((item) => (
                                        <p className={style.alternateOption} key={item.id} onClick={() => {handleRedirect(item.link)}}> 
                                            <Image src={item.icon} height={20} width={20} alt='Logo' className={style.logOffLogo}/>
                                            {item.text}
                                        </p>
                                    ))
                                }
                            </div>


                        </div>
                        </div>


                    </>
                }

            </div>


            {
                !isMobile && <SolicitudeBar solicitudeShow={solicitudeShow} setSolicitudeShow={setSolicitudeShow} optionsArray={optionsArray} handleRedirect={handleRedirect} userRoles_parameter={userRoles_parameter}/>
            }
            
        </>

    )
}


function SolicitudeBar({solicitudeShow, setSolicitudeShow, optionsArray, handleRedirect}){
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
                <p className={style.SSScontent} key={item.id} onClick={() => {setSolicitudeShow(false); handleRedirect(item.link)}}> 
                    {item.text}
                </p>
            ))
            }
        </div>
    )
}