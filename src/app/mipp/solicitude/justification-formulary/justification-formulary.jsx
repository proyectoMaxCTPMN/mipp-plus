'use client'

import Navbar from '../../components/nav/Navbar'
import style from './justification-formulary.module.css'
import Image from 'next/image'
import {useState} from 'react'

export default function Justification_Formulary_Page({fullName_parameter, title_parameter, position_parameter}){
const [selectedreason, setSelectedreason] = useState('');
const [hasAttachment, setHasAttachment] = useState(false);

    const handleCalendarClick = () => {
        if (inputRef.current) {
            if (inputRef.current.showPicker) {
                inputRef.current.showPicker(); // Navegadores modernos
            } else {
                inputRef.current.focus(); // Fallback
            }
        }
    };

    return(

    <div className={style.body}>
        <div className={style.container}>
            <div className={style.cardname}>{fullName_parameter.full_name}</div>
            <div className={style.cardcontainer}>
                <Image src={'/Card-header.svg'} width={20} height={20} alt='Form-header' className={style.cardheaderimg}/>
                <div className={style.form_container}>
                    <h1>Formulario de justificación de permiso salida/ausencia/tardía/incapacidad</h1>
                    <p><span>Importante:</span> Todo permiso de ausencia laboral está sujeto a cumplimiento de requisitos y copia adjunta de documento pertinente de cita, convocatoria o licencia, de ser posible con tres días de anticipación. Posterior a la ausencia, el funcionario debe hacer entrega del comprobante pertinente de asistencia en el plazo de 48 (cuarenta y ocho horas). Las licencias dependen de requisitos  previos para su goce. De no presentar el comprobante se transmitirá lo que corresponda.</p>
                    <form className={style.form}>
                        <div className={style.form_row}>
                            <div className={style.justificationcontainer}>
                                <span>JUSTIFICO:</span>
                                <select name="" id="">
                                    <option value="">Elija el tipo</option>
                                    <option value="1">Ausencia</option>
                                    <option value="2">Tardía</option>
                                </select>
                            </div>
                            <div className={style.inputdatecontainer}>
                                <label>DE LA FECHA:</label>
                                <input type="date" name="" id=""/>
                                <span onClick={handleCalendarClick}><Image src={"/calendar-regular.svg"} width={20} height={20} alt='Calendar' className={style.inputdate_calendar}></Image></span>
                            </div>
                        </div>
                        <div className={style.isThere_attachement}>
                            <span>Adjunto comprobante:</span>
                            <label>
                                <input type="radio" name="hasAttachment" checked={hasAttachment === true} onChange={() => setHasAttachment(true)}/>
                                Si
                            </label>
                            <label>
                                <input type="radio" name="hasAttachment"checked={hasAttachment === false} onChange={() => setHasAttachment(false)} />
                                No
                            </label>
                        </div>
                        <div className={style.form_row}>
                            <div className={style.absent_timecontainer}>
                                <label>
                                    <input type="radio" name="absent_time"/>
                                    Jornada Laboral Completa 
                                </label>
                                <label>
                                    <input type="radio" name="absent_time" />
                                    Media Jornada
                                </label>
                            </div>
                            <div className={style.absencescontainer}>
                                {(title_parameter.title_id === 2 && position_parameter === "Docente Academico") ?(
                                <>
                                    <input type="text" name="" id="" className={style.absencesinput}/>
                                    <span>Lecciones</span>
                                </>
                                ):(
                                <> 
                                <input type="text" name="" id="" className={style.absencesinput}/>
                                <span>Cantidad Horas</span>
                                </>
                                )}
                            </div>
                        </div>
                        <div className={style.reasoncontainer}>
                            <span>Motivo:</span>
                            <select name="reasons" id="reasons" value={selectedreason} onChange={e => setSelectedreason(e.target.value)}>
                                <option value="">Elija el motivo</option>
                                <option value="1">Cita Médica</option>
                                <option value="2">Convocatoria asamblea</option>
                                <option value="3">Asuntos personales</option>
                                <option value="4">Enfermedad</option>
                            </select>
                        </div>
                        {hasAttachment === true &&(
                            <div className={style.evidence}>
                            <span>Adjunte comprobante o evidencia:</span>
                            <input type="file" name="" id="" />
                        </div>
                        )}
                        <div className={style.explanationcontainer}>
                                <span>Comentarios:</span>  
                                <textarea name="explanation" id="explanation" className={style.explanation}>
                                </textarea>
                            </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
)}