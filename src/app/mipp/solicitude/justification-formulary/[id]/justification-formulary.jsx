'use client'

import style from './justification-formulary.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'


export default function Justification_Formulary_Page({userId_parameter, request_id_parameter, fullName_parameter, title_parameter, position_parameter, absenceData_parameter}){
    const router = useRouter();
    const [formData, setFormData] = useState({
        userId: userId_parameter,
        request_id: request_id_parameter,
        absence_date: absenceData_parameter.absence_date,
        justification_category: absenceData_parameter.is_whole_day ? "Ausencia" : "Tardía",
        is_all_day: absenceData_parameter.is_whole_day,
        attachment_url: absenceData_parameter.evidence_file_url || null,
        justification_reason: absenceData_parameter.reason,
        absent_time: absenceData_parameter.absent_time,
        justification_text: absenceData_parameter.personal_reason || '',
        assembly_type: absenceData_parameter.assembly_type || '',
    })

    const [hasAttachment, setHasAttachment] = useState(absenceData_parameter.evidence_file_url ? true : false)
    const [changedInput, setChangedInput] = useState(false)
    const [inputFile, setInputFile] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value)
        })

        if (changedInput) {
            data.append("changed_input", true)
            data.append("new_attachment", inputFile)
        }

        const response = await fetch(`/api/save_justi`, {
            method: "POST",
            body: data
        })

        const dataResponse = await response.json()

        if (response.ok) {
            toast.success("Solicitud enviada exitosamente...!")
            router.refresh()
        }else{
            toast.error("Hubo un error al enviar la solicitud")
            console.error(dataResponse)
            
        }
    }

    return(

    <div className={style.body}>
        <div className={style.container}>
            <div className={style.cardname}>{fullName_parameter.full_name}</div>

            <div className={style.cardcontainer}>
                <Image src={'/Card-header.svg'} width={20} height={20} alt='Form-header' className={style.cardheaderimg}/>
                <div className={style.form_container}>
                    <h1>Formulario de justificación de permiso salida/ausencia/tardía/incapacidad</h1>
                    <p><span>Importante:</span> Todo permiso de ausencia laboral está sujeto a cumplimiento de requisitos y copia adjunta de documento pertinente de cita, convocatoria o licencia, de ser posible con tres días de anticipación. Posterior a la ausencia, el funcionario debe hacer entrega del comprobante pertinente de asistencia en el plazo de 48 (cuarenta y ocho horas). Las licencias dependen de requisitos  previos para su goce. De no presentar el comprobante se transmitirá lo que corresponda.</p>

                    <form className={style.form} onSubmit={handleSubmit}>

                        <div className={style.form_row}>
                            
                            <div className={style.justificationcontainer}>
                                <span>JUSTIFICO:</span>
                                <label>
                                    <input type="radio" name="is_absence" onChange={(e) => changeRadio(e, true)}/>
                                    Ausencia
                                </label>
                                <label>
                                    <input type="radio" name="is_absence" onChange={(e) => changeRadio(e, false)}/>
                                    Tardía
                                </label>
                            </div>

                            <div className={style.inputdatecontainer}>
                                <label>DE LA FECHA:</label>
                                <input type="date" name="absence_date" id="absence_date" defaultValue={new Date(formData.absence_date).toLocaleDateString('af-za')} disabled/>
                                <span><Image src={"/calendar-regular.svg"} width={20} height={20} alt='Calendar' className={style.inputdate_calendar}></Image></span>
                            </div>

                        </div>

                        <div className={style.isThere_attachement}>
                            <span>Adjunto comprobante:</span>
                            <label>
                                <input type="radio" name="attachment_url" defaultChecked={hasAttachment} onClick={() => setHasAttachment(true)} />
                                Si
                            </label>
                            <label>
                                <input type="radio" name="attachment_url" defaultChecked={!hasAttachment} onClick={() => setHasAttachment(false)} />
                                No
                            </label>
                        </div>

                        <div className={style.form_row}>
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

                            <div className={style.absencescontainer}>
                                {(title_parameter.title_id === 2 && position_parameter === "Docente Academico") ?(
                                    <>
                                        <input type="text" name="absent_time" id="absent_time" value={formData.absent_time} disabled className={style.absencesinput}/>
                                        <span>Lecciones</span>
                                    </>
                                ):(
                                    <> 
                                        <input type="text" name="absent_time" id="absent_time" value={formData.absent_time} disabled className={style.absencesinput}/>
                                        <span>Cantidad Horas</span>
                                    </>
                                )}
                            </div>
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
                        </div>

                        {formData.justification_reason == "2" &&(
                            <div className={style.typeconvocatorycontainer}>
                            <span>Tipo de Convocatoria:</span>
                            <label>
                                <input type="radio" name="assembly_type" defaultChecked={formData.assembly_type == 1} disabled/>
                                Sindical
                            </label>
                            <label>
                                <input type="radio" name="assembly_type" defaultChecked={formData.assembly_type == 2} disabled/>
                                Regional
                            </label>
                            <label>
                                <input type="radio" name="assembly_type" defaultChecked={formData.assembly_type == 3} disabled/>
                                Nacional
                            </label>
                        </div>
                        )}

                        {hasAttachment &&(
                            <div className={style.evidence}>
                                {
                                    (hasAttachment && !changedInput && !inputFile) && (<><p>Utilizando archivo de la solicitud</p> <Link className={style.evidence_link} href={formData.attachment_url}>Ver</Link> </>)
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

                        <div className={style.explanationcontainer}>

                            {
                                formData.justification_reason == 3
                            }
                            <span>Comentarios:</span>  
                            <textarea 
                                name="justification_text" 
                                id="justification_text" 
                                value={formData.justification_text} 
                                onChange={(e) => setFormData((prev) => ({...prev, justification_text: e.target.value}))} 
                                className={style.explanation}
                            />
                        </div>

                        <div className={style.buttonscontainer}>
                            <button type="submit">Enviar</button>
                        </div>
                    </form>


                </div>
            </div>
        </div>
        </div>
)}