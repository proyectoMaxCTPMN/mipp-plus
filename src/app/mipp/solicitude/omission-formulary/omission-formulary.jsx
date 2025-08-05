'use client'

import Navbar from '../../components/nav/Navbar'
import style from './omission-formulary.module.css'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'

export default function Omission_Formulary_Page({fullName_parameter}){
const [fecha, setFecha] = useState('')
const inputRef = useRef(null);

    useEffect(() => {
            const hoy = new Date(); // Obtener la fecha actual y Sumar 3 días a la fecha actual
            hoy.setDate(hoy.getDate());
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
            <div className={style.cardname}>{fullName_parameter.full_name}</div>

            <div className={style.cardcontainer}>
                <Image src={'/Card-header.svg'} width={20} height={20} alt='Form-header' className={style.cardheaderimg}/>
                <div className={style.form_container}>
                    <h1>Formulario de Justificación de Omisión de Marca</h1>
                    <form className={style.form}>
                        <div className={style.inputdatecontainer}>
                                <label>Fecha:</label>
                                <input type="date" name="" id="" defaultValue={fecha} ref={inputRef} min={fecha}/>
                                <span onClick={handleCalendarClick}><Image src={"/calendar-regular.svg"} width={20} height={20} alt='Calendar' className={style.inputdate_calendar}></Image></span>
                        </div>
                        <div className={style.reasonofomissioncontainer}>
                            <label>
                                <input type="radio" name="reasonofomission"/>
                                Entrada
                            </label>
                            <label>
                                <input type="radio" name="reasonofomission"/>
                                Salida
                            </label>
                            <label>
                                <input type="radio" name="reasonofomission"/>
                                Todo el día
                            </label>
                            <span>
                                <label>
                                <input type="radio" name="reasonofomission"/>
                                Salida anticipada
                            </label>
                            </span>
                        </div>
                        <div className={style.justificationcontainer}>
                            <span>Justificación:</span>  
                            <textarea name="justification" id="justification" className={style.justification}>
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