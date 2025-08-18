'use client'
import Image from 'next/image';
import style from './solicitude-detail.module.css'
import { useState } from 'react';
import Link from 'next/link'

export default function Solicitude_Detail({fullName_parameter, absencef_parameter,title_parameter,position_parameter,justificationf_parameter}){
    const [isSolicitudes, setIsSolicitudes] = useState(true);
    const reasons = ["", "Cita médica", "Convocatoria Asamblea", "Asuntos Personales"]
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
                                <div className={style.previewcard}><Image src={"/Search.svg"} width={20} height={20} alt='magnifying-glass-icon' className={style.searchicon}></Image></div>
                            </div>
                            <div className={style.cardcontainer}>
                                <Image src={"/Card-header.svg"} width={20} height={20} alt='Form-header' className={style.cardheaderimg}/>
                                <div className={style.form_container}>
                                    <h1>Formulario de solicitud de permiso salida/ausencia/tardía/incapacidad</h1>
                                    <p style={{fontSize: '.9rem'}}><span>Importante:</span> Todo permiso de ausencia laboral está sujeto a cumplimiento de requisitos y copia adjunta de documento pertinente de cita, convocatoria o licencia, de ser posible con tres días de anticipación. Posterior a la ausencia, el funcionario debe hacer entrega del comprobante pertinente de asistencia en el plazo de 48 (cuarenta y ocho horas). Las licencias dependen de requisitos  previos para su goce. De no presentar el comprobante se transmitirá lo que corresponda.</p>
                                
                                    <form className={style.form}>
                                        <div className={style.form_row}>

                                            <div className={style.inputdate_container}>
                                                <label style={{position: 'relative', top: '.2rem'}}>PERMISO PARA AUSENTARSE EN LA FECHA:</label>
                                                <input type="text" name="absence_date" disabled defaultValue={new Date(absencef_parameter.absence_date).toLocaleDateString('es-CR')}/>
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
                                    </form>
                                </div>
                            </div>
                        </div>
                    ):(
                        <div className={style.justification_formularycontainer}>
                            <p className={style.titleofformulary}>Justificación:</p>
                            {
                                absencef_parameter.is_justified ? (
                                <div className={style.formulary_upperinformationcontainer}>
                                    <div className={style.cardname}>{fullName_parameter.full_name}</div>
                                    <div className={style.previewcard}><Image src={"/Search.svg"} width={20} height={20} alt='magnifying-glass-icon' className={style.searchicon}></Image></div>

                                    <div className={style.cardcontainer}>
                                        <Image src={'/Card-header.svg'} width={20} height={20} alt='Form-header' className={style.cardheaderimg}/>
                                        <div className={style.form_container}>
                                            <h1>Formulario de justificación de permiso salida/ausencia/tardía/incapacidad</h1>
                                            <p><span>Importante:</span> Todo permiso de ausencia laboral está sujeto a cumplimiento de requisitos y copia adjunta de documento pertinente de cita, convocatoria o licencia, de ser posible con tres días de anticipación. Posterior a la ausencia, el funcionario debe hacer entrega del comprobante pertinente de asistencia en el plazo de 48 (cuarenta y ocho horas). Las licencias dependen de requisitos  previos para su goce. De no presentar el comprobante se transmitirá lo que corresponda.</p>

                                            <form className={style.form}>
                                                <div className={style.form_row}>
                                                    <div className={style.justificationcontainer}>
                                                        <span>JUSTIFICO:</span>
                                                        <label>
                                                            <input type="radio" name="is_absence" defaultChecked={justificationf_parameter} disabled/>
                                                            Ausencia
                                                        </label>
                                                        <label>
                                                            <input type="radio" name="is_absence" defaultChecked={!formData.is_absence} disabled/>
                                                            Tardía
                                                        </label>
                                                    </div>

                                                    <div className={style.inputdatecontainer}>
                                                        <label>DE LA FECHA:</label>
                                                        <input type="date" name="absence_date" id="absence_date" defaultValue={new Date(formData.absence_date).toLocaleDateString('af-za')} disabled/>
                                                        <span><Image src={"/calendar-regular.svg"} width={20} height={20} alt='Calendar' className={style.inputdate_calendar}></Image></span>
                                                    </div>

                                                    <div className={style.absent_timecontainer}>
                                                        <div className={style.absent_time_inputcontainer}>
                                                            <input type="radio" name="is_all_day" disabled checked={formData.is_all_day}/>
                                                            <label htmlFor='is_all_day'>Jornada Laboral Completa</label>
                                                        </div>

                                                        <div className={style.absent_time_inputcontainer}>
                                                            <input type="radio" name="is_all_day" disabled checked={!formData.is_all_day}/>
                                                            <label htmlFor='is_all_day'> Media Jornada </label>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className={style.form_timecontainer}>

                                                    <div className={style.absencescontainer}>
                                                        {(title_parameter.title_id === 2 && position_parameter === "Docente Academico") ?(
                                                            <>
                                                                <input type="text" name="absent_time" id="absent_time" defaultValue={formData.absent_time} disabled className={style.absencesinput}/>
                                                                <span>Lecciones</span>
                                                            </>
                                                        ):(
                                                            <> 
                                                                <input type="text" name="absent_time" id="absent_time" defaultValue={formData.absent_time} disabled className={style.absencesinput}/>
                                                                <span>Cantidad Horas</span>
                                                            </>
                                                        )}
                                                    </div>
                                                    
                                                    {
                                                        formData.is_absence &&(
                                                            <div className={style.leavinghour_container}>
                                                                <p>Saliendo del centro educativo a las</p>
                                                                <input type="text" name="leaving_at" defaultValue={formData.leaving_at} disabled/>
                                                            </div>
                                                        )
                                                    }
                                                    
                                                </div>
                                                
                                                <div className={style.reasoncontainer}>
                                                    <span>Motivo:</span>
                                                    <select name="reasons" id="reasons" disabled value={formData.justification_reason}>
                                                        <option value="">{reasons[absencef_parameter.reason]}</option>
                                                    </select>

                                                    {formData.justification_reason == "2" &&(
                                                        <div className={style.typeconvocatorycontainer}>
                                                            <span>Tipo de Convocatoria:</span>
                                                            <label>
                                                                <input type="radio" name="assembly_type" defaultChecked={formData.assembly_type == 1} disabled/>
                                                                Regional
                                                            </label>
                                                            <label>
                                                                <input type="radio" name="assembly_type" defaultChecked={formData.assembly_type == 2} disabled/>
                                                                Nacional
                                                            </label>
                                                            <label>
                                                                <input type="radio" name="assembly_type" defaultChecked={formData.assembly_type == 3} disabled/>
                                                                Circuital
                                                            </label>
                                                            <label>
                                                                <input type="radio" name="assembly_type" defaultChecked={formData.assembly_type == 4} disabled/>
                                                                Sindical
                                                            </label>
                                                        </div>
                                                    )}

                                                </div>

                                                    {
                                                        formData.justification_reason == 3 &&(
                                                            <div className={style.explanationcontainer}>
                                                                <span>Explique:</span>  
                                                                <textarea name="personal_reason" id="personal_reason" defaultValue={formData.justification_text} className={style.explanation} disabled></textarea>
                                                            </div>
                                                        )
                                                    }

                                                <div className={style.isThere_attachement}>
                                                        <span>Adjunto comprobante:</span>
                                                        <label>
                                                            <input type="radio" name="attachment_url" defaultChecked={hasAttachment}/>
                                                            Si
                                                        </label>
                                                        <label>
                                                            <input type="radio" name="attachment_url" defaultChecked={!hasAttachment}/>
                                                            No
                                                        </label>
                                                </div>
                                                
                                                <div className={style.explanationcontainer}>
                                                    <span>Comentarios:</span>  
                                                    <textarea 
                                                        name="justification_comment" 
                                                        id="justification_comment" 
                                                        value={formData.justification_comment}
                                                        onChange={(e) => setFormData((prev) => ({...prev, justification_comment: e.target.value}))} 
                                                        className={style.explanation}
                                                    />
                                                </div>
                                                    
                                                    {hasAttachment &&(
                                                    <div className={style.evidence}>
                                                        {
                                                            (hasAttachment && !changedInput && !inputFile) && (<><p>Utilizando archivo anterior</p> <Link className={style.evidence_link} href={formData.attachment_url}>Ver</Link> </>)
                                                        }

                                                        {
                                                            !hasAttachment && <p></p>
                                                        }

                                                        {
                                                            (hasAttachment && changedInput && inputFile) && <p>Utilizando {inputFile.name}</p>
                                                        }

                                                        {
                                                            (hasAttachment && changedInput && !inputFile) && <p>Sin Archivo (Recarga para reiniciar)</p>
                                                        }
                                                        
                                                        
                                                        <label htmlFor="attachment_url" className={style.evidence_label}>
                                                            {
                                                                hasAttachment
                                                                ?
                                                                    "Cambiar archivo"
                                                                :
                                                                    "Añadir nueva archivo"
                                                            }
                                                        </label>
                                                            
                                                        {(changedInput && inputFile) && <p className={style.input_name} onClick={() => setInputFile('')}>Eliminar Archivo</p>}
                                                            
                                                        <input 
                                                            type="file" 
                                                            name="attachment_url" 
                                                            id="attachment_url" 
                                                            onChange={(e) => {setChangedInput(true); setInputFile(e.target.files[0])}}
                                                            className={style.inputFile}
                                                        />
                                                    </div>
                                                )}

                                                <div className={style.buttonscontainer}>
                                                    <button type="button">Cancelar</button>
                                                    <button type="submit">Enviar</button>
                                                </div>

                                            </form>


                                        </div>
                                    </div>
                                </div>
                                ):(
                                    <></>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}
