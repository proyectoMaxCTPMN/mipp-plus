'use client'
import Link from 'next/link'
import style from './dashboard.module.css'
import Image from 'next/image'
import { formatDate } from '@/app/utils/formatDate';

function getTimeLeft(expired_date) {
    const now = new Date();
    const expire = new Date(expired_date);

    // Format both dates for display
    const nowStr = now.toLocaleDateString('es-CR');
    const expireStr = expire.toLocaleDateString('es-CR');

    const diffMs = expire - now;

    if (diffMs <= 0) return (<span className={style.isExpiredText}>0d 0min</span>);

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    let result = "";
    if (diffDays > 0) result += `${diffDays}d`;
    if (diffHours > 0) result += ` ${diffHours}h `;
    if (diffDays === 0 && diffHours === 0 && diffMinutes > 0) result += `${diffMinutes} min`;
    if (!result) result = "> 1min";
    return (<span className={style.notExpiredText}>{result.trim()}</span>);
}

export default function RecentHistory({AllDocuments_parameter}){
    const reasons = ["", "Cita médica", "Convocatoria Asamblea", "Asuntos Personales"]
    const typeofomission = ["","Entrada","Salida","Todo el día","Salida Anticipada"]
    return(
        <div className={style.cardsContainer}>
            <div className={style.soliCard}>
                <div className={style.soliContent} style={AllDocuments_parameter.absences.length <= 0 ? {display: 'flex',alignItems: 'center', justifyContent: 'center'} : {}}>
                    {!AllDocuments_parameter.absences.length <= 0 ? 
                        AllDocuments_parameter.absences.map((absence)=>(
                            <div className={style.informationcontainer} key={absence.id}>

                                <div className={style.information_upperpart}>
                                    <p>{reasons[absence.reason]}</p>
                                    <span>{formatDate(absence.absence_date)}</span>
                                </div>

                                <div className={style.information_lowerpart}>
                                    <p>
                                        {
                                            absence.is_pending && <span  style={{color: '#DEAA00'}}>Pendiente</span>
                                        }
                                        {
                                            absence.is_approved && <span  style={{color: '#0B8300'}}>Aprobado</span>
                                        }
                                        {
                                            absence.is_denied && <span  style={{color: '#940202'}}>Denegado</span>
                                        }
                                    </p>
                                    <span>
                                        {
                                            absence.is_approved ? 
                                            <div className={style.clockcontainer}>
                                                <p>Just.:</p>
                                                {
                                                    absence.is_justified ?(
                                                        <p style={{color: '#DEAA00'}}>Enviada</p>
                                                    ):(
                                                        <>
                                                        <Image src={absence.is_expired ? '/clock_expired.svg' : '/clock.svg'} width={20} height={20} alt='clock icon' className={style.clockicon}/>
                                                        <p style={absence.is_expired ? {color: "red", textDecoration: "line-through"} : null}>{getTimeLeft(absence.expire_date)}</p>
                                                        </>
                                                    )
                                                }
                                            </div>
                                            :(
                                                <div className={style.clockcontainer}>
                                                <p>N/A</p>
                                                </div>
                                            )
                                        }
                                    </span>
                                </div>
                                <Link href={`/mipp/history/solicitude-detail/${absence.id}`} className={style.hovercontainer}>
                                    <div className={style.hover_informationcontainer}>
                                        <span className={style.verMasText}>Ver Más</span>
                                        <Image src={'/circle-chevron-right-solid-full.svg'} width={20} height={20} alt='Ver mas' className={style.hover_chevronicon}></Image>
                                    </div>
                                </Link>
                            </div>
                        ))
                        
                    :(
                        
                        <div className={style.null_informationcontainer}>
                            <p>Sin solicitudes recientes</p>
                            <Image src={"/null.svg"} width={30} height={30} alt='null_icon' className={style.nullicon}></Image>
                        </div>
                    )}
                    
                </div>
                <Link href="/mipp/solicitude/permission-formulary">
                    <div className={style.soliFooter}>
                        <p className={style.footerText}>Nuevo Permiso de Ausencia</p>
                        <Image src={"/plus.svg"} width={30} height={30} alt='plus' className={style.plus}/>
                    </div>
                </Link>
            </div>
            <div className={style.omiCard}>
                <div className={style.omiContent} style={AllDocuments_parameter.omissions.length <= 0 ? {display: 'flex',alignItems: 'center', justifyContent: 'center'} : {}}>
                    {!AllDocuments_parameter.omissions.length <= 0 ? 
                        AllDocuments_parameter.omissions.map((omission)=>(
                            <div className={style.informationcontainer} key={omission.id}>

                                <div className={style.information_upperpart}>
                                    <p>
                                        {omission.omission_reason.length > 21
                                        ? omission.omission_reason.slice(0, 21) + "..."
                                        : omission.omission_reason}
                                    </p>
                                    <span>{new Date(omission.omission_date).toLocaleDateString('es-CR')}</span>
                                </div>

                                <div className={style.information_lowerpart}>
                                    <p>
                                        {
                                            omission.omission_state == "Pendiente" && <span  style={{color: '#DEAA00'}}>Pendiente</span>
                                        }
                                        {
                                            omission.omission_state == "Aprobado" && <span  style={{color: '#0B8300'}}>Aprobado</span>
                                        }
                                        {
                                            omission.omission_state == "Denegado" && <span  style={{color: '#940202'}}>Denegado</span>
                                        }
                                    </p>
                                    <p className={style.typeofomissioncontainer}>Omisión: {typeofomission[omission.omission_type]}</p>
                                </div>

                                <div className={style.hovercontainer}>
                                    <div className={style.hover_informationcontainer}>
                                        <span className={style.verMasText}>Ver Más</span>
                                        <Image src={'/circle-chevron-right-solid-full.svg'} width={20} height={20} alt='Ver mas' className={style.hover_chevronicon}></Image>
                                    </div>
                                </div>

                            </div>
                        ))
                        
                    :(
                        
                        <div className={style.null_informationcontainer}>
                            <p>Sin solicitudes recientes</p>
                            <Image src={"/null.svg"} width={30} height={30} alt='null_icon' className={style.nullicon}></Image>
                        </div>
                    )}
                    
                </div>
                <Link href="/mipp/solicitude/omission-formulary">
                <div className={style.omiFooter}>
                    <p className={style.footerText}>Nueva Justificación de Marca</p>
                    <Image src={"/plus.svg"} width={30} height={30} alt='plus' className={style.plus}/>
                </div>
                </Link>
            </div>

            <div className={style.reportCard}>
                <div className={style.reportContent} style={AllDocuments_parameter.infra.length <= 0 ? {display: 'flex',alignItems: 'center', justifyContent: 'center'} : {}}>
                    {!AllDocuments_parameter.infra.length <= 0 ? 
                        AllDocuments_parameter.infra.map((report) =>(
                            <div className={style.informationcontainer} key={report.id}>

                                <div className={style.information_upperpart}>
                                    <p>{report.report_building}</p>
                                    <span>{new Date(report.report_date).toLocaleDateString('es-CR')}</span>
                                </div>

                                <div className={style.information_lowerpart}>
                                    {
                                        report.is_revised ? (
                                            <p style={{color: '#1D2958'}}>Gestionado</p>
                                        ):(
                                            <p style={{color: '#DEAA00'}}>Pendiente</p>
                                        )
                                    }
                                    <span className={style.reportdetailcontainer}>
                                        {
                                            report.report_detail.length > 15
                                            ? report.report_detail.slice(0, 15) + "..."
                                            : report.report_detail
                                        }
                                    </span>
                                </div>
                                
                                <div className={style.hovercontainer}>
                                    <div className={style.hover_informationcontainer}>
                                        <span className={style.verMasText}>Ver Más</span>
                                        <Image src={'/circle-chevron-right-solid-full.svg'} width={20} height={20} alt='Ver mas' className={style.hover_chevronicon}></Image>
                                    </div>
                                </div>

                            </div>
                        ))
                    :(
                        
                        <div className={style.null_informationcontainer}>
                            <p>Sin solicitudes recientes</p>
                            <Image src={"/null.svg"} width={30} height={30} alt='null_icon' className={style.nullicon}></Image>
                        </div>
                    )}
                </div>
                <Link href="/mipp/solicitude/infra-formulary">
                <div className={style.reportFooter}>
                    <p className={style.footerText}>Nuevo Reporte</p>
                    <Image src={"/plus.svg"} width={30} height={30} alt='plus' className={style.plus}/>
                </div>
                </Link>
            </div>
        </div>
    )
}