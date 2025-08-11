'use client'
import Link from 'next/link'
import style from './dashboard.module.css'
import Image from 'next/image'


export default function RecentHistory({AllDocuments_parameter}){
    const reasons = ["", "Cita médica", "Convocatoria Asamblea", "Asuntos Personales"]
    return(
        <div className={style.cardsContainer}>
            <div className={style.soliCard}>
                <div className={style.soliContent} style={AllDocuments_parameter.absences.length <= 0 ? {display: 'flex',alignItems: 'center', justifyContent: 'center'} : {}}>
                    {!AllDocuments_parameter.absences.length <= 0 ? 
                        AllDocuments_parameter.absences.map((absence)=>(
                            <div className={style.informationcontainer}>
                                <div className={style.information_upperpart}>
                                    <p>{reasons[absence.reason]}</p>
                                    <span>{new Date(absence.request_date).toLocaleDateString('es-CR')}</span>
                                </div>
                                <div className={style.information_lowerpart}>
                                    <p>
                                        {
                                            absence.is_pending && <p className={style.pendingText}>Pendiente</p>
                                        }
                                        {
                                            absence.is_approved && <p className={style.approvedText}>Aprobado</p>
                                        }
                                        {
                                            absence.is_denied && <p className={style.deniedText}>Denegado</p>
                                        }
                                    </p>
                                    <span>
                                        {
                                            absence.is_approved && 
                                            <>
                                                <Image src={absence.is_expired ? '/clock_expired.svg' : '/clock.svg'} width={20} height={20} alt='clock icon' />
                                                <p style={absence.is_expired ? {color: "red", textDecoration: "line-through"} : null}>{getTimeLeft(absence.expire_date)}</p>
                                            </>
                                        }
                                    </span>
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
                <Link href="/mipp/solicitude/permission-formulary">
                    <div className={style.soliFooter}>
                        <p className={style.footerText}>Nuevo Permiso de Ausencia</p>
                        <Image src={"/plus.svg"} width={30} height={30} alt='plus' className={style.plus}/>
                    </div>
                </Link>
            </div>

            <div className={style.justiCard}>
                <div className={style.justiContent} style={AllDocuments_parameter.justi.length <= 0 ? {display: 'flex',alignItems: 'center', justifyContent: 'center'} : {}}>
                    {!AllDocuments_parameter.justi.length <= 0 ? 
                        <></>
                    :(
                        
                        <div className={style.null_informationcontainer}>
                            <p>Sin solicitudes recientes</p>
                            <Image src={"/null.svg"} width={30} height={30} alt='null_icon' className={style.nullicon}></Image>
                        </div>
                    )}
                </div>
                <Link href="/mipp/solicitude/justification-formulary">
                <div className={style.justiFooter}>
                    <p className={style.footerText}>Nueva Justificación de Ausencia</p>
                    <Image src={"/plus.svg"} width={30} height={30} alt='plus' className={style.plus}/>
                </div>
                </Link>
            </div>

            <div className={style.omiCard}>
                <div className={style.omiContent} style={AllDocuments_parameter.omissions.length <= 0 ? {display: 'flex',alignItems: 'center', justifyContent: 'center'} : {}}>
                    {!AllDocuments_parameter.omissions.length <= 0 ? 
                        <div className={style.informationcontainer}>

                        </div>
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
                        <></>
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