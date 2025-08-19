'use client'

import style from './justification-formulary.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'


export default function Justification_Formulary_Page({userId_parameter, justif_parameter, userInfo_parameter, title_parameter, position_parameter}){
    const router = useRouter();
    const [formData, setFormData] = useState({
        userId: userId_parameter,
        id: justif_parameter.id,
        absence_date: justif_parameter.absence_date,
        is_absence: justif_parameter.is_absence,
        is_all_day: justif_parameter.is_whole_day,
        attachment_url: justif_parameter.attachment_url || null,
        justification_reason: justif_parameter.justification_reason,
        absent_time: justif_parameter.absent_time,
        justification_text: justif_parameter.justification_text || '',
        assembly_type: justif_parameter.assembly_type || '',
        leaving_at: justif_parameter.leaving_at,
        justification_comment: justif_parameter.justification_comment || ''
    })

    const [hasAttachment, setHasAttachment] = useState(justif_parameter.attachment_url ? true : false)
    const [showPopup, setShowPopup] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setShowPopup(true)
    }

    return(

    <div className={style.body}>
        <div className={style.container}>
            <div className={style.cardcontainer}>
                <Image src={'/Card-header.svg'} width={20} height={20} alt='Form-header' className={style.cardheaderimg}/>
                <div className={style.form_container}>
                    <h1>Formulario de justificación de permiso salida/ausencia/tardía/incapacidad</h1>
                    <p><span>Importante:</span> Todo permiso de ausencia laboral está sujeto a cumplimiento de requisitos y copia adjunta de documento pertinente de cita, convocatoria o licencia, de ser posible con tres días de anticipación. Posterior a la ausencia, el funcionario debe hacer entrega del comprobante pertinente de asistencia en el plazo de 48 (cuarenta y ocho horas). Las licencias dependen de requisitos  previos para su goce. De no presentar el comprobante se transmitirá lo que corresponda.</p>
                    <p>Quien se suscribe, <span>{userInfo_parameter.first_name + " " + userInfo_parameter.last_name + " " + userInfo_parameter?.second_last_name}</span>, con cédula de identidad <span>{userInfo_parameter.id}</span>, quien labora en la institución educativa <span>CTP Mercedes Norte</span>, en el puesto de <span>{userInfo_parameter.positions.position}</span>, en condición de <span>{userInfo_parameter.has_ownership ? "Propietario" : "Interino"}</span> </p>
                    <form className={style.form} onSubmit={handleSubmit}>

                        <div className={style.form_row}>
                            <div className={style.justificationcontainer}>
                                <span>JUSTIFICO:</span>
                                <label>
                                    <input type="radio" name="is_absence" defaultChecked={formData.is_absence} disabled/>
                                    Ausencia
                                </label>
                                <label>
                                    <input type="radio" name="is_absence" defaultChecked={!formData.is_absence} disabled/>
                                    Tardía
                                </label>
                            </div>

                            <div className={style.inputdatecontainer}>
                                <label>DE LA FECHA:</label>       
                                <span>
                                    <input type="date" name="absence_date" id="absence_date" defaultValue={new Date(formData.absence_date).toLocaleDateString('af-za')} disabled/>
                                    <Image src={"/calendar-regular.svg"} width={20} height={20} alt='Calendar' className={style.inputdate_calendar}></Image>
                                </span>
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
                                        <span>Cantidad Horas</span>
                                        <input type="text" name="absent_time" id="absent_time" defaultValue={formData.absent_time} disabled className={style.absencesinput}/>
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
                            <select name="reasons" id="reasons" disabled value={formData.justification_reason} onChange={e => setSelectedreason(e.target.value)}>
                                <option value="">Elija el motivo</option>
                                <option value="1">Cita Médica</option>
                                <option value="2">Convocatoria asamblea</option>
                                <option value="3">Asuntos personales</option>
                                <option value="4">Enfermedad</option>
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
                                    <input type="radio" name="attachment_url" defaultChecked={hasAttachment} disabled />
                                    Si
                                </label>
                                <label>
                                    <input type="radio" name="attachment_url" defaultChecked={!hasAttachment} disabled />
                                    No
                                </label>
                        </div>
                        
                        <div className={style.explanationcontainer}>
                            <span>Comentarios:</span>  
                            <textarea 
                                name="justification_comment" 
                                id="justification_comment" 
                                defaultValue={formData.justification_comment}
                                disabled
                                className={style.explanation}
                            />
                        </div>
                            
                            {hasAttachment &&(
                            <div className={style.evidence}>
                                {
                                    (hasAttachment ) ? 
                                        (<><Link className={style.evidence_link} href={ formData.attachment_url}>Ver archivo adjunto</Link> </>)
                                    :
                                        (<><p>Sin archivo adjunto</p></>)
                                }
                                
                            </div>
                        )}

                        <div className={style.buttonscontainer}>
                            <button type="submit">Manejar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
            {
                showPopup && <SendPopup justiId_parameter={formData.id} router={router} setShowPopup={setShowPopup}/>
            }
        </div>
)}


function SendPopup({justiId_parameter, router, setShowPopup}){
    const [form, setForm] = useState('')
    const [comment, setComment] = useState('')

    const handleSubmit = async () => {
        const data = new FormData()
        data.append('justification_response_state', form)
        data.append('justification_id', justiId_parameter)
        data.append('justification_response_comment', comment)

        const response = await fetch(`/api/manage_justi`, {
            method: "POST",
            body: data
        })

        if (response.ok) {
            toast.success("Justificacion manejada exitosamente...!")
            router.back()
            router.refresh()
        }else{
            toast.error("Hubo un error al manejar la solicitud")
            router.refresh()
            
        }
    }

    return(
        <div className={style.popUpContainer}>
            <div className={style.popUpCard}>
                
                <Image src={"/Card-header.svg"} width={20} height={20} alt='Form-header' className={style.cardheaderimg}/>
                <div className={style.datePopUp}>
                    <label htmlFor="date">Fecha:</label>
                    <input type="date" name="date" id="date" defaultValue={new Date().toLocaleDateString('en-CA')} disabled/>
                </div>
                <p>Quien suscribe, <span>M.SC. Laura Ramón Elizondo</span> en calidad de <span>Directora</span>, con base a las leyes y reglamentos vigentes, responde a solicitud de justificación de permiso; bajo la resolución de:</p>

                <div className={style.radioContainerPopUp}>
                    <div className={style.radioPopUp}>
                        <input type="radio" name="resolution" id="approve_partial" onClick={() => setForm("1")}/>
                        <label htmlFor="approve_partial">Aceptar con rebajo salarial parcial.</label>
                    </div>

                    <div className={style.radioPopUp}>
                        <input type="radio" name="resolution" id="approve_total" onClick={() => setForm("2")}/>
                        <label htmlFor="approve_total">Aceptar con rebajo salarial total.</label>
                    </div>

                    <div className={style.radioPopUp}>
                        <input type="radio" name="resolution" id="approve" onClick={() => setForm("3")}/>
                        <label htmlFor="approve">Aceptar sin rebajo salarial.</label>
                    </div>

                    <div className={style.radioPopUp}>
                        <input type="radio" name="resolution" id="deny" onClick={() => setForm("4")}/>
                        <label htmlFor="deny">Denegar lo solicitado.</label>
                    </div>

                    <div className={style.radioPopUp}>
                        <input type="radio" name="resolution" id="convocatory" onClick={() => setForm("5")}/>
                        <label htmlFor="convocatory">Acoger convocatoria.</label>
                    </div>
                </div>

                <div className={style.commentResponse}>
                    <label htmlFor="justification_response_comment">Comentario</label>
                    <textarea name="justification_response_comment" id="justification_response_comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                </div>

                <div className={style.inputContainer}>
                    <input type="button" value="Cancelar" className={style.btnPopUp} onClick={() => setShowPopup(false)}/>
                    <input type="button" value="Aceptar" className={style.btnPopUp} onClick={handleSubmit}/>
                    
                </div>
                
            </div>
        </div>
    )
}