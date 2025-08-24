'use client'
import Image from 'next/image';
import style from './soliHistory.module.css'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/app/utils/formatDate';

function getTimeLeft(expired_date) {

    const now = new Date();
    const expire = new Date(expired_date);
    expire.setHours(16)
    expire.setMinutes(30)

    const diffMs = expire - now;

    if (diffMs <= 0) return (<span className={style.isExpiredText}>0d 0min</span>);

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    let result = "";
    if (diffDays > 0) result += `${diffDays}d`;
    if (diffHours > 0) result += ` ${diffHours}h `;
    if (diffDays == 0 && diffHours == 0 && diffMinutes > 0) result += `${diffMinutes} min`;
    if (!result) result = "> 1min";
    return (<span className={style.notExpiredText}>{result.trim()}</span>);
}



export default function SolicitudeHistory({allData_parameter}){
    const router = useRouter()
    const [data, setData] = useState(allData_parameter)
    const [search, setSearch] = useState('')
    const [orderBy, setOrderBy] = useState('descDate')
    const [reasonIndex, setReasonIndex] = useState(0)
    const [statusIndex, setStatusIndex] = useState(0)
    const [justiIndex, setJustiIndex] = useState(0)

    const setNextReasonIndex = () => {
        setOrderBy('reason');
        setReasonIndex((prevIndex) => (prevIndex + 1) % 3); // Ciclo 0 → 1 → 2 → 0
    };

    const setNextStatusIndex = () => {
        setOrderBy('status');
        setStatusIndex((prevIndex) => (prevIndex + 1) % 4); // Ciclo 0 → 1 → 2 → 0
    }

    const setNextJustiIndex = () => {
        setOrderBy('justi');
        setJustiIndex((prevIndex) => (prevIndex + 1) % 7); // Ciclo 0 → 1 → 2 → 3 → 4 → 5 → 6 → 0
    }

    const handleSearch = (e) => {
        const {value} = e.target;
        setSearch(value)
    }

    const redirectJustify = (id) => {
        router.push(`/mipp/solicitude/justification-formulary/${id}`)
    }


    const reasons = ["", "Cita médica", "Convocatoria Asamblea", "Asuntos Personales"]
    const statuses = ['Pendiente', 'Rebajo salarial parcial', 'Rebajo salarial total', "Sin rebajo salarial", "Denegado", "Acogió convocatoria"]

    useEffect(() => {
        let sortedData = [...allData_parameter];

        if (orderBy == 'descDate') {
            sortedData.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (orderBy == 'ascDate') {
            sortedData.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else if (orderBy == 'reason') {      
            switch (reasonIndex) {
                case 0: // Cita médica primero
                    sortedData.sort((a, b) => {
                        if (a.reason == 1 && b.reason != 1) return -1;
                        if (a.reason != 1 && b.reason == 1) return 1;
                        return new Date(b.date) - new Date(a.date);
                    });
                    break;
                
                case 1: // Convocatoria Asamblea primero
                    sortedData.sort((a, b) => {
                        if (a.reason == 2 && b.reason != 2) return -1;
                        if (a.reason != 2 && b.reason == 2) return 1;
                        return new Date(b.date) - new Date(a.date);
                    });
                    break;
                
                case 2: // Asuntos Personales primero
                    sortedData.sort((a, b) => {
                        if (a.reason == 3 && b.reason != 3) return -1;
                        if (a.reason != 3 && b.reason == 3) return 1;
                        return new Date(b.date) - new Date(a.date);
                    });
                    break;
                
                default:
                    break;
            }
        } else if (orderBy == 'status'){
            switch (statusIndex) {
                case 0: // Aprobados primero (is_approved)
                    console.log('aprobado')
                    sortedData.sort((a, b) => {
                        const aApproved = a.data?.is_approved || a.absence_requests?.is_approved;
                        const bApproved = b.data?.is_approved || b.absence_requests?.is_approved;
                        
                        if (aApproved && !bApproved) return -1;
                        if (!aApproved && bApproved) return 1;
                        return new Date(b.date) - new Date(a.date);
                    });
                    break;
                
                case 1: // Pendientes primero (is_pending)
                    console.log('pendiente')
                    sortedData.sort((a, b) => {
                        const aPending = a.data?.is_pending;
                        const bPending = b.data?.is_pending;
                        
                        if (aPending && !bPending) return -1;
                        if (!aPending && bPending) return 1;
                        return new Date(b.date) - new Date(a.date);
                    });
                    break;
                
                case 2: // Denegados primero (is_denied)
                    console.log('denegado')
                    sortedData.sort((a, b) => {
                        const aDenied = a.data?.is_denied;
                        const bDenied = b.data?.is_denied;
                        
                        if (aDenied && !bDenied) return -1;
                        if (!aDenied && bDenied) return 1;
                        return new Date(b.date) - new Date(a.date);
                    });
                    break;
                
                case 3: // Sin estado definido primero
                    sortedData.sort((a, b) => {
                        const aHasStatus = a.data?.is_approved || a.data?.is_pending || a.data?.is_denied
                        const bHasStatus = b.data?.is_approved || b.data?.is_pending || b.data?.is_denied 
                        
                        if (!aHasStatus && bHasStatus) return -1;
                        if (aHasStatus && !bHasStatus) return 1;
                        return new Date(b.date) - new Date(a.date);
                    });
                    break;

                default:
                    break;
            }
        } else if (orderBy == 'justi') {
            console.log('entro?')
            switch (justiIndex) {
                case 1: // is_approved == true && is_expired == false primero
                    sortedData.sort((a, b) => {
                        const aCondition = (a.data?.is_approved == true || a.data.absence_requests?.is_approved == true) && 
                                        (a.data?.is_expired == false || a.data.absence_requests?.is_expired == false) &&
                                        (a.data?.justification_id == null);
                        const bCondition = (b.data?.is_approved == true || b.data.absence_requests?.is_approved == true) && 
                                        (b.data?.is_expired == false || b.data.absence_requests?.is_expired == false) &&
                                        (b.data?.justification_id == null);
                        
                        if (aCondition && !bCondition) return -1;
                        if (!aCondition && bCondition) return 1;
                        return new Date(b.date) - new Date(a.date);
                    });
                    break;
                
                case 2: // justification_response_state == 0 primero
                    sortedData.sort((a, b) => {
                        const aState = a.data.justification?.justification_response_state || a.data.justification_response_state;
                        const bState = b.data.justification?.justification_response_state || b.data.justification_response_state;
                        
                        if (aState == 0 && bState != 0) return -1;
                        if (aState != 0 && bState == 0) return 1;
                        return new Date(b.date) - new Date(a.date);
                    });
                    break;
                
                case 3: // justification_response_state == 1 primero
                    sortedData.sort((a, b) => {
                        const aState = a.data.justification?.justification_response_state || a.data.justification_response_state;
                        const bState = b.data.justification?.justification_response_state || b.data.justification_response_state;
                        
                        if (aState == 1 && bState != 1) return -1;
                        if (aState != 1 && bState == 1) return 1;
                        return new Date(b.date) - new Date(a.date);
                    });
                    break;
                
                case 4: // justification_response_state == 2 primero
                    sortedData.sort((a, b) => {
                        const aState = a.data.justification?.justification_response_state || a.data.justification_response_state;
                        const bState = b.data.justification?.justification_response_state || b.data.justification_response_state;
                        
                        if (aState == 2 && bState != 2) return -1;
                        if (aState != 2 && bState == 2) return 1;
                        return new Date(b.date) - new Date(a.date);
                    });
                    break;
                
                case 5: // justification_response_state == 3 primero
                    sortedData.sort((a, b) => {
                        const aState = a.data.justification?.justification_response_state || a.data.justification_response_state;
                        const bState = b.data.justification?.justification_response_state || b.data.justification_response_state;
                        
                        if (aState == 3 && bState != 3) return -1;
                        if (aState != 3 && bState == 3) return 1;
                        return new Date(b.date) - new Date(a.date);
                    });
                    break;
                
                case 6: // justification_response_state == 4 primero
                    sortedData.sort((a, b) => {
                        const aState = a.data.justification?.justification_response_state || a.data.justification_response_state;
                        const bState = b.data.justification?.justification_response_state || b.data.justification_response_state;
                        
                        if (aState == 4 && bState != 4) return -1;
                        if (aState != 4 && bState == 4) return 1;
                        return new Date(b.date) - new Date(a.date);
                    });
                    break;
                case 0: // justification_response_state == 4 primero
                    sortedData.sort((a, b) => {
                        const aState = a.data.justification?.justification_response_state || a.data.justification_response_state;
                        const bState = b.data.justification?.justification_response_state || b.data.justification_response_state;
                        
                        if (aState == 5 && bState != 5) return -1;
                        if (aState != 5 && bState == 5) return 1;
                        return new Date(b.date) - new Date(a.date);
                    });
                    break;
                
                default:
                    break;
            }
        }

        setData(sortedData);
    }, [orderBy, reasonIndex, statusIndex, justiIndex, allData_parameter])
    return (
        <>
            <div className={style.searchContainer}>
                <label htmlFor="search">Buscar</label>
                <input type="text" name="search" id="search" className={style.searchInput} placeholder='Buscar por motivo' value={search} onChange={handleSearch}/>
            </div>

            <div className={style.headerContainer}>

                <div className={style.dateHeader} onClick={() => {orderBy == 'descDate' ? setOrderBy('ascDate') : setOrderBy('descDate')}}>
                    <p>Ausencia</p>
                    <Image src={"/order_by_icon.svg"} width={10} height={10} alt='' className={style.orderIcon} />
                </div>

                <div className={style.reasonHeader} onClick={setNextReasonIndex}>
                    <p>Motivo</p>
                    <Image src={"/order_by_icon.svg"} width={10} height={10} alt='' className={style.orderIcon} />
                </div>

                
                <div className={style.stateHeader} onClick={setNextStatusIndex}>
                    <p>Estado</p>
                    <Image src={"/order_by_icon.svg"} width={10} height={10} alt='' className={style.orderIcon} />
                </div>

                <div className={style.timeLeftHeader} onClick={setNextJustiIndex}>
                    <p>Justificación</p>
                    <Image src={"/order_by_icon.svg"} width={10} height={10} alt='' className={style.orderIcon} />
                </div>

                <div className={style.goToHeader}>
                    <p>Ir a</p>
                </div>
            </div>

            <div className={style.main}>
                {
                    (data?.length > 0)
                    ?
                        <>
                            {
                                data.map((doc) => 

                                    reasons[doc.reason].toLowerCase().startsWith(search.toLowerCase())
                                    &&(
                                        (doc.type == 'absence')?(
                                        <div className={style.registerContainer} key={doc.data.id}>

                                            <div className={style.date}>
                                                <p className={style.dateText}>
                                                    {formatDate(doc.data.absence_date)}
                                                </p>
                                            </div>

                                            <div className={style.reason}>
                                                <div className={style.square} />
                                                <p className={style.reasonText}>{reasons[doc.data.reason]}</p>
                                            </div>

                                            <div className={style.state}>
                                                {
                                                    doc.data.is_pending && <p className={style.pendingText}>Pendiente</p>
                                                }
                                                {
                                                    doc.data.is_approved && <p className={style.approvedText}>Aprobado</p>
                                                }
                                                {
                                                    doc.data.is_denied && <p className={style.deniedText}>Denegado</p>
                                                }
                                            </div>

                                            <div className={style.timeLeft}>
                                                {
                                                    (doc.data.is_approved && !doc.data.is_justified) && 
                                                    <>
                                                        <Image src={doc.data.is_expired ? '/clock_expired.svg' : '/clock.svg'} width={20} height={20} alt='clock icon' />
                                                        <p style={doc.data.is_expired ? {color: "red", textDecoration: "line-through"} : null}>{getTimeLeft(doc.data.expire_date)}</p>
                                                    </>
                                                }

                                                {
                                                    (doc.data.justification_id != null && doc.data.is_justified) &&
                                                    <>
                                                        {
                                                            (doc.data.justifications?.justification_response_state == 0 || doc.data.justifications.justification_response_state == 5) && 
                                                            <>
                                                                <p className={style.notTime} style={{color: "#DEAA00"}}>{statuses[doc.data.justifications.justification_response_state]}</p>
                                                            </>
                                                        }

                                                        {
                                                            ([1,2,3].includes(doc.data.justifications?.justification_response_state)) && 
                                                            <>
                                                                <p className={style.notTime} style={{color: "#0B8300"}}>{statuses[doc.data.justifications.justification_response_state]}</p>
                                                            </>
                                                        }

                                                        {
                                                            (doc.data.justifications?.justification_response_state == 4) && 
                                                            <>
                                                                <p className={style.notTime} style={{color: "#830000"}}>{statuses[doc.data.justifications.justification_response_state]}</p>
                                                            </>
                                                        }
                                                    </>
                                                }

                                                

                                            </div>
                                            
                                            <div className={style.goTo}>
                                                <Link href={`/mipp/history/solicitude-detail/${doc.data.id}`}>
                                                <div className={style.infoContainer}>
                                                    <Image src={"/goToInfo.svg"} width={20} height={20} alt='go to icon' />
                                                    <p className={style.goToInfoText}>Info</p>
                                                </div>
                                                </Link>
                                                {
                                                    (doc.data.is_approved && !doc.data.is_justified && !doc.data.is_expired) &&
                                                    (
                                                        <div className={style.justiContainer}>
                                                            <Image src={"/goToJust.svg"} width={20} height={20} alt='go to icon' />
                                                            <p className={style.goToJustifyText} onClick={() => redirectJustify(doc.data.id)}>Justificar</p>
                                                        </div>
                                                    )

                                                    
                                                }
                                            </div>

                                        </div>
                                        )
                                        :
                                        (doc.type == 'justi')&&(
                                        <div className={style.registerContainer} key={doc.data.id} >

                                                <div className={style.date}>
                                                    <p className={style.dateText}>
                                                        {formatDate(doc.data.absence_date)}
                                                    </p>
                                                </div>

                                                <div className={style.reason}>
                                                    <div className={style.square} />
                                                    <p className={style.reasonText}>{reasons[doc.data.justification_reason]}</p>
                                                </div>

                                                <div className={style.state}>
                                                    {
                                                        <p>N/A</p>
                                                    }
                                                </div>

                                                <div className={style.timeLeft}>

                                                    {
                                                        (doc.data.justification_response_state == 0 || doc.data.justification_response_state == 5) && 
                                                        <>
                                                            <p style={{color: "#DEAA00"}}>{statuses[doc.data.justification_response_state]}</p>
                                                        </>
                                                    }

                                                    {
                                                        ([1,2,3].includes(doc.data.justification_response_state)) && 
                                                        <>
                                                            <p style={{color: "#0B8300"}}>{statuses[doc.data.justification_response_state]}</p>
                                                        </>
                                                    }

                                                    {
                                                        (doc.data.justification_response_state == 4) && 
                                                        <>
                                                            <p style={{color: "#830000"}}>{statuses[doc.data.justification_response_state]}</p>
                                                        </>
                                                    }

                                                </div>
                                                
                                                <div className={style.goTo}>
                                                    <Link href={`/mipp/history/solicitude-detail/${doc.data.id}`}>
                                                    <div className={style.infoContainer}>
                                                        <Image src={"/goToInfo.svg"} width={20} height={20} alt='go to icon' />
                                                        <p className={style.goToInfoText}>Info</p>
                                                    </div>
                                                    </Link>
                                                </div>

                                        </div>
                                        )    
                                    )


                                )
                                
                            }

                            {/*
                                justi.map((justification) => 
                                    (
                                        (reasons[justification.justification_reason].toLowerCase().startsWith(search.toLowerCase()))
                                        &&(
                                            
                                            <div className={style.registerContainer} key={justification.id} >

                                                <div className={style.date}>
                                                    <p className={style.dateText}>
                                                        {formatDate(justification.absence_date)}
                                                    </p>
                                                </div>

                                                <div className={style.reason}>
                                                    <div className={style.square} />
                                                    <p className={style.reasonText}>{reasons[justification.justification_reason]}</p>
                                                </div>

                                                <div className={style.state}>
                                                </div>

                                                <div className={style.timeLeft}>

                                                    {
                                                        (justification.justification_response_state == 0 || justification.justification_response_state == 5) && 
                                                        <>
                                                            <p style={{color: "#DEAA00"}}>{statuses[justification.justification_response_state]}</p>
                                                        </>
                                                    }

                                                    {
                                                        ([1,2,3].includes(justification.justification_response_state)) && 
                                                        <>
                                                            <p style={{color: "#0B8300"}}>{statuses[justification.justification_response_state]}</p>
                                                        </>
                                                    }

                                                    {
                                                        (justification.justification_response_state == 4) && 
                                                        <>
                                                            <p style={{color: "#830000"}}>{statuses[justification.justification_response_state]}</p>
                                                        </>
                                                    }

                                                </div>
                                                
                                                <div className={style.goTo}>
                                                    <Link href={`/mipp/history/solicitude-detail/${justification.id}`}>
                                                    <div className={style.infoContainer}>
                                                        <Image src={"/goToInfo.svg"} width={20} height={20} alt='go to icon' />
                                                        <p className={style.goToInfoText}>Info</p>
                                                    </div>
                                                    </Link>
                                                </div>

                                            </div>
                                        )
                                    )

                                )
                                
                            */}

                            

                            {
                                (data.filter((doc) => reasons[doc.reason].toLowerCase().startsWith(search.toLowerCase())).length == 0) &&
                               
                                    <div className={style.notRegisterContainer}>
                                        <h3>No se encontraron registros con "{search}"</h3>
                                        <Image src={"/not_found.webp"} width={100} height={100} alt='not found image' />
                                    </div>
                                
                            }
                        </>
                    :
                    <div className={style.notRegisterContainer}>
                        <h3>Nada que mostrar por aquí</h3>
                        <Image src={"/not_found.webp"} width={100} height={100} alt='not found image' />
                    </div>
                }
            </div>
        </>
    )
}