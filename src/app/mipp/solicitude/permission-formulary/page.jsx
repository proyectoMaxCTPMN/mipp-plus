'use client'

import Navbar from '../../components/nav/Navbar'
import style from './permission-formulary.module.css'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'

export default function Dashboard(){
const [fecha, setFecha] = useState('');
const inputRef = useRef(null);
const [selectedreason, setSelectedreason] = useState('');

useEffect(() => {
        const hoy = new Date(); // Obtener la fecha actual y Sumar 3 días a la fecha actual
        hoy.setDate(hoy.getDate() + 3);
        const yyyy = hoy.getFullYear();
        const mm = String(hoy.getMonth() + 1).padStart(2, '0');
        const dd = String(hoy.getDate()).padStart(2, '0');
        setFecha(`${yyyy}-${mm}-${dd}`);
    }, []);

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
            <div className={style.cardname}>
                {/*Aquí el nombre de la persona que se conseguría de la sesión activa*/}Jose Leon Avendaño
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
                                <input type="date" name="" id="" defaultValue={fecha} ref={inputRef} min={fecha}/>
                                <span onClick={handleCalendarClick}><Image src={"/calendar-regular.svg"} width={20} height={20} alt='Calendar' className={style.inputdate_calendar}></Image></span>
                            </div>
                            <div className={style.inputradio_container}>
                                <label>
                                    <input type="radio" name="jornada"/>
                                    Jornada Laboral Completa
                                </label>
                                <label>
                                    <input type="radio" name="jornada" />
                                    Media Jornada
                                </label>
                            </div>
                        </div>
                        <div className={style.hourcontainer}>
                            <span>Hora: Desde las</span>
                            <select name="starthour" id="starthour">
                                <option value="">7:00</option>
                                <option value="">7:40</option>
                                <option value="">8:20</option>
                                <option value="">9:00</option>
                                <option value="">9:20</option>
                                <option value="">10:00</option>
                                <option value="">10:40</option>
                                <option value="">11:20</option>
                                <option value="">12:10</option>
                                <option value="">12:50</option>
                                <option value="">1:30</option>
                                <option value="">2:10</option>
                                <option value="">2:30</option>
                                <option value="">3:10</option>
                                <option value="">3:50</option>
                                <option value="">4:30</option>
                            </select>
                            <span>hasta las</span>
                            <select name="starthour" id="starthour">
                                <option value="">7:40</option>
                                <option value="">8:20</option>
                                <option value="">9:00</option>
                                <option value="">9:20</option>
                                <option value="">10:00</option>
                                <option value="">10:40</option>
                                <option value="">11:20</option>
                                <option value="">12:10</option>
                                <option value="">12:50</option>
                                <option value="">1:30</option>
                                <option value="">2:10</option>
                                <option value="">2:30</option>
                                <option value="">3:10</option>
                                <option value="">3:50</option>
                                <option value="">4:30</option>
                            </select>
                        </div>
                        <div className={style.absencescontainer}>
                            <span>Se ausentará: </span>
                            <input type="text" name="" id="" className={style.absencesinput}/>
                            <span>Lecciones</span>
                            <input type="text" name="" id="" className={style.absencesinput}/>
                            <span>Cantidad Horas</span>
                        </div>
                        <div className={style.reasoncontainer}>
                            <span>Motivo:</span>
                            <select name="reasons" id="reasons" value={selectedreason} onChange={e => setSelectedreason(e.target.value)}>
                                <option value="">Elija el motivo</option>
                                <option value="1">Cita Médica</option>
                                <option value="2">Convocatoria asamblea</option>
                                <option value="3">Asuntos personales</option>
                            </select>
                            {selectedreason === "2" &&(
                                <div className={style.typeconvocatorycontainer}>
                                <span>Tipo de Convocatoria:</span>
                                <label>
                                    <input type="radio" name="convocatory"/>
                                    Sindical
                                </label>
                                <label>
                                    <input type="radio" name="convocatory" />
                                    Regional
                                </label>
                                <label>
                                    <input type="radio" name="convocatory" />
                                    Nacional
                                </label>
                            </div>
                            )}
                        </div>
                        {selectedreason === "3" &&(
                            <div className={style.explanationcontainer}>
                                <span>Explique:</span>  
                                <textarea name="explanation" id="explanation" className={style.explanation}>
                                </textarea>
                            </div>
                        )}
                        <div className={style.evidence}>
                            <span>Adjunte comprobante o evidencia:</span>
                            <input type="file" name="" id="" />
                        </div>
                        <div className={style.buttonscontainer}>
                            <button type="button">Cancelar</button>
                            <button type="submit">Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}