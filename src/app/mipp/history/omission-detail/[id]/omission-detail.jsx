'use client'
import style from './omission-detail.module.css'
import Image from 'next/image'
import { useState } from 'react';
import {formatDateandHour } from '@/app/utils/formatDate'
export default function Omission_Formulary_Detail_Page({omissionf_parameter, fullName_parameter, position_parameter, title_parameter}) {
    const [showPopup, setShowPopup] = useState(false)
    
    return(
        <div className={style.body}>
            <div className={style.container}>
                <div className={style.formulary_upperinformationcontainer}>
                    <div className={style.cardname}>{fullName_parameter.full_name}</div>
                    <div className={style.previewcard} onClick={() => setShowPopup(true)}><Image src={"/Search.svg"} width={20} height={20} alt='magnifying-glass-icon' className={style.searchicon}></Image></div>
                </div>

                <div className={style.cardcontainer}>
                    <Image src={'/Card-header.svg'} width={20} height={20} alt='Form-header' className={style.cardheaderimg}/>
                    <div className={style.form_container}>
                        <h1>Formulario de Justificación de Omisión de Marca</h1>

                        <form className={style.form}>
                            <div className={style.inputdatecontainer}>
                                    <label>Fecha de la omisión:</label>
                                    <span>
                                        <input type="date" name="omission_date" id="omission_date" defaultValue={omissionf_parameter.omission_date} disabled style={{color: '#616161'}}/>
                                        <Image src={"/calendar-regular.svg"} width={20} height={20} alt='Calendar' className={style.inputdate_calendar}></Image>
                                    </span>
                            </div>
                            <div className={style.reasonofomissioncontainer}>
                                <label>
                                    <input type="radio" name="omission_type" defaultChecked={omissionf_parameter.omission_type == 1} disabled/>
                                    Entrada
                                </label>
                                <label>
                                    <input type="radio" name="omission_type" defaultChecked={omissionf_parameter.omission_type == 2} disabled/>
                                    Salida
                                </label>
                                <label>
                                    <input type="radio" name="omission_type" defaultChecked={omissionf_parameter.omission_type == 3} disabled/>
                                    Todo el día
                                </label>

                                <label>
                                    <input type="radio" name="omission_type" defaultChecked={omissionf_parameter.omission_type == 4} disabled/>
                                    Salida anticipada
                                </label>

                            </div>
                            
                            <div className={style.timeContainer}>
                                {(omissionf_parameter.omission_type == 1 || omissionf_parameter.omission_type == 3) && 
                                    <>
                                        <label>Hora de entrada:</label>
                                        <select name="entry_time" id="entry_time" className={style.hourSelect} defaultValue={omissionf_parameter.entry_time} disabled>
                                            <option>{omissionf_parameter.entry_time}</option>
                                        </select>
                                    </>
                                }
                                {(omissionf_parameter.omission_type == 2 || omissionf_parameter.omission_type == 3) &&
                                    <>
                                        <label>Hora de salida:</label>
                                        <select name="exit_time" id="exit_time" className={style.hourSelect} defaultValue={omissionf_parameter.exit_time} disabled>
                                            <option>{omissionf_parameter.exit_time}</option>
                                        </select>
                                    </>
                                }
                                {omissionf_parameter.omission_type == 4 &&
                                    <div className={style.anticipated_exitcontainer}>
                                        <label>Hora de salida:</label>
                                        <input type="text" name='exit_time' id='exit_time' className={style.anticipated_exitinput} defaultValue={omissionf_parameter.exit_time} disabled/>
                                    </div>
                                }
                            </div>

                            <div className={style.justificationcontainer}>
                                <span>Justificación:</span>  
                                <textarea name="omission_reason" id="omission_reason" className={style.justification} defaultValue={omissionf_parameter.omission_reason} disabled>
                                </textarea>
                            </div>

                            <div className={style.solicitudestatus}>
                                <p>Estado:</p>
                                <>
                                    {(omissionf_parameter.is_revised && (omissionf_parameter.omission_state === "Aprobado" || omissionf_parameter.omission_state=="Denegado")) && (
                                        <span style={{ color: '#616161'}}>Visto</span>
                                    )}
                                    {(omissionf_parameter.omission_state === "Pendiente" && !omissionf_parameter.is_revised) &&(
                                        <span style={{ color: '#DEAA00'}}>Pendiente</span>
                                    )}
                                    {omissionf_parameter.omission_state === "Aprobado" &&(
                                        <span style={{ color: '#0B8300'}}>Aprobado</span>
                                    )}
                                    {omissionf_parameter.omission_state === "Denegado" &&(
                                        <span style={{ color: '#940202'}}>Denegado</span>
                                    )}
                                </>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            {
                showPopup && <SendPopup PPomissionf_parameter={omissionf_parameter} PPfullName_parameter={fullName_parameter} setShowPopup={setShowPopup} PPposition_parameter={position_parameter} PPtitle_parameter={title_parameter}/>
            }
        </div>
        
    )
} 
function SendPopup({setShowPopup , PPomissionf_parameter, PPfullName_parameter, PPposition_parameter, PPtitle_parameter}){

    return(
        <div className={style.popUpContainer}>
            <div className={style.popUpExit} onClick={() => setShowPopup(false)}><Image src={"/close.svg"} width={20} height={20} alt='Close_icon' className={style.Exit_icon}/></div>
            <div className={style.popUpCard}>
                    <Image src={'/Card-header.svg'} width={20} height={20} alt='Form-header' className={style.cardheaderimg}/>
                    <div className={style.form_container}>
                        <h1>Formulario de Justificación de Omisión de Marca</h1>
                        <form className={style.form}>
                            <div className={style.form_row}>
                                <p>Nombre: <span>{PPfullName_parameter.full_name}</span></p>
                                <p>Cédula: <span>{PPomissionf_parameter.user_id}</span></p>
                            </div>
                            <div className={style.form_row} style={{marginBottom: '1rem'}}>
                                <p>Puesto: <span>{PPposition_parameter}</span></p>
                                <p>Instancia: <span>{PPtitle_parameter.title}</span></p>
                            </div>
                            <div className={style.inputdatecontainer}>
                                    <label>Fecha de la omisión:</label>
                                    <span>
                                        <input type="date" name="omission_date" id="omission_date" defaultValue={PPomissionf_parameter.omission_date} disabled style={{color: '#616161'}}/>
                                        <Image src={"/calendar-regular.svg"} width={20} height={20} alt='Calendar' className={style.inputdate_calendar}></Image>
                                    </span>
                            </div>
                            <div className={style.reasonofomissioncontainer}>
                                <label>
                                    <input type="radio" name="omission_type" defaultChecked={PPomissionf_parameter.omission_type == 1} disabled/>
                                    Entrada
                                </label>
                                <label>
                                    <input type="radio" name="omission_type" defaultChecked={PPomissionf_parameter.omission_type == 2} disabled/>
                                    Salida
                                </label>
                                <label>
                                    <input type="radio" name="omission_type" defaultChecked={PPomissionf_parameter.omission_type == 3} disabled/>
                                    Todo el día
                                </label>

                                <label>
                                    <input type="radio" name="omission_type" defaultChecked={PPomissionf_parameter.omission_type == 4} disabled/>
                                    Salida anticipada
                                </label>

                            </div>
                            
                            <div className={style.timeContainer}>
                                {(PPomissionf_parameter.omission_type == 1 || PPomissionf_parameter.omission_type == 3) && 
                                    <>
                                        <label>Hora de entrada:</label>
                                        <select name="entry_time" id="entry_time" className={style.hourSelect} defaultValue={PPomissionf_parameter.entry_time} disabled>
                                            <option>{PPomissionf_parameter.entry_time}</option>
                                        </select>
                                    </>
                                }
                                {(PPomissionf_parameter.omission_type == 2 || PPomissionf_parameter.omission_type == 3) &&
                                    <>
                                        <label>Hora de salida:</label>
                                        <select name="exit_time" id="exit_time" className={style.hourSelect} defaultValue={PPomissionf_parameter.exit_time} disabled>
                                            <option>{PPomissionf_parameter.exit_time}</option>
                                        </select>
                                    </>
                                }
                                {PPomissionf_parameter.omission_type == 4 &&
                                    <div className={style.anticipated_exitcontainer}>
                                        <label>Hora de salida:</label>
                                        <input type="text" name='exit_time' id='exit_time' className={style.anticipated_exitinput} defaultValue={PPomissionf_parameter.exit_time} disabled/>
                                    </div>
                                }
                            </div>

                            <div className={style.justificationcontainer}>
                                <span>Justificación:</span>  
                                <textarea name="omission_reason" id="omission_reason" className={style.justification} defaultValue={PPomissionf_parameter.omission_reason} disabled>
                                </textarea>
                            </div>

                            <div className={style.request_datecontainer}>
                                <p>Presento la solicitud a las <span>{formatDateandHour(PPomissionf_parameter.created_at).time}</span> del día <span>{formatDateandHour(PPomissionf_parameter.created_at).day}</span> del mes <span>{formatDateandHour(PPomissionf_parameter.created_at).month}</span> del año <span>{formatDateandHour(PPomissionf_parameter.created_at).year}</span></p>
                            </div>
                        </form>
                    </div>
            </div>
        </div>
    )
}

