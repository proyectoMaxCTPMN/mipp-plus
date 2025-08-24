'use client'

import { toast } from 'react-toastify'
import style from './permission-formulary.module.css'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { formatDate, formatDateandHour } from '@/app/utils/formatDate'

export default function Permission_Formulary_Page({userInfo_parameter, title_parameter, position_parameter, absencef_parameter}){
    const router = useRouter()
    const formData = absencef_parameter[0]
    const [showPopup, setShowPopup] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setShowPopup(true)
    }
    return(
        <div className={style.body}>
            <div className={style.container}>
                <div className={style.cardcontainer}>
                    <Image src={"/Card-header.svg"} width={20} height={20} alt='Form-header' className={style.cardheaderimg}/>
                    <div className={style.form_container}>
                        <h1>Formulario de solicitud de permiso salida/ausencia/tardía/incapacidad</h1>
                        <p><span>Importante:</span> Todo permiso de ausencia laboral está sujeto a cumplimiento de requisitos y copia adjunta de documento pertinente de cita, convocatoria o licencia, de ser posible con tres días de anticipación. Posterior a la ausencia, el funcionario debe hacer entrega del comprobante pertinente de asistencia en el plazo de 48 (cuarenta y ocho horas). Las licencias dependen de requisitos  previos para su goce. De no presentar el comprobante se transmitirá lo que corresponda.</p>
                        <p style={{marginTop: '.6em'}}>Quien se suscribe, <span>{userInfo_parameter.first_name + " " + userInfo_parameter.last_name + " " + userInfo_parameter?.second_last_name}</span>, con cédula de identidad <span>{userInfo_parameter.id}</span>, quien labora en la institución educativa <span>CTP Mercedes Norte</span>, en el puesto de <span>{userInfo_parameter.positions.position}</span>, en condición de <span>{userInfo_parameter.has_ownership ? "Propietario" : "Interino"}</span> </p>
                        <form className={style.form} onSubmit={handleSubmit}>
                            <div className={style.form_row}>

                                <div className={style.inputdate_container}>
                                    <label>PERMISO PARA AUSENTARSE EN LA FECHA:</label>
                                    <input type="text" name="absence_date" defaultValue={formatDate(formData.absence_date)} disabled/>
                                    <span ><Image src={"/calendar-regular.svg"} width={20} height={20} alt='Calendar' className={style.inputdate_calendar}></Image></span>
                                </div>

                                <div className={style.inputradio_container}>
                                    <label>
                                        <input type="radio" name="is_whole_day" defaultChecked={formData.is_whole_day} disabled/>
                                        Jornada Laboral Completa
                                    </label>
                                    <label>
                                        <input type="radio" name="is_whole_day" defaultChecked={!formData.is_whole_day} disabled/>
                                        Media Jornada
                                    </label>
                                </div>
                            </div>

                            <div className={style.worktimeabsence_container}>
                                <p>Solicito permiso para:</p>
                                <label>
                                    <input type="radio" name="is_absence" defaultChecked={formData.is_absence} disabled/>
                                    Ausencia
                                </label>
                                <label>
                                    <input type="radio" name="is_absence" defaultChecked={!formData.is_absence} disabled/>
                                    Tardía
                                </label>
                            </div>
                            <div className={style.hourcontainer}>

                                <span>Hora: Desde las</span>

                                <select name="from_hour" id="from_hour" defaultValue={formData.from_hour} disabled>
                                    <option value="">7:00</option>
                                    <option value="7:40">7:40</option>
                                    <option value="8:20">8:20</option>
                                    <option value="9:00">9:00</option>
                                    <option value="9:20">9:20</option>
                                    <option value="10:00">10:00</option>
                                    <option value="10:40">10:40</option>
                                    <option value="11:20">11:20</option>
                                    <option value="12:10">12:10</option>
                                    <option value="12:50">12:50</option>
                                    <option value="1:30">1:30</option>
                                    <option value="2:10">2:10</option>
                                    <option value="2:30">2:30</option>
                                    <option value="3:10">3:10</option>
                                    <option value="3:50">3:50</option>
                                    <option value="4:30">4:30</option>
                                </select>

                                <span>hasta las</span>

                                <select name="to_hour" id="to_hour" defaultValue={formData.to_hour} disabled>
                                    <option value="">7:40</option>
                                    <option value="8:20">8:20</option>
                                    <option value="9:00">9:00</option>
                                    <option value="9:20">9:20</option>
                                    <option value="10:00">10:00</option>
                                    <option value="10:40">10:40</option>
                                    <option value="11:20">11:20</option>
                                    <option value="12:10">12:10</option>
                                    <option value="12:50">12:50</option>
                                    <option value="1:30">1:30</option>
                                    <option value="2:10">2:10</option>
                                    <option value="2:30">2:30</option>
                                    <option value="3:10">3:10</option>
                                    <option value="3:50">3:50</option>
                                    <option value="4:30">4:30</option>
                                </select>

                                {
                                    formData.is_absence &&(
                                        <div className={style.leavinghour_container}>
                                            <p>Saliendo del centro educativo a las</p>
                                            <input type="text" name="leaving_at" defaultValue={formData.leaving_at} disabled/>
                                            
                                        </div>
                                    )
                                }
                            </div>

                            <div className={style.absencescontainer}>
                                <span>Se ausentará: </span>
                                {(title_parameter.title_id === 2 && position_parameter === "Docente Academico") ?(
                                    <>
                                        <input type="text" name="absent_time" id="absent_time" className={style.absencesinput} defaultValue={formData.absent_time} disabled/>
                                        <span>Lecciones</span>
                                    </>
                                ):(
                                    <> 
                                        <input type="text" name="absent_time" id="absent_time" className={style.absencesinput} defaultValue={formData.absent_time} disabled/>
                                        <span>Cantidad Horas</span>
                                    </>
                                )}
                            </div>
                            <div className={style.reasoncontainer}>
                                <span>Motivo:</span>
                                <select name="reason" id="reason" defaultValue={formData.reason} disabled>
                                    <option value="">Elija el motivo</option>
                                    <option value="1">Cita Médica</option>
                                    <option value="2">Convocatoria asamblea</option>
                                    <option value="3">Asuntos personales</option>
                                </select>
                                {formData.reason === "2" &&(
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

                            {formData.reason == "3" &&(
                                <div className={style.explanationcontainer}>
                                    <span>Explique:</span>  
                                    <textarea name="personal_reason" id="personal_reason" className={style.explanation} defaultValue={formData.personal_reason} disabled></textarea>
                                </div>
                            )}

                            <div className={style.evidence}>
                                {
                                    formData.evidence_file_url != null ?
                                        <>
                                        <p>Comprobante:</p>
                                        <Link href={formData.evidence_file_url} style={{fontStyle: 'italic', color: 'var(--primary-disabled)', fontWeight:'bold'}}>Ver archivo...</Link>
                                        </>
                                    :   
                                        <>
                                        <p>Comprobante:</p>
                                        <p>Sin archivo adjunto</p>
                                        </>
                                }
                            </div>
                            <div className={style.request_datecontainer}>
                                <p>Presento la solicitud a las <span>{formatDateandHour(formData.created_at).time}</span> del día <span>{formatDateandHour(formData.created_at).day}</span> del mes <span>{formatDateandHour(formData.created_at).month}</span> del año <span>{formatDateandHour(formData.created_at).year}</span></p>
                            </div>
                            <div className={style.buttonscontainer}>
                                <button type="submit">Manejar</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

            {
                showPopup && <SendPopup requestId_parameter={formData.id} router={router} setShowPopup={setShowPopup}/>
            }
        </div>
    )
}

function SendPopup({requestId_parameter, router, setShowPopup}){
    const [isAccept, setIsAccept] = useState(false)

    const handleSubmit = async () => {
        const data = new FormData()
        data.append('isAccept', isAccept)
        data.append('request_id', requestId_parameter)

        const response = await fetch(`/api/manage_absence`, {
            method: "POST",
            body: data
        })

        if (response.ok) {
            toast.success("Solicitud manejada exitosamente...!")
            router.push('/mipp/manage/dashboard')
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
                    <input type="text" name="date" id="date" defaultValue={new Date().toLocaleDateString() } disabled/>
                </div>
                <p>Quien suscribe, <span>M.SC. Laura Ramón Elizondo</span> en calidad de <span>Directora</span>, con base a las leyes y reglamentos vigentes, responde a solicitud de justificación de permiso; bajo la resolución de:</p>

                <div className={style.radioContainerPopUp}>
                    <div className={style.radioPopUp}>
                        <input type="radio" name="resolution" id="approve" onClick={() => setIsAccept(true)}/>
                        <label htmlFor="approve">Aprobar lo solicitado</label>
                    </div>

                    <div className={style.radioPopUp}>
                        <input type="radio" name="resolution" id="deny" onClick={() => setIsAccept(false)}/>
                        <label htmlFor="deny">Denegar lo solicitado</label>
                    </div>

                    <div className={style.radioPopUp}>
                        <input type="radio" name="resolution" id="convocatory" onClick={() => setIsAccept(true)}/>
                        <label htmlFor="convocatory">Acoger convocatoria</label>
                    </div>
                </div>

                <div className={style.inputContainer}>
                    <input type="button" value="Cancelar" className={style.btnPopUp} onClick={() => setShowPopup(false)}/>
                    <input type="button" value="Aceptar" className={style.btnPopUp} onClick={handleSubmit}/>
                </div>
                
            </div>
        </div>
    )
}