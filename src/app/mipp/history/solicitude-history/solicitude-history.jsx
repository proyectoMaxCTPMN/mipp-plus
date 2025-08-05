'use client'
import Image from 'next/image';
import style from './soliHistory.module.css'
import { useState } from 'react';

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
    console.log(data)
    const reasons = ["", "Cita médica", "Convocatoria Asamblea", "Asuntos Personales"]
    return (
        <div className={style.main}>
            {
                data?.length > 0 
                ?
                    <>
                        {
                            data.map((absence) => (
                                <div className={style.registerContainer} key={absence.id}>

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
                                        <Image src={absence.is_expired ? '/clock_expired.svg' : '/clock.svg'} width={20} height={20} alt='clock icon' />
                                        {getTimeLeft(absence.expire_date)}
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
                            ))
                        }
                    </>
                    
                :
                <div className={style.notRegisterContainer}>
                    <h1>Nada que mostrar por aquí</h1>
                    <Image src={"/not_found.webp"} width={200} height={200} alt='not found image' />
                </div>
            }
        </div>
    )
}