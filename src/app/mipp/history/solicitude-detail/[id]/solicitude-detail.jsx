'use client'
import Image from 'next/image';
import style from './solicitude-detail.module.css'
import { useState } from 'react';
import Link from 'next/link'
import { formatDate, formatDateandHour } from '@/app/utils/formatDate'
import BasicAbsenceForm_Detail from '@/app/mipp/components/forms/absence/basic_detail/BasicAbsenceForm_Detail'
import DetailJustiForm from '@/app/mipp/components/forms/justification/detail/DetailJustiForm'
import FormTemplate from '@/app/mipp/components/forms/FormTemplate'
import { Accordion, AccordionItem, Chip } from '@heroui/react';
import generarPDF from '@/app/utils/generarPDF'


export default function Solicitude_Detail({fullName_parameter, absencef_parameter,title_parameter,position_parameter,justificationf_parameter, userInfo_parameter}){
    const [isSolicitudes, setIsSolicitudes] = useState(true);
    const reasons = ["", "Cita médica", "Convocatoria Asamblea", "Asuntos Personales"]
    const [showresolution, setShowresolution] = useState(false);
    const [jshowPopup2, setJShowPopup2] = useState(false)
    function getTimeLeft(expired_date) {
    const now = new Date();
    const expire = new Date(expired_date);

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
                        <>
                            {absencef_parameter != undefined ?
                                <FormTemplate  fullName_parameter={fullName_parameter.full_name} onDownloadClick={
                                    () => generarPDF({
                                        fecha_solicitud: formatDate(absencef_parameter.absence_date),
                                        fecha_ausencia: formatDate(absencef_parameter.absence_date),
                                        tipo_falta: absencef_parameter.is_whole_day ? 'Jornada Laboral Completa' : 'Media Jornada',
                                        desde_las: absencef_parameter.from_hour,
                                        hasta_las: absencef_parameter.to_hour,
                                        horas_ausente: absencef_parameter.absent_time,
                                        motivo: absencef_parameter.reason,
                                        esta_aprovado: absencef_parameter.is_approved ? 'Si' : 'No',
                                        esta_denegado: absencef_parameter.is_denied ? 'Si' : 'No',
                                        esta_pendiente: absencef_parameter.is_pending ? 'Si' : 'No'
                                    }, "Formulario de solicitud de permiso salida/ausencia/tardía/incapacidad", fullName_parameter.full_name)
                                }>
                                    <BasicAbsenceForm_Detail  
                                        title_parameter={title_parameter}
                                        absencef={absencef_parameter}
                                        PPuserInfo_parameter={userInfo_parameter}
                                    />

                                </FormTemplate>
                            :(
                                <FormTemplate fullName_parameter={fullName_parameter.full_name}>
                                    <div className={style.form_container}>
                                        <h1>Formulario de solicitud de permiso salida/ausencia/tardía/incapacidad</h1>
                                        <h2>No cuenta con ningún formulario de solicitud de permiso</h2>
                                    </div>
                                </FormTemplate>

                            )}
                        </>


                    ):(
                        <>
                            {absencef_parameter != undefined ?
                                <>
                                    {absencef_parameter.is_justified ?( 
                                        !showresolution ? (

                                            <FormTemplate fullName_parameter={fullName_parameter.full_name} onDownloadClick={
                                                () => generarPDF({
                                                    fecha_solicitud: formatDate(absencef_parameter.absence_date),
                                                    fecha_ausencia: formatDate(absencef_parameter.absence_date),
                                                    tipo_falta: absencef_parameter.is_whole_day ? 'Jornada Laboral Completa' : 'Media Jornada',
                                                    desde_las: absencef_parameter.from_hour,
                                                    hasta_las: absencef_parameter.to_hour,
                                                    horas_ausente: absencef_parameter.absent_time,
                                                    motivo: absencef_parameter.reason,
                                                    esta_aprovado: absencef_parameter.is_approved ? 'Si' : 'No',
                                                    esta_denegado: absencef_parameter.is_denied ? 'Si' : 'No',
                                                    esta_pendiente: absencef_parameter.is_pending ? 'Si' : 'No'
                                                }, "Formulario de solicitud de permiso salida/ausencia/tardía/incapacidad", fullName_parameter.full_name)
                                            }>
                                                <DetailJustiForm 
                                                    justification_parameter={justificationf_parameter} 
                                                    PPuserInfo_parameter={userInfo_parameter}
                                                    title_parameter={title_parameter} 
                                                    position_parameter={position_parameter} 
                                                />
                                                
                                                {
                                                    justificationf_parameter.justification_response_comment != '' &&

                                                    <Accordion variant='shadow' className='mt-3 '>
                                                        <AccordionItem key="1" className='justify-center' aria-label="Comment" title="Comentario del superior" startContent={<Chip color='danger' className='relative bottom-[5px]'>Importante!</Chip>}>
                                                            {justificationf_parameter.justification_response_comment}
                                                        </AccordionItem>
                                                    </Accordion>
                                                }
                                            </FormTemplate>

                                        ):
                                        (
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
                                        )
                                    ):(
                                        <div className={style.justification_formularycontainer}>
                                            <p className={style.titleofformulary}>{!showresolution ? "Justificación:" : "Resolución"}</p>
                                            <div className={style.formulary_upperinformationcontainer}>
                                                <div className={style.cardname}>{fullName_parameter.full_name}</div>
                                                {
                                                    (!showresolution && absencef_parameter.is_justified) &&
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
                                <div className={style.justification_formularycontainer}>
                                    <p className={style.titleofformulary}>{!showresolution ? "Justificación:" : "Resolución"}</p>
                                    <div className={style.formulary_upperinformationcontainer}>
                                        <div className={style.cardname}>{fullName_parameter.full_name}</div>
                                        {
                                            !showresolution &&
                                            <div className={style.previewcard}  onClick={() => setJShowPopup2(true)}><Image src={"/Search.svg"} width={20} height={20} alt='magnifying-glass-icon' className={style.searchicon}></Image></div>
                                        }
                                    </div>

                                    <div className={style.cardcontainer}>
                                        <Image src={'/Card-header.svg'} width={20} height={20} alt='Form-header' className={style.cardheaderimg}/>
                                        {!showresolution ? (
                                            <div className={style.form_container}>
                                                <h1>Formulario de justificación de permiso salida/ausencia/tardía/incapacidad</h1>
                                                <p style={{fontSize: '.9rem'}}><span>Importante:</span> Todo permiso de ausencia laboral está sujeto a cumplimiento de requisitos y copia adjunta de documento pertinente de cita, convocatoria o licencia, de ser posible con tres días de anticipación. Posterior a la ausencia, el funcionario debe hacer entrega del comprobante pertinente de asistencia en el plazo de 48 (cuarenta y ocho horas). Las licencias dependen de requisitos  previos para su goce. De no presentar el comprobante se transmitirá lo que corresponda.</p>
                                                <form className={style.form}>
                                                    <div className={style.form_row}>
                                                        <div className={style.inputdatecontainer}>
                                                            <label>DE LA FECHA:</label>
                                                            <input type="text" name="absence_date" id="absence_date" defaultValue={formatDate(justificationf_parameter.absence_date)} disabled/>
                                                            <span><Image src={"/calendar-regular.svg"} width={20} height={20} alt='Calendar' className={style.inputdate_calendar}></Image></span>
                                                        </div>
                                                        <div className={style.inputradio_container}>
                                                            <label>
                                                                <input type="radio" name="is_all_day" defaultChecked={justificationf_parameter.is_all_day} disabled/>
                                                                Jornada Laboral Completa
                                                            </label>
                                                            <label>
                                                                <input type="radio" name="is_all_day" defaultChecked={!justificationf_parameter.is_all_day} disabled/>
                                                                Media Jornada
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <div className={style.worktimeabsence_container}>
                                                        <p>Justifico:</p>
                                                        <label>
                                                            <input type="radio" name="is_absence" defaultChecked={justificationf_parameter.is_absence} disabled/>
                                                            Ausencia
                                                        </label>
                                                        <label>
                                                            <input type="radio" name="is_absence" defaultChecked={!justificationf_parameter.is_absence} disabled/>
                                                            Tardía
                                                        </label>
                                                    </div>

                                                    <div className={style.hourcontainer}>
                                                        <span>Hora: Desde las</span>
                                                        <select name="from_hour" id="from_hour" defaultValue={justificationf_parameter.from_hour} disabled>
                                                            <option value="">{justificationf_parameter.from_hour}</option>
                                                        </select>
                                                        <span>hasta las</span>
                                                        <select name="to_hour" id="to_hour" defaultValue={justificationf_parameter.to_hour}>
                                                            <option value="">{justificationf_parameter.to_hour}</option>
                                                        </select>
                                                        {
                                                            justificationf_parameter.is_absence &&(
                                                                <div className={style.leavinghour_container}>
                                                                    <p>Saliendo del centro educativo a las</p>
                                                                    <span>{justificationf_parameter.leaving_at}</span>
                                                                </div>
                                                            )
                                                        }
                                                    </div>

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
                                                    
                                                    <div className={style.reasoncontainer2}>
                                                        <span>Motivo:</span>
                                                        <select name="reasons" id="reasons" disabled value={justificationf_parameter.justification_reason}>
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
                                            )
                                        }
                                    </div>
                                </div>
                            )}
                        </>
                    )
                }
            </div>

            {
                jshowPopup2 && <JSendPopup2 PPJuserInfo_parameter={userInfo_parameter} PPJposition_parameter={position_parameter} PPJtitle_parameter={title_parameter} PPjustificationf_parameter={justificationf_parameter} setJShowPopup2={setJShowPopup2} PPJfullName_parameter={fullName_parameter}/>
            }
        </div>
    )
}



function JSendPopup2({setJShowPopup2, PPjustificationf_parameter, PPJposition_parameter, PPJtitle_parameter, PPJuserInfo_parameter}){
    const reasons = ["", "Cita médica", "Convocatoria Asamblea", "Asuntos Personales"]
    return(
        <div className={style.popUpContainer}>
            <div onClick={() => setJShowPopup2(false)} className={style.popUpExit}><Image src={"/close.svg"} width={20} height={20} alt='Close_icon' className={style.Exit_icon}/></div>
            <div className={style.popUpCard}>
                <Image src={"/Card-header.svg"} width={20} height={20} alt='Form-header' className={style.cardheaderimg}/>
                <div className={style.form_container}>
                    <h1>Formulario de justificación de permiso salida/ausencia/tardía/incapacidad</h1>
                    <p style={{fontSize: '.9rem'}}><span className={style.importantspan}>Importante:</span> Todo permiso de ausencia laboral está sujeto a cumplimiento de requisitos y copia adjunta de documento pertinente de cita, convocatoria o licencia, de ser posible con tres días de anticipación. Posterior a la ausencia, el funcionario debe hacer entrega del comprobante pertinente de asistencia en el plazo de 48 (cuarenta y ocho horas). Las licencias dependen de requisitos  previos para su goce. De no presentar el comprobante se transmitirá lo que corresponda.</p>
                    <p style={{marginTop: '.6em'}} className={style.personal_info}>Quien se suscribe, <span>{PPJuserInfo_parameter.first_name + " " + PPJuserInfo_parameter.last_name + " " + PPJuserInfo_parameter?.second_last_name}</span>, con cédula de identidad <span>{PPJuserInfo_parameter.id}</span>, quien labora en la institución educativa <span>CTP Mercedes Norte</span>, en el puesto de <span>{PPJuserInfo_parameter.positions.position}</span>, en condición de <span>{PPJuserInfo_parameter.has_ownership ? "Propietario" : "Interino"}</span> </p>
                    <form className={style.form}>
                        <div className={style.form_row}>
                            <div className={style.inputdatecontainer}>
                                <label>DE LA FECHA:</label>
                                <input type="text" name="absence_date" id="absence_date" defaultValue={formatDate(PPjustificationf_parameter.absence_date)} disabled/>
                                <span><Image src={"/calendar-regular.svg"} width={20} height={20} alt='Calendar' className={style.inputdate_calendar}></Image></span>
                            </div>

                            <div className={style.inputradio_container}>
                                <label>
                                    <input type="radio" name="is_all_day" defaultChecked={PPjustificationf_parameter.is_all_day} disabled/>
                                    Jornada Laboral Completa
                                </label>
                                <label>
                                    <input type="radio" name="is_all_day" defaultChecked={!PPjustificationf_parameter.is_all_day} disabled/>
                                    Media Jornada
                                </label>
                            </div>
                        </div>

                        <div className={style.worktimeabsence_container}>
                            <p>Justifico:</p>
                            <label>
                                <input type="radio" name="is_absence" defaultChecked={PPjustificationf_parameter.is_absence} disabled/>
                                Ausencia
                            </label>
                            <label>
                                <input type="radio" name="is_absence" defaultChecked={!PPjustificationf_parameter.is_absence} disabled/>
                                Tardía
                            </label>
                        </div>

                        <div className={style.hourcontainer}>
                            <span>Hora: Desde las</span>
                            <select name="from_hour" id="from_hour" defaultValue={PPjustificationf_parameter.from_hour} disabled>
                                <option value="">{PPjustificationf_parameter.from_hour}</option>
                            </select>
                            <span>hasta las</span>
                            <select name="to_hour" id="to_hour" defaultValue={PPjustificationf_parameter.to_hour}>
                                <option value="">{PPjustificationf_parameter.to_hour}</option>
                            </select>
                            {
                                PPjustificationf_parameter.is_absence &&(
                                    <div className={style.leavinghour_container}>
                                        <p>Saliendo del centro educativo a las</p>
                                        <span>{PPjustificationf_parameter.leaving_at}</span>
                                    </div>
                                )
                            }
                        </div>
                        
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
                        
                        <div className={style.reasoncontainer2}>
                            <span>Motivo:</span>
                            <select name="reasons" id="reasons" disabled value={PPjustificationf_parameter.justification_reason}>
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
                            PPjustificationf_parameter.justification_reason == 3 &&(
                                <div className={style.explanationcontainer}>
                                    <span>Explique:</span>  
                                    <textarea name="personal_reason" id="personal_reason" defaultValue={justificationf_parameter.justification_text} className={style.explanation} disabled></textarea>
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