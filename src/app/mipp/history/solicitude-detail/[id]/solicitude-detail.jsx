'use client'
import Image from 'next/image';
import style from './solicitude-detail.module.css'
import { useState } from 'react';
import Link from 'next/link'
import { formatDate, formatDateandHour } from '@/app/utils/formatDate'

export default function Solicitude_Detail({fullName_parameter, absencef_parameter,title_parameter,position_parameter,justificationf_parameter, userInfo_parameter}){
    const [isSolicitudes, setIsSolicitudes] = useState(true);
    const reasons = ["", "Cita médica", "Convocatoria Asamblea", "Asuntos Personales"]
    const [showresolution, setShowresolution] = useState(false);
    const [showPopup, setShowPopup] = useState(false)
    const [jshowPopup, setJShowPopup] = useState(false)
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

    return (
        <div className={style.body}>
            <div className={style.container}>
                <div className={style.switchcontainer}>
                    <span className={isSolicitudes ? style.activeLabel : style.inactiveLabel}>Solicitud</span>
                    <div className={style.switch} onClick={() => setIsSolicitudes(!isSolicitudes)}>
                        <span className={style.toggleCircle} style={{transform: isSolicitudes ? 'translateX(0)' : 'translateX(28px)'}}></span>
                    </div>
                    <span className={!isSolicitudes ? style.activeLabel : style.inactiveLabel}>Justificación</span>
                </div>
                {
                    isSolicitudes ? (
                        <div className={style.permission_formularycontainer}>
                            <p className={style.titleofformulary}>Solicitud:</p>
                            <div className={style.formulary_upperinformationcontainer}>
                                <div className={style.cardname}>{fullName_parameter.full_name}</div>
                                <div className={style.previewcard} onClick={() => setShowPopup(true)}><Image src={"/Search.svg"} width={20} height={20} alt='magnifying-glass-icon' className={style.searchicon}></Image></div>
                            </div>
                            <div className={style.cardcontainer}>
                                <Image src={"/Card-header.svg"} width={20} height={20} alt='Form-header' className={style.cardheaderimg}/>
                                {absencef_parameter != undefined ?
                                    <div className={style.form_container}>
                                        <h1>Formulario de solicitud de permiso salida/ausencia/tardía/incapacidad</h1>
                                        <p style={{fontSize: '.9rem'}}><span>Importante:</span> Todo permiso de ausencia laboral está sujeto a cumplimiento de requisitos y copia adjunta de documento pertinente de cita, convocatoria o licencia, de ser posible con tres días de anticipación. Posterior a la ausencia, el funcionario debe hacer entrega del comprobante pertinente de asistencia en el plazo de 48 (cuarenta y ocho horas). Las licencias dependen de requisitos  previos para su goce. De no presentar el comprobante se transmitirá lo que corresponda.</p>
                                    
                                        <form className={style.form}>
                                            <div className={style.form_row}>

                                                <div className={style.inputdate_container}>
                                                    <label style={{position: 'relative', top: '.2rem'}}>PERMISO PARA AUSENTARSE EN LA FECHA:</label>
                                                    <input type="text" name="absence_date" disabled defaultValue={formatDate(absencef_parameter.absence_date)}/>
                                                </div>

                                                <div className={style.inputradio_container}>
                                                    <label>
                                                        <input type="radio" name="is_whole_day" defaultChecked={absencef_parameter.is_whole_day} disabled/>
                                                        Jornada Laboral Completa
                                                    </label>
                                                    <label>
                                                        <input type="radio" name="is_whole_day" defaultChecked={!absencef_parameter.is_whole_day} disabled/>
                                                        Media Jornada
                                                    </label>
                                                </div>
                                            </div>
                                            <div className={style.worktimeabsence_container}>
                                                <p>Solicito permiso para:</p>
                                                <label>
                                                    <input type="radio" name="is_absence" defaultChecked={absencef_parameter.is_absence} disabled/>
                                                    Ausencia
                                                </label>
                                                <label>
                                                    <input type="radio" name="is_absence" defaultChecked={!absencef_parameter.is_absence} disabled/>
                                                    Tardía
                                                </label>
                                            </div>
                                            <div className={style.hourcontainer}>
                                                <span style={{position: 'relative', top: '.2rem'}}>Hora: Desde las</span>
                                                <select name="from_hour" id="from_hour" disabled>
                                                        <option>{absencef_parameter.from_hour}</option>
                                                </select>
                                                <span style={{position: 'relative', top: '.2rem'}}>hasta las</span>
                                                <select name="to_hour" id="to_hour" disabled>
                                                    <option value="">{absencef_parameter.to_hour}</option>
                                                </select>

                                                {
                                                    absencef_parameter.is_absence &&(
                                                        <div className={style.leavinghour_container}>
                                                            <p style={{position: 'relative', top: '.2rem'}}>Saliendo del centro educativo a las<span>{absencef_parameter.leaving_at}</span></p>
                                                        </div>
                                                    )
                                                }

                                            </div>

                                            <div className={style.absencescontainer}>
                                                <p>Se ausentará: 
                                                    {(title_parameter.title_id == 2 && position_parameter == "Docente Academico") ?(
                                                        <span>{absencef_parameter.absent_time} Lecciones</span> 
                                                    ):(
                                                        <span>{absencef_parameter.absent_time} Horas</span> 
                                                    )}
                                                </p>
                                            </div>

                                            <div className={style.reasoncontainer}>
                                                <span style={{position: 'relative', top: '.2rem'}}>Motivo:</span>
                                                <select name="reason" id="reason" disabled>
                                                    <option value="">{reasons[absencef_parameter.reason]}</option>
                                                </select>

                                                {
                                                    absencef_parameter.reason == 2 && (
                                                        <div className={style.typeconvocatorycontainer}>
                                                            <span>Tipo de Convocatoria:</span>
                                                            <label>
                                                                <input type="radio" name="assembly_type" defaultChecked={absencef_parameter.assembly_type == 1} disabled/>
                                                                Regional
                                                            </label>
                                                            <label>
                                                                <input type="radio" name="assembly_type" defaultChecked={absencef_parameter.assembly_type == 2} disabled/>
                                                                Nacional
                                                            </label>
                                                            <label>
                                                                <input type="radio" name="assembly_type" defaultChecked={absencef_parameter.assembly_type == 3} disabled/>
                                                                Circuital
                                                            </label>
                                                            <label>
                                                                <input type="radio" name="assembly_type" defaultChecked={absencef_parameter.assembly_type == 4} disabled/>
                                                                Sindical
                                                            </label>
                                                        </div>
                                                    )
                                                }
                                            </div>

                                                {
                                                    absencef_parameter.reason== 3 &&(
                                                        <div className={style.explanationcontainer}>
                                                            <span>Explique:</span>  
                                                            <textarea name="personal_reason" id="personal_reason" defaultValue={absencef_parameter.personal_reason} className={style.explanation} disabled></textarea>
                                                        </div>
                                                    )
                                                }

                                            <div className={style.evidence}>
                                                <span>Adjunte comprobante o evidencia:</span>
                                                {
                                                    absencef_parameter.evidence_file_url != null ?(
                                                        <Link href={absencef_parameter.evidence_file_url} style={{width: '100%', fontStyle:'italic', color: '#616161'}}>
                                                            <div className={style.evidence_input}>
                                                                <p>Ver Archivo...</p>
                                                            </div>
                                                        </Link>
                                                    ):(
                                                        <div className={style.evidence_input}>
                                                            <p style={{fontStyle:'italic', color: '#616161'}}>No hay archivo</p>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className={style.solicitudestatus}>
                                                <p>Estado:</p>
                                                <>
                                                    {absencef_parameter.is_pending && (
                                                        <span style={{ color: '#DEAA00'}}>Pendiente</span>
                                                    )}
                                                    {absencef_parameter.is_approved && (
                                                        <span style={{ color: '#0B8300'}}>Aprobado</span>
                                                    )}
                                                    {absencef_parameter.is_denied && (
                                                        <span style={{ color: '#940202'}}>Denegado</span>
                                                    )}
                                                </>
                                            </div>
                                        </form>
                                    </div>
                                :(
                                    <div className={style.form_container}>
                                        <h1>Formulario de solicitud de permiso salida/ausencia/tardía/incapacidad</h1>
                                        <h2>No cuenta con ningún formulario de solicitud de permiso</h2>
                                    </div>
                                )}
                            </div>
                        </div>
                    ):(
                        <>
                            {absencef_parameter != undefined ?
                                <>
                                    {absencef_parameter.is_justified ?(
                                        <div className={style.permission_formularycontainer}>
                                            <p className={style.titleofformulary}>{!showresolution ? "Justificación:" : "Resolución"}</p>
                                            <div className={style.formulary_upperinformationcontainer}>
                                                <div className={style.cardname}>{fullName_parameter.full_name}</div>
                                                {
                                                    !showresolution &&
                                                    <div className={style.previewcard} onClick={() => setJShowPopup(true)}><Image src={"/Search.svg"} width={20} height={20} alt='magnifying-glass-icon' className={style.searchicon}></Image></div>}
                                            </div>
                                            <div className={style.cardcontainer}>
                                                <Image src={'/Card-header.svg'} width={20} height={20} alt='Form-header' className={style.cardheaderimg}/>
                                                {!showresolution ? (
                                                    <div className={style.form_container}>
                                                    <h1>Formulario de justificación de permiso salida/ausencia/tardía/incapacidad</h1>
                                                    <p style={{fontSize: '.9rem'}}><span>Importante:</span> Todo permiso de ausencia laboral está sujeto a cumplimiento de requisitos y copia adjunta de documento pertinente de cita, convocatoria o licencia, de ser posible con tres días de anticipación. Posterior a la ausencia, el funcionario debe hacer entrega del comprobante pertinente de asistencia en el plazo de 48 (cuarenta y ocho horas). Las licencias dependen de requisitos  previos para su goce. De no presentar el comprobante se transmitirá lo que corresponda.</p>
                                                    <form className={style.form}>
                                                        <div className={style.form_row2}>
                                                            <div className={style.justificationcontainer}>
                                                                <span>JUSTIFICO:</span>
                                                                <label>
                                                                    <input type="radio" name="is_absence" defaultChecked={justificationf_parameter.is_absence} disabled/>
                                                                    Ausencia
                                                                </label>
                                                                <label>
                                                                    <input type="radio" name="is_absence" defaultChecked={!justificationf_parameter.is_absence} disabled/>
                                                                    Tardía
                                                                </label>
                                                            </div>

                                                            <div className={style.inputdatecontainer}>
                                                                <label>DE LA FECHA:</label>
                                                                <input type="text" name="absence_date" id="absence_date" defaultValue={formatDate(justificationf_parameter.absence_date)} disabled/>
                                                                <span><Image src={"/calendar-regular.svg"} width={20} height={20} alt='Calendar' className={style.inputdate_calendar}></Image></span>
                                                            </div>

                                                            <div className={style.absent_timecontainer}>
                                                                <div className={style.absent_time_inputcontainer}>
                                                                    <input type="radio" name="is_all_day" disabled checked={justificationf_parameter.is_all_day}/>
                                                                    <label htmlFor='is_all_day'>Jornada Laboral Completa</label>
                                                                </div>

                                                                <div className={style.absent_time_inputcontainer}>
                                                                    <input type="radio" name="is_all_day" disabled checked={!justificationf_parameter.is_all_day}/>
                                                                    <label htmlFor='is_all_day'> Media Jornada </label>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className={style.form_timecontainer}>
                                                            <div className={style.absencescontainer2}>
                                                                {(title_parameter.title_id === 2 && position_parameter === "Docente Academico") ?(
                                                                    <>
                                                                        <p>{justificationf_parameter.absent_time}</p>
                                                                        <span>Lecciones</span>
                                                                    </>
                                                                ):(
                                                                    <> 
                                                                        <p>{justificationf_parameter.absent_time}</p>
                                                                        <span>Cantidad Horas</span>
                                                                    </>
                                                                )}
                                                            </div>
                                                            {
                                                                justificationf_parameter.is_absence &&(
                                                                    <div className={style.leavinghour_container}>
                                                                        <p>Saliendo del centro educativo a las</p>
                                                                        <span>{justificationf_parameter.leaving_at}</span>
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                        
                                                        <div className={style.reasoncontainer2}>
                                                            <span>Motivo:</span>
                                                            <select name="reasons" id="reasons" disabled value={fullName_parameter.justification_reason}>
                                                                <option value="">{reasons[justificationf_parameter.justification_reason]}</option>
                                                            </select>

                                                            {justificationf_parameter.justification_reason == "2" &&(
                                                                <div className={style.typeconvocatorycontainer}>
                                                                    <span>Tipo de Convocatoria:</span>
                                                                    <label>
                                                                        <input type="radio" name="assembly_type" defaultChecked={justificationf_parameter.assembly_type == 1} disabled/>
                                                                        Regional
                                                                    </label>
                                                                    <label>
                                                                        <input type="radio" name="assembly_type" defaultChecked={justificationf_parameter.assembly_type == 2} disabled/>
                                                                        Nacional
                                                                    </label>
                                                                    <label>
                                                                        <input type="radio" name="assembly_type" defaultChecked={justificationf_parameter.assembly_type == 3} disabled/>
                                                                        Circuital
                                                                    </label>
                                                                    <label>
                                                                        <input type="radio" name="assembly_type" defaultChecked={justificationf_parameter.assembly_type == 4} disabled/>
                                                                        Sindical
                                                                    </label>
                                                                </div>
                                                            )}
                                                        </div>

                                                            {
                                                                justificationf_parameter.justification_reason == 3 &&(
                                                                    <div className={style.explanationcontainer}>
                                                                        <span>Explique:</span>  
                                                                        <textarea name="personal_reason" id="personal_reason" defaultValue={justificationf_parameter.justification_text} className={style.explanation} disabled></textarea>
                                                                    </div>
                                                                )
                                                            }
                                                        <div className={style.isThere_attachement}>
                                                            <span>Adjunto comprobante:</span>
                                                            <label>
                                                                <input type="radio"  defaultChecked={justificationf_parameter.attachment_url != null} disabled/>
                                                                Si
                                                            </label>
                                                            <label>
                                                                <input type="radio"  defaultChecked={justificationf_parameter.attachment_url == null} disabled/>
                                                                No
                                                            </label>
                                                        </div>
                                                        
                                                        <div className={style.explanationcontainer}>
                                                            <span>Comentarios:</span>  
                                                            <textarea className={style.explanation} disabled defaultValue={justificationf_parameter.justification_comment}></textarea>
                                                        </div>

                                                        <div className={style.evidence2}>
                                                            <div style={{display: 'flex', gap: '1rem'}}>
                                                            <span>Comprobante o evidencia:</span>
                                                                {
                                                                    justificationf_parameter.attachment_url != null ?(
                                                                        <Link href={justificationf_parameter.attachment_url} style={{width: '6rem', fontStyle:'italic', color: '#616161'}}>
                                                                            <div className={style.evidence_input}>
                                                                                <p>Ver Archivo...</p>
                                                                            </div>
                                                                        </Link>
                                                                    ):(
                                                                        <div className={style.evidence_input}>
                                                                            <p style={{fontStyle:'italic', color: '#616161'}}>No hay archivo</p>
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                            <div className={style.buttonscontainer}>
                                                                <button type="button" onClick={()=> setShowresolution(true)} disabled={justificationf_parameter.justification_response_state == 0} style={justificationf_parameter.justification_response_state == 0 ? {color: 'var(--primary-disabled)'}:null}>{justificationf_parameter.justification_response_state != 0 ? "Revisar Resolución" : "No ha sido gestionada aún"}</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                                ):(
                                                    <>
                                                    
                                                        
                                                        <div className={style.form_container}>
                                                            <h1>Resolución de Justificación de permiso</h1>
                                                            <div className={style.datePopUp}>
                                                                <label htmlFor="date">Fecha:</label>
                                                                <input type="date" name="date" id="date" defaultValue={new Date().toLocaleDateString('en-CA')} disabled/>
                                                            </div>
                                                            <p>Quien suscribe, <span>M.SC. Laura Ramón Elizondo</span> en calidad de <span>Directora</span>, con base a las leyes y reglamentos vigentes, responde a solicitud de justificación de permiso; bajo la resolución de:</p>
                                                            <div className={style.radioContainerPopUp}>
                                                                <div className={style.radioPopUp}>
                                                                    <input type="radio" name="resolution" id="approve_partial" disabled defaultChecked={justificationf_parameter.justification_response_state == 1}/>
                                                                    <label htmlFor="approve_partial">Aceptado con rebajo salarial parcial.</label>
                                                                </div>
                                                                <div className={style.radioPopUp}>
                                                                    <input type="radio" name="resolution" id="approve_total" disabled defaultChecked={justificationf_parameter.justification_response_state == 2}/>
                                                                    <label htmlFor="approve_total">Aceptado con rebajo salarial total.</label>
                                                                </div>
                                                                <div className={style.radioPopUp}>
                                                                    <input type="radio" name="resolution" id="approve" disabled defaultChecked={justificationf_parameter.justification_response_state == 3}/>
                                                                    <label htmlFor="approve">Aceptado sin rebajo salarial.</label>
                                                                </div>
                                                                <div className={style.radioPopUp}>
                                                                    <input type="radio" name="resolution" id="deny" disabled defaultChecked={justificationf_parameter.justification_response_state == 4}/>
                                                                    <label htmlFor="deny">Denegó lo solicitado.</label>
                                                                </div>
                                                                <div className={style.radioPopUp}>
                                                                    <input type="radio" name="resolution" id="convocatory" disabled defaultChecked={justificationf_parameter.justification_response_state == 5}/>
                                                                    <label htmlFor="convocatory">Acoger convocatoria.</label>
                                                                </div>
                                                            </div>

                                                            <div className={style.commentResponse}>
                                                                <label htmlFor="justification_response_comment">Comentario</label>
                                                                <textarea name="justification_response_comment" id="justification_response_comment" defaultValue={justificationf_parameter.justification_response_comment} disabled></textarea>
                                                            </div>

                                                            <div className={style.buttonscontainer2}>
                                                                <button type="button" onClick={()=> setShowresolution(false)}>Volver</button>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ):(
                                        <div className={style.permission_formularycontainer}>
                                            <p className={style.titleofformulary}>{!showresolution ? "Justificación:" : "Resolución"}</p>
                                            <div className={style.formulary_upperinformationcontainer}>
                                                <div className={style.cardname}>{fullName_parameter.full_name}</div>
                                                {
                                                    (!showresolution && (absencef_parameter.is_justified && absencef_parameter != undefined)) &&
                                                    <div className={style.previewcard}><Image src={"/Search.svg"} width={20} height={20} alt='magnifying-glass-icon' className={style.searchicon}></Image></div>}
                                            </div>
                                                <div className={style.cardcontainer}>
                                                <Image src={'/Card-header.svg'} width={20} height={20} alt='Form-header' className={style.cardheaderimg}/>
                                                <div className={style.form_container}>
                                                    <h1>Formulario de justificación de permiso salida/ausencia/tardía/incapacidad</h1>
                                                    {(absencef_parameter.is_pending && absencef_parameter != undefined) &&
                                                        <>
                                                        <h2>Su solicitud de permiso aún no ha sido revisada.</h2>
                                                        <Link href={'/mipp/dashboard/'}>
                                                        <div className={style.buttonscontainer2}>
                                                            <button type="button">Volver a Inicio</button>
                                                        </div>
                                                        </Link>
                                                        </>
                                                    }
                                                    {(absencef_parameter.is_denied && absencef_parameter != undefined) &&
                                                        <>
                                                        <h2>Su solicitud de permiso ha sido rechazada.</h2>
                                                        <Link href={'/mipp/dashboard/'}>
                                                        <div className={style.buttonscontainer2}>
                                                            <button type="button">Volver a Inicio</button>
                                                        </div>
                                                        </Link>
                                                        </>
                                                    }
                                                    {(absencef_parameter.is_approved && absencef_parameter != undefined) &&
                                                        <>
                                                        <h2>No se ha realizado una justificación</h2>
                                                        <div className={style.clockcontainer}>
                                                            <p>Tiempo restante:</p>
                                                            <Image src={absencef_parameter.is_expired ? '/clock_expired.svg' : '/clock.svg'} width={23} height={20} alt='clock icon' className={style.clockicon}/>
                                                            <p style={!absencef_parameter ? {color: "red", textDecoration: "line-through"} : null}>{getTimeLeft(absencef_parameter.expire_date)}</p>
                                                        </div>
                                                        <Link href={`/mipp/solicitude/justification-formulary/${absencef_parameter.id}`}>
                                                        <div className={style.buttonscontainer2}>
                                                            <button type="button" disabled={absencef_parameter.is_expired}>{!absencef_parameter.is_expired ? "Ir a justificar":"La solicitud ha expirado"}</button>
                                                        </div>
                                                        </Link>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            :( 
                                <></>
                            )}
                        </>
                    )
                }
            </div>
            {
                showPopup && <SendPopup PPuserInfo_parameter={userInfo_parameter} PPposition_parameter={position_parameter} PPtitle_parameter={title_parameter} PPabsencef_parameter={absencef_parameter}  setShowPopup={setShowPopup}/>
            }
            {
                jshowPopup && <JSendPopup PPJuserInfo_parameter={userInfo_parameter} PPJposition_parameter={position_parameter} PPJtitle_parameter={title_parameter} PPjustificationf_parameter={justificationf_parameter} setJShowPopup={setJShowPopup} PPJfullName_parameter={fullName_parameter}/>
            }
        </div>
    )
}
function SendPopup({ PPabsencef_parameter, setShowPopup, PPuserInfo_parameter, PPtitle_parameter, PPposition_parameter, PPJfullName_parameter}){
    const reasons = ["", "Cita médica", "Convocatoria Asamblea", "Asuntos Personales"]
    return(
        <div className={style.popUpContainer}>
            <div className={style.popUpExit} onClick={() => setShowPopup(false)}><Image src={"/close.svg"} width={20} height={20} alt='Close_icon' className={style.Exit_icon}/></div>
            <div className={style.popUpCard}>
                <Image src={"/Card-header.svg"} width={20} height={20} alt='Form-header' className={style.cardheaderimg}/>
                <div className={style.form_container}>
                    <h1>Formulario de solicitud de permiso salida/ausencia/tardía/incapacidad</h1>
                    <p style={{fontSize: '.9rem'}}><span className={style.importantspan}>Importante:</span> Todo permiso de ausencia laboral está sujeto a cumplimiento de requisitos y copia adjunta de documento pertinente de cita, convocatoria o licencia, de ser posible con tres días de anticipación. Posterior a la ausencia, el funcionario debe hacer entrega del comprobante pertinente de asistencia en el plazo de 48 (cuarenta y ocho horas). Las licencias dependen de requisitos  previos para su goce. De no presentar el comprobante se transmitirá lo que corresponda.</p>
                    <p style={{marginTop: '.6em'}} className={style.personal_info}>Quien se suscribe, <span>{PPuserInfo_parameter.first_name + " " + PPuserInfo_parameter.last_name + " " + PPuserInfo_parameter?.second_last_name}</span>, con cédula de identidad <span>{PPuserInfo_parameter.id}</span>, quien labora en la institución educativa <span>CTP Mercedes Norte</span>, en el puesto de <span>{PPuserInfo_parameter.positions.position}</span>, en condición de <span>{PPuserInfo_parameter.has_ownership ? "Propietario" : "Interino"}</span> </p>
                
                <form className={style.form}>
                    <div className={style.form_row}>
                        <div className={style.inputdate_container}>
                            <label style={{position: 'relative', top: '.2rem'}}>PERMISO PARA AUSENTARSE EN LA FECHA:</label>
                            <input type="text" name="absence_date" disabled defaultValue={formatDate(PPabsencef_parameter.absence_date)}/>
                        </div>

                        <div className={style.inputradio_container}>
                            <label>
                                <input type="radio" name="is_whole_day" defaultChecked={PPabsencef_parameter.is_whole_day} disabled/>
                                Jornada Laboral Completa
                            </label>
                            <label>
                                <input type="radio" name="is_whole_day" defaultChecked={!PPabsencef_parameter.is_whole_day} disabled/>
                                Media Jornada
                            </label>
                        </div>
                    </div>
                    <div className={style.worktimeabsence_container}>
                        <p>Solicito permiso para:</p>
                        <label>
                            <input type="radio" name="is_absence" defaultChecked={PPabsencef_parameter.is_absence} disabled/>
                            Ausencia
                        </label>
                        <label>
                            <input type="radio" name="is_absence" defaultChecked={!PPabsencef_parameter.is_absence} disabled/>
                            Tardía
                        </label>
                    </div>

                    <div className={style.hourcontainer}>
                        <span style={{position: 'relative', top: '.2rem'}}>Hora: Desde las</span>
                        <select name="from_hour" id="from_hour" disabled>
                            <option>{PPabsencef_parameter.from_hour}</option>
                        </select>
                        <span style={{position: 'relative', top: '.2rem'}}>hasta las</span>
                        <select name="to_hour" id="to_hour" disabled>
                            <option value="">{PPabsencef_parameter.to_hour}</option>
                        </select>
                            {
                                PPabsencef_parameter.is_absence &&(
                                    <div className={style.leavinghour_container}>
                                        <p style={{position: 'relative', top: '.2rem'}}>Saliendo del centro educativo a las<span>{PPabsencef_parameter.leaving_at}</span></p>
                                    </div>
                                )
                            }
                    </div>

                    <div className={style.absencescontainer}>
                        <p>Se ausentará: 
                            {(PPtitle_parameter.title_id == 2 && PPposition_parameter == "Docente Academico") ?(
                                <span>{PPabsencef_parameter.absent_time} Lecciones</span> 
                            ):(
                                <span>{PPabsencef_parameter.absent_time} Horas</span> 
                            )}
                        </p>
                    </div>

                    <div className={style.reasoncontainer}>
                        <span style={{position: 'relative', top: '.2rem'}}>Motivo:</span>
                            <select name="reason" id="reason" disabled>
                                <option value="">{reasons[PPabsencef_parameter.reason]}</option>
                            </select>

                            {
                                PPabsencef_parameter.reason == 2 && (
                                    <div className={style.typeconvocatorycontainer}>
                                        <span>Tipo de Convocatoria:</span>
                                        <label>
                                            <input type="radio" name="assembly_type" defaultChecked={PPabsencef_parameter.assembly_type == 1} disabled/>
                                            Regional
                                        </label>
                                        <label>
                                            <input type="radio" name="assembly_type" defaultChecked={PPabsencef_parameter.assembly_type == 2} disabled/>
                                            Nacional
                                        </label>
                                        <label>
                                            <input type="radio" name="assembly_type" defaultChecked={PPabsencef_parameter.assembly_type == 3} disabled/>
                                            Circuital
                                        </label>
                                        <label>
                                            <input type="radio" name="assembly_type" defaultChecked={PPabsencef_parameter.assembly_type == 4} disabled/>
                                            Sindical
                                        </label>
                                    </div>
                                )
                            }
                    </div>

                    {
                        PPabsencef_parameter.reason== 3 &&(
                            <div className={style.explanationcontainer}>
                                <span>Explique:</span>  
                                <textarea name="personal_reason" id="personal_reason" defaultValue={PPabsencef_parameter.personal_reason} className={style.explanation} disabled></textarea>
                            </div>
                        )
                    }

                    <div className={style.evidence}>
                        <span>Adjunte comprobante o evidencia:</span>
                        {
                            PPabsencef_parameter.evidence_file_url != null ?(
                                <Link href={PPabsencef_parameter.evidence_file_url} style={{width: '100%', fontStyle:'italic', color: '#616161'}}>
                                    <div className={style.evidence_input}>
                                        <p>Ver Archivo...</p>
                                    </div>
                                </Link>
                            ):(
                                <div className={style.evidence_input}>
                                    <p style={{fontStyle:'italic', color: '#616161'}}>No hay archivo</p>
                                </div>
                            )
                        }
                    </div>

                    <div className={style.request_datecontainer}>
                        <p>Presento la solicitud a las <span>{formatDateandHour(PPabsencef_parameter.created_at).time}</span> del día <span>{formatDateandHour(PPabsencef_parameter.created_at).day}</span> del mes <span>{formatDateandHour(PPabsencef_parameter.created_at).month}</span> del año <span>{formatDateandHour(PPabsencef_parameter.created_at).year}</span></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}
function JSendPopup({setJShowPopup, PPjustificationf_parameter, PPJposition_parameter, PPJtitle_parameter, PPJuserInfo_parameter, PPJfullName_parameter}){
    const reasons = ["", "Cita médica", "Convocatoria Asamblea", "Asuntos Personales"]
    return(
        <div className={style.popUpContainer}>
            <div onClick={() => setJShowPopup(false)} className={style.popUpExit}><Image src={"/close.svg"} width={20} height={20} alt='Close_icon' className={style.Exit_icon}/></div>
            <div className={style.popUpCard}>
                <Image src={"/Card-header.svg"} width={20} height={20} alt='Form-header' className={style.cardheaderimg}/>
                <div className={style.form_container}>
                    <h1>Formulario de justificación de permiso salida/ausencia/tardía/incapacidad</h1>
                    <p style={{fontSize: '.9rem'}}><span className={style.importantspan}>Importante:</span> Todo permiso de ausencia laboral está sujeto a cumplimiento de requisitos y copia adjunta de documento pertinente de cita, convocatoria o licencia, de ser posible con tres días de anticipación. Posterior a la ausencia, el funcionario debe hacer entrega del comprobante pertinente de asistencia en el plazo de 48 (cuarenta y ocho horas). Las licencias dependen de requisitos  previos para su goce. De no presentar el comprobante se transmitirá lo que corresponda.</p>
                    <p style={{marginTop: '.6em'}} className={style.personal_info}>Quien se suscribe, <span>{PPJuserInfo_parameter.first_name + " " + PPJuserInfo_parameter.last_name + " " + PPJuserInfo_parameter?.second_last_name}</span>, con cédula de identidad <span>{PPJuserInfo_parameter.id}</span>, quien labora en la institución educativa <span>CTP Mercedes Norte</span>, en el puesto de <span>{PPJuserInfo_parameter.positions.position}</span>, en condición de <span>{PPJuserInfo_parameter.has_ownership ? "Propietario" : "Interino"}</span> </p>
                    
                    <form className={style.form}>
                        <div className={style.form_row2}>
                            <div className={style.justificationcontainer}>
                                <span>JUSTIFICO:</span>
                                <label>
                                    <input type="radio" name="is_absence" defaultChecked={PPjustificationf_parameter.is_absence} disabled/>
                                    Ausencia
                                </label>
                                <label>
                                    <input type="radio" name="is_absence" defaultChecked={!PPjustificationf_parameter.is_absence} disabled/>
                                    Tardía
                                </label>
                        </div>

                        <div className={style.inputdatecontainer}>
                            <label>DE LA FECHA:</label>
                            <input type="text" name="absence_date" id="absence_date" defaultValue={formatDate(PPjustificationf_parameter.absence_date)} disabled/>
                            <span><Image src={"/calendar-regular.svg"} width={20} height={20} alt='Calendar' className={style.inputdate_calendar}></Image></span>
                        </div>

                        <div className={style.absent_timecontainer}>

                            <div className={style.absent_time_inputcontainer}>
                                <input type="radio" name="is_all_day" disabled checked={PPjustificationf_parameter.is_all_day}/>
                                <label htmlFor='is_all_day'>Jornada Laboral Completa</label>
                            </div>

                            <div className={style.absent_time_inputcontainer}>
                                <input type="radio" name="is_all_day" disabled checked={!PPjustificationf_parameter.is_all_day}/>
                                <label htmlFor='is_all_day'> Media Jornada </label>
                                </div>
                            </div>

                        </div>

                        <div className={style.form_timecontainer}>
                            <div className={style.absencescontainer2}>
                                {(PPJtitle_parameter.title_id === 2 && PPJposition_parameter === "Docente Academico") ?(
                                    <>
                                        <p>{PPjustificationf_parameter.absent_time}</p>
                                        <span>Lecciones</span>
                                    </>
                                ):(
                                    <> 
                                        <p>{PPjustificationf_parameter.absent_time}</p>
                                        <span>Cantidad Horas</span>
                                    </>
                                )}
                            </div>
                            
                            {
                                PPjustificationf_parameter.is_absence &&(
                                    <div className={style.leavinghour_container}>
                                        <p>Saliendo del centro educativo a las</p>
                                        <span>{PPjustificationf_parameter.leaving_at}</span>
                                    </div>
                                )
                            }
                        </div>

                        <div className={style.reasoncontainer2}>
                            <span>Motivo:</span>
                            <select name="reasons" id="reasons" disabled value={PPJfullName_parameter.justification_reason}>
                                <option value="">{reasons[PPjustificationf_parameter.justification_reason]}</option>
                            </select>

                            {PPjustificationf_parameter.justification_reason == "2" &&(
                                <div className={style.typeconvocatorycontainer}>
                                    <span>Tipo de Convocatoria:</span>
                                    <label>
                                        <input type="radio" name="assembly_type" defaultChecked={PPjustificationf_parameter.assembly_type == 1} disabled/>
                                        Regional
                                    </label>
                                    <label>
                                        <input type="radio" name="assembly_type" defaultChecked={PPjustificationf_parameter.assembly_type == 2} disabled/>
                                        Nacional
                                    </label>
                                    <label>
                                        <input type="radio" name="assembly_type" defaultChecked={PPjustificationf_parameter.assembly_type == 3} disabled/>
                                        Circuital
                                    </label>
                                    <label>
                                        <input type="radio" name="assembly_type" defaultChecked={PPjustificationf_parameter.assembly_type == 4} disabled/>
                                        Sindical
                                    </label>
                                </div>
                            )}
                        </div>

                        {
                            PPjustificationf_parameter.justification_reason == 3 &&(
                                <div className={style.explanationcontainer}>
                                    <span>Explique:</span>  
                                    <textarea name="personal_reason" id="personal_reason" defaultValue={PPjustificationf_parameter.justification_text} className={style.explanation} disabled></textarea>
                                </div>
                            )
                        }

                        <div className={style.isThere_attachement}>
                            <span>Adjunto comprobante:</span>
                            <label>
                                <input type="radio"  defaultChecked={PPjustificationf_parameter.attachment_url != null} disabled/>
                                Si
                            </label>
                            <label>
                                <input type="radio"  defaultChecked={PPjustificationf_parameter.attachment_url == null} disabled/>
                                No
                            </label>
                        </div>
                        
                        <div className={style.explanationcontainer}>
                            <span>Comentarios:</span>  
                            <textarea className={style.explanation} disabled defaultValue={PPjustificationf_parameter.justification_comment}></textarea>
                        </div>

                        <div className={style.evidence2}>
                            <div style={{display: 'flex', gap: '1rem'}}>
                                <span>Comprobante o evidencia:</span>
                                {
                                    PPjustificationf_parameter.attachment_url != null ?(
                                        <div style={{width: '6rem', fontStyle:'italic', color: '#616161'}}>
                                            <div className={style.evidence_input}>
                                                <p>Ver Archivo...</p>
                                            </div>
                                        </div>
                                    ):(
                                        <div className={style.evidence_input}>
                                            <p style={{fontStyle:'italic', color: '#616161'}}>No hay archivo</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className={style.request_datecontainer}>
                            <p>Presento la solicitud a las <span>{formatDateandHour(PPjustificationf_parameter.created_at).time}</span> del día <span>{formatDateandHour(PPjustificationf_parameter.created_at).day}</span> del mes <span>{formatDateandHour(PPjustificationf_parameter.created_at).month}</span> del año <span>{formatDateandHour(PPjustificationf_parameter.created_at).year}</span></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}