'use client'

import Navbar from '../../components/nav/Navbar'
import style from './permission-formulary.module.css'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Dashboard(){
const [fecha, setFecha] = useState('');
useEffect(() => {
        const hoy = new Date();
        hoy.setDate(hoy.getDate() + 3);
        const yyyy = hoy.getFullYear();
        const mm = String(hoy.getMonth() + 1).padStart(2, '0');
        const dd = String(hoy.getDate()).padStart(2, '0');
        setFecha(`${yyyy}-${mm}-${dd}`);
    }, []);
    return(
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
                                <input type="date" name="" id="" value={fecha} />
                                <span><Image src={"/calendar-regular.svg"} width={20} height={20} alt='Calendar' className={style.inputdate_calendar}></Image></span>
                            </div>
                            <div className={style.inputradio_container}>
                                <label>
                                    <input type="radio" name="jornada" defaultChecked />
                                    Jornada Laboral Completa
                                </label>
                                <label>
                                    <input type="radio" name="jornada" />
                                    Media Jornada
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}