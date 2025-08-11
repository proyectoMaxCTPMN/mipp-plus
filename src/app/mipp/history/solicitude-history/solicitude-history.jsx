'use client'
import Image from 'next/image';
import style from './soliHistory.module.css'
import { useRef, useState, useEffect } from 'react';


function getTimeLeft(expired_date) {
    const now = new Date();
    const expire = new Date(expired_date);

    // Format both dates for display
    const nowStr = now.toLocaleDateString('es-CR');
    const expireStr = expire.toLocaleDateString('es-CR');

    const diffMs = expire - now;

    if (diffMs <= 0) return (<p className={style.isExpiredText}>0d 0min</p>);

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    let result = "";
    if (diffDays > 0) result += `${diffDays}d`;
    if (diffHours > 0) result += ` ${diffHours}h `;
    if (diffDays === 0 && diffHours === 0 && diffMinutes > 0) result += `${diffMinutes} min`;
    if (!result) result = "> 1min";
    return (<p className={style.notExpiredText}>{result.trim()}</p>);
}



export default function SolicitudeHistory({userAbsence_parameter}){
    const [data, setData] = useState(userAbsence_parameter)
    const [search, setSearch] = useState('')

    const [dataLength, setDataLength] = useState(-1)

    const handleSearch = (e) => {
        const {value} = e.target;
        setSearch(value)
    }




    console.log(data)
    const reasons = ["", "Cita médica", "Convocatoria Asamblea", "Asuntos Personales"]
    return (
        <>
            <div className={style.searchContainer}>
                <label htmlFor="search">Buscar</label>
                <input type="text" name="search" id="search" className={style.searchInput} placeholder='Buscar por motivo' value={search} onChange={handleSearch}/>
            </div>

            <div className={style.headerContainer}>

                <div className={style.dateHeader}>
                    <p>Fecha</p>
                    <Image src={"/order_by_icon.svg"} width={10} height={10} alt='' className={style.orderIcon} />
                </div>

                <div className={style.reasonHeader}>
                    <p>Motivo</p>
                    <Image src={"/order_by_icon.svg"} width={10} height={10} alt='' className={style.orderIcon} />
                </div>

                
                <div className={style.stateHeader}>
                    <p>Estado</p>
                    <Image src={"/order_by_icon.svg"} width={10} height={10} alt='' className={style.orderIcon} />
                </div>

                <div className={style.timeLeftHeader}>
                    <p>Justificado</p>
                    <Image src={"/order_by_icon.svg"} width={10} height={10} alt='' className={style.orderIcon} />
                </div>

                <div className={style.goToHeader}>
                    <p>Ir a</p>
                </div>
            </div>

            <div className={style.main}>
                {
                    data?.length > 0 
                    ?
                        <>
                            {
                                data.map((absence) => 
                                    (
                                        (reasons[absence.reason].toLowerCase().startsWith(search.toLowerCase()))
                                        &&(
                                            
                                            <div className={style.registerContainer} key={absence.id} onLoad={() => setDataLength(dataLength + 1)}>

                                                <div className={style.date}>
                                                    <p className={style.dateText}>
                                                        {new Date(absence.request_date).toLocaleDateString('es-CR')}
                                                    </p>
                                                </div>

                                                <div className={style.reason}>
                                                    <div className={style.square} />
                                                    <p className={style.reasonText}>{reasons[absence.reason]}</p>
                                                </div>

                                                <div className={style.state}>
                                                    {
                                                        absence.is_pending && <p className={style.pendingText}>Pendiente</p>
                                                    }
                                                    {
                                                        absence.is_approved && <p className={style.approvedText}>Aprobado</p>
                                                    }
                                                    {
                                                        absence.is_denied && <p className={style.deniedText}>Denegado</p>
                                                    }
                                                </div>

                                                <div className={style.timeLeft}>
                                                    {
                                                        absence.is_approved && 
                                                        <>
                                                            <Image src={absence.is_expired ? '/clock_expired.svg' : '/clock.svg'} width={20} height={20} alt='clock icon' />
                                                            <p style={absence.is_expired ? {color: "red", textDecoration: "line-through"} : null}>{getTimeLeft(absence.expire_date)}</p>
                                                        </>
                                                    }

                                                </div>

                                                <div className={style.goTo}>
                                                    <div className={style.infoContainer}>
                                                        <Image src={"/goToInfo.svg"} width={20} height={20} alt='go to icon' />
                                                        <p className={style.goToInfoText}>Info</p>
                                                    </div>

                                                    {
                                                        (absence.is_approved && !absence.is_justified) &&
                                                        (
                                                            <div className={style.justiContainer}>
                                                                <Image src={"/goToJust.svg"} width={20} height={20} alt='go to icon' />
                                                                <p className={style.goToJustifyText}>Justificar</p>
                                                            </div>
                                                        )

                                                        
                                                    }
                                                </div>

                                            </div>
                                        )
                                    )

                                )
                                
                            }

                            {
                                data.filter((absence) => reasons[absence.reason].toLowerCase().startsWith(search.toLowerCase())).length == 0 &&
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