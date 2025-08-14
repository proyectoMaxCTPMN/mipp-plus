'use client'

import { toast } from 'react-toastify'
import style from './permission-formulary.module.css'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'


export default function Permission_Formulary_Page({userId_parameter, fullName_parameter, title_parameter, position_parameter}){
    const router = useRouter()
    const [fecha, setFecha] = useState('');
    const inputRef = useRef(null);
    const [formData, setFormData] = useState({
        userId: userId_parameter,
        absence_date: '',
        is_whole_day: false,
        from_hour: '',
        to_hour: '',
        absent_time: '',
        reason: '',
        assembly_type: null,
        personal_reason: null,
        evidence_file: null,
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value)
        })

        const response = await fetch(`/api/send_permission`, {
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

    const handleCalendarClick = () => {
        if (inputRef.current) {
            if (inputRef.current.showPicker) {
                inputRef.current.showPicker(); // Navegadores modernos
            } else {
                inputRef.current.focus(); // Fallback
            }
        }
    };

    const handleInputChange = (event) => {
        const { name, value, type, checked, files } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
        }));
    }

    const changeRadio = (e, value) => {
        const {name} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    useEffect(() => {
        const hoy = new Date(); // Obtener la fecha actual y Sumar 3 días a la fecha actual
        hoy.setDate(hoy.getDate() + 3);
        setFormData(prev => ({
            ...prev,
            absence_date: hoy.toISOString()
        }));
        const yyyy = hoy.getFullYear();
        const mm = String(hoy.getMonth() + 1).padStart(2, '0');
        const dd = String(hoy.getDate()).padStart(2, '0');
        setFecha(`${yyyy}-${mm}-${dd}`);
    }, []);

    return(
        <div className={style.body}>
        <div className={style.container}>
            <div className={style.cardname}>
                {fullName_parameter.full_name}
            </div>
            <div className={style.cardcontainer}>
                <Image src={"/Card-header.svg"} width={20} height={20} alt='Form-header' className={style.cardheaderimg}/>
                <div className={style.form_container}>
                    <h1>Formulario de solicitud de permiso salida/ausencia/tardía/incapacidad</h1>
                    <p><span>Importante:</span> Todo permiso de ausencia laboral está sujeto a cumplimiento de requisitos y copia adjunta de documento pertinente de cita, convocatoria o licencia, de ser posible con tres días de anticipación. Posterior a la ausencia, el funcionario debe hacer entrega del comprobante pertinente de asistencia en el plazo de 48 (cuarenta y ocho horas). Las licencias dependen de requisitos  previos para su goce. De no presentar el comprobante se transmitirá lo que corresponda.</p>

                    <form className={style.form} onSubmit={handleSubmit}>
                        <div className={style.form_row}>

                            <div className={style.inputdate_container}>
                                <label>PERMISO PARA AUSENTARSE EN LA FECHA:</label>
                                <input type="date" name="absence_date" defaultValue={fecha} ref={inputRef} min={fecha} onChange={handleInputChange}/>
                                <span onClick={handleCalendarClick}><Image src={"/calendar-regular.svg"} width={20} height={20} alt='Calendar' className={style.inputdate_calendar} onChange={handleInputChange}></Image></span>
                            </div>

                            <div className={style.inputradio_container}>
                                <label>
                                    <input type="radio" name="is_whole_day" onChange={(e) => changeRadio(e, true)}/>
                                    Jornada Laboral Completa
                                </label>
                                <label>
                                    <input type="radio" name="is_whole_day" onChange={(e) => changeRadio(e, false)}/>
                                    Media Jornada
                                </label>
                            </div>
                        </div>

                        <div className={style.hourcontainer}>

                            <span>Hora: Desde las</span>

                            <select name="from_hour" id="from_hour" value={formData.from_hour} onChange={handleInputChange}>
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

                            <select name="to_hour" id="to_hour" value={formData.to_hour} onChange={handleInputChange}>
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

                        </div>

                        <div className={style.absencescontainer}>
                            <span>Se ausentará: </span>
                            {(title_parameter.title_id === 2 && position_parameter === "Docente Academico") ?(
                                <>
                                    <input type="text" name="absent_time" id="absent_time" className={style.absencesinput} value={formData.absent_time} onChange={handleInputChange}/>
                                    <span>Lecciones</span>
                                </>
                            ):(
                                <> 
                                    <input type="text" name="absent_time" id="absent_time" className={style.absencesinput} value={formData.absent_time} onChange={handleInputChange}/>
                                    <span>Cantidad Horas</span>
                                </>
                            )}
                        </div>
                        <div className={style.reasoncontainer}>
                            <span>Motivo:</span>
                            <select name="reason" id="reason" value={formData.reason} onChange={(e) => {handleInputChange(e); changeRadio({target: {name: "assembly_type"}}, null)}}>
                                <option value="">Elija el motivo</option>
                                <option value="1">Cita Médica</option>
                                <option value="2">Convocatoria asamblea</option>
                                <option value="3">Asuntos personales</option>
                            </select>
                            {formData.reason === "2" &&(
                                <div className={style.typeconvocatorycontainer}>
                                <span>Tipo de Convocatoria:</span>
                                <label>
                                    <input type="radio" name="assembly_type" onChange={(e) => changeRadio(e, 1)}/>
                                    Sindical
                                </label>
                                <label>
                                    <input type="radio" name="assembly_type" onChange={(e) => changeRadio(e, 2)}/>
                                    Regional
                                </label>
                                <label>
                                    <input type="radio" name="assembly_type" onChange={(e) => changeRadio(e, 3)}/>
                                    Nacional
                                </label>
                            </div>
                            )}
                        </div>
                        {formData.reason === "3" &&(
                            <div className={style.explanationcontainer}>
                                <span>Explique:</span>  
                                <textarea name="personal_reason" id="personal_reason" className={style.explanation} onChange={handleInputChange}></textarea>
                                
                            </div>
                        )}
                        <div className={style.evidence}>
                            <span>Adjunte comprobante o evidencia:</span>
                            <input type="file" name="evidence_file" id="evidence_file" onChange={handleInputChange} />
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