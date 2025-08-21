'use client'

import { toast } from 'react-toastify'
import style from './omission-formulary.module.css'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'



export default function Omission_Formulary_Page({fullName_parameter, userId_parameter}) {
    const router = useRouter();
    const [fecha, setFecha] = useState('')
    const [formData, setFormData] = useState({
        userId: userId_parameter,
        omission_date: fecha,
        omission_reason: '',
        entry_time: '',
        exit_time: '',
        omission_type: 0,
    });
    const inputRef = useRef(null);

    const handleInputChange = (event) => {
        const { name, value, type, checked, files } = event.target;

        if (name === 'omission_date') {
            const hoy = new Date(); // Obtener la fecha actual
            setFecha(hoy.toISOString().split('T')[0]); // Formatear la fecha como YYYY-MM-DD
        }

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value)
        })

        const response = await fetch(`/api/save_omission`, {
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

    useEffect(() => {
        const hoy = new Date(); // Obtener la fecha actual
        hoy.setDate(hoy.getDate());
        const yyyy = hoy.getFullYear();
        const mm = String(hoy.getMonth() + 1).padStart(2, '0');
        const dd = String(hoy.getDate()).padStart(2, '0');
        setFormData(prev => ({
            ...prev,
            omission_date: `${yyyy}-${mm}-${dd}` // Formatear la fecha como YYYY-MM-DD
        }));
        setFecha(`${yyyy}-${mm}-${dd}`);
    }, []);

    return(
    <div className={style.body}>
        <div className={style.container}>
            <div className={style.cardname}>{fullName_parameter.full_name}</div>

            <div className={style.cardcontainer}>
                <Image src={'/Card-header.svg'} width={20} height={20} alt='Form-header' className={style.cardheaderimg}/>
                <div className={style.form_container}>
                    <h1>Formulario de Justificación de Omisión de Marca</h1>

                    <form className={style.form} onSubmit={handleSubmit}>
                        <div className={style.inputdatecontainer}>
                                <label>Fecha de la omisión:</label>
                                
                                <span onClick={handleCalendarClick}>
                                    <input type="date" name="omission_date" id="omission_date" defaultValue={fecha} ref={inputRef} min={fecha} onChange={handleInputChange}/>
                                    <Image src={"/calendar-regular.svg"} width={20} height={20} alt='Calendar' className={style.inputdate_calendar}></Image>
                                </span>
                        </div>
                        <div className={style.reasonofomissioncontainer}>
                            <label>
                                <input type="radio" name="omission_type" onClick={(e) => changeRadio(e, 1)}/>
                                Entrada
                            </label>
                            <label>
                                <input type="radio" name="omission_type" onClick={(e) => changeRadio(e, 2)}/>
                                Salida
                            </label>
                            <label>
                                <input type="radio" name="omission_type" onClick={(e) => changeRadio(e, 3)}/>
                                Todo el día
                            </label>

                            <label>
                                <input type="radio" name="omission_type" onClick={(e) => changeRadio(e, 4)}/>
                                Salida anticipada
                            </label>

                        </div>
                        
                        <div className={style.timeContainer}>
                            {(formData.omission_type == 1 || formData.omission_type == 3) && 
                                <>
                                    <label>Hora de entrada:</label>
                                    <select name="entry_time" id="entry_time" className={style.hourSelect} value={formData.entry_time} onChange={handleInputChange}>
                                        <option value="" disabled>Seleccione</option>
                                        <option value="7:00">7:00</option>
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
                                </>
                            }
                            {(formData.omission_type == 2 || formData.omission_type == 3) &&
                                <>
                                    <label>Hora de salida:</label>
                                    <select name="exit_time" id="exit_time" className={style.hourSelect} value={formData.exit_time} onChange={handleInputChange}>
                                        <option value="" disabled>Seleccione</option>
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
                                </>
                            }
                            {formData.omission_type == 4 &&
                                <div className={style.anticipated_exitcontainer}>
                                    <label>Hora de salida:</label>
                                    <input type="text" name='exit_time' id='exit_time' className={style.anticipated_exitinput}/>
                                </div>
                            }
                        </div>

                        <div className={style.justificationcontainer}>
                            <span>Justificación:</span>  
                            <textarea name="omission_reason" id="omission_reason" className={style.justification} value={formData.reason} onChange={handleInputChange}>
                            </textarea>
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
)}