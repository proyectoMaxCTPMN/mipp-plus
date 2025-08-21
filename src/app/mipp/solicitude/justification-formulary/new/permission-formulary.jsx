'use client'

import { toast } from 'react-toastify'
import style from './permission-formulary.module.css'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

function getLocalDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`; // siempre YYYY-MM-DD correcto en local
}

const restarDiasLaborables = (fecha, dias) => {
    let diasRestantes = dias;
    while (diasRestantes > 0) {
        fecha.setDate(fecha.getDate() - 1);
        // Si no es sábado (6) ni domingo (0), restamos un día laborable
        if (fecha.getDay() !== 0 && fecha.getDate() !== 6) {
            diasRestantes--;
        }
    }
    return fecha;
};

export default function Permission_Formulary_Page({userId_parameter, fullName_parameter, title_parameter, position_parameter}){
    const router = useRouter()
    const [fecha, setFecha] = useState('');
    const inputRef = useRef(null);

    const hoy = new Date(); // Obtener la fecha actual
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const dd = String(hoy.getDate()).padStart(2, '0');
    const fechaHoy = `${yyyy}-${mm}-${dd}`

    const [formData, setFormData] = useState({
        userId: userId_parameter,
        request_id: null,
        justification_date: getLocalDateString(new Date()),
        absence_date: fechaHoy,
        is_absence: '',
        is_all_day: '',
        from_hour: '',
        to_hour: '',
        attachment_url: '',
        justification_reason: '',
        absent_time: '',
        justification_text: '',
        assembly_type: null,
        leaving_at: '',
        evidence_file: null,
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value)
        })

        const response = await fetch(`/api/save_justi`, {
            method: "POST",
            body: data
        })

        const dataResponse = await response.json()

        if (response.ok) {
            toast.success("Solicitud enviada exitosamente...!")
            router.push('/mipp/dashboard')
        }else{
            toast.error("Hubo un error al enviar la solicitud")
            console.error(dataResponse)
            
        }
    }

    const handleCalendarClick = () => {
        console.log(formData.absence_date)
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
        const hoy2 = new Date()
        const diasAntes = restarDiasLaborables(hoy2, 2)
        const yyyy2 = diasAntes.getFullYear();
        const mm2 = String(diasAntes.getMonth() + 1).padStart(2, '0');
        const dd2 = String(diasAntes.getDate()).padStart(2, '0'); 
        setFecha(`${yyyy2}-${mm2}-${dd2}`);
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
                    <h1>Formulario de justificación de permiso salida/ausencia/tardía/incapacidad</h1>
                    <p><span>Importante:</span> Todo permiso de ausencia laboral está sujeto a cumplimiento de requisitos y copia adjunta de documento pertinente de cita, convocatoria o licencia, de ser posible con tres días de anticipación. Posterior a la ausencia, el funcionario debe hacer entrega del comprobante pertinente de asistencia en el plazo de 48 (cuarenta y ocho horas). Las licencias dependen de requisitos  previos para su goce. De no presentar el comprobante se transmitirá lo que corresponda.</p>

                    <form className={style.form} onSubmit={handleSubmit}>
                        <div className={style.form_row}>

                            <div className={style.inputdate_container}>
                                <label>FECHA DE LA AUSENCIA:</label>
                                
                                <span onClick={handleCalendarClick}>
                                    <input type="date" name="absence_date"  defaultValue={formData.absence_date} ref={inputRef} min={fecha} onChange={handleInputChange}/>
                                    <Image src={"/calendar-regular.svg"} width={20} height={20} alt='Calendar' className={style.inputdate_calendar} onChange={handleInputChange} />
                                </span>
                            </div>

                            <div className={style.inputradio_container}>
                                <label>
                                    <input type="radio" name="is_all_day" onChange={(e) => changeRadio(e, true)}/>
                                    Jornada Laboral Completa
                                </label>
                                <label>
                                    <input type="radio" name="is_all_day" onChange={(e) => changeRadio(e, false)}/>
                                    Media Jornada
                                </label>
                            </div>
                        </div>

                        <div className={style.worktimeabsence_container}>
                            <p>Justifico:</p>
                            <label>
                                <input type="radio" name="is_absence" onChange={(e) => changeRadio(e, true)}/>
                                Ausencia
                            </label>
                            <label>
                                <input type="radio" name="is_absence" onChange={(e) => changeRadio(e, false)}/>
                                Tardía
                            </label>
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

                            {
                                formData.is_absence &&(
                                    <div className={style.leavinghour_container}>
                                        <p>Salí del centro educativo a las</p>
                                        <input type="text" name="leaving_at" value={formData.leaving_at} onChange={handleInputChange}/>
                                        
                                    </div>
                                )
                            }
                        </div>

                        <div className={style.absencescontainer}>
                            <span>Se ausentó: </span>
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
                            <select name="justification_reason" id="justification_reason" value={formData.justification_reason} onChange={(e) => {handleInputChange(e); changeRadio({target: {name: "assembly_type"}}, null)}}>
                                <option value="">Elija el motivo</option>
                                <option value="1">Cita Médica</option>
                                <option value="2">Convocatoria asamblea</option>
                                <option value="3">Asuntos personales</option>
                            </select>
                            {formData.justification_reason === "2" &&(
                                <div className={style.typeconvocatorycontainer}>
                                <span>Tipo de Convocatoria:</span>
                                <label>
                                    <input type="radio" name="assembly_type" onChange={(e) => changeRadio(e, 1)}/>
                                    Regional
                                </label>
                                <label>
                                    <input type="radio" name="assembly_type" onChange={(e) => changeRadio(e, 2)}/>
                                    Nacional
                                </label>
                                <label>
                                    <input type="radio" name="assembly_type" onChange={(e) => changeRadio(e, 3)}/>
                                    Circuital
                                </label>
                                <label>
                                    <input type="radio" name="assembly_type" onChange={(e) => changeRadio(e, 4)}/>
                                    Sindical
                                </label>
                            </div>
                            )}
                        </div>
                        {formData.justification_reason == "3" &&(
                            <div className={style.explanationcontainer}>
                                <span>Explique:</span>  
                                <textarea name="justification_text" id="justification_text" className={style.justification_text} onChange={handleInputChange}></textarea>
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