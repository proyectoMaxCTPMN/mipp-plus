'use client'
import Image from 'next/image';
import style from './solicitude-detail.module.css'
import { useState } from 'react';

export default function Solicitude_Detail({fullName_parameter}){
    const [isSolicitudes, setIsSolicitudes] = useState(true);
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
                                <div className={style.previewcard}><Image src={"/search.svg"} width={20} height={20} alt='magnifying-glass-icon' className={style.searchicon}></Image></div>
                            </div>
                            <div className={style.cardcontainer}>
                                <Image src={"/Card-header.svg"} width={20} height={20} alt='Form-header' className={style.cardheaderimg}/>
                                <div className={style.form_container}>
                                    <h1>Formulario de solicitud de permiso salida/ausencia/tardía/incapacidad</h1>
                                    <p><span>Importante:</span> Todo permiso de ausencia laboral está sujeto a cumplimiento de requisitos y copia adjunta de documento pertinente de cita, convocatoria o licencia, de ser posible con tres días de anticipación. Posterior a la ausencia, el funcionario debe hacer entrega del comprobante pertinente de asistencia en el plazo de 48 (cuarenta y ocho horas). Las licencias dependen de requisitos  previos para su goce. De no presentar el comprobante se transmitirá lo que corresponda.</p>
                                
                                    <form className={style.form}>
                                        <div className={style.form_row}>

                                            <div className={style.inputdate_container}>
                                                <label>PERMISO PARA AUSENTARSE EN LA FECHA:</label>
                                                <input type="text" name="absence_date" disabled/>
                                            </div>

                                            <div className={style.inputradio_container}>
                                                <label>
                                                    <input type="radio" name="is_whole_day"/>
                                                    Jornada Laboral Completa
                                                </label>
                                                <label>
                                                    <input type="radio" name="is_whole_day"/>
                                                    Media Jornada
                                                </label>
                                            </div>
                                        </div>

                                        <div className={style.hourcontainer}>
                                            <span>Hora: Desde las</span>
                                            <select name="from_hour" id="from_hour">
                                                    <option></option>
                                            </select>
                                            <span>hasta las</span>
                                            <select name="to_hour" id="to_hour">
                                                <option value=""></option>
                                            </select>
                                        </div>

                                        <div className={style.absencescontainer}>
                                            <span>Se ausentará: </span>
                                            
                                        </div>

                                        <div className={style.reasoncontainer}>
                                            <span>Motivo:</span>
                                            <select name="reason" id="reason">
                                                <option value=""></option>
                                            </select>
                                        </div>

                                        <div className={style.evidence}>
                                            <span>Adjunte comprobante o evidencia:</span>
                                            <input type="file" name="evidence_file" id="evidence_file"/>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    ):(
                        <div className={style.justification_formularycontainer}>
                            <p className={style.titleofformulary}>Justificación:</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
