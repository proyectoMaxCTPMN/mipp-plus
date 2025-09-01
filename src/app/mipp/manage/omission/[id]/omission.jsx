import style from './omission.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { formatDateandHour } from '@/app/utils/formatDate'
export default function Manage_Omission_Formulary_page({omissionf_parameter, userInfo_parameter}){
    return(
        <div className={style.body}>
            <div className={style.container}>
                <div className={style.cardcontainer}>
                    <Image src={'/Card-header.svg'} width={20} height={20} alt='Form-header' className={style.cardheaderimg}/>
                    <div className={style.form_container}>
                        <h1>Formulario de Justificación de Omisión de Marca</h1>
                        <form className={style.form}>
                            <div className={style.form_row}>
                                <p>Nombre: <span>{userInfo_parameter.first_name} {userInfo_parameter.last_name} {userInfo_parameter.second_last_name}</span></p>
                                <p>Cédula: <span>{userInfo_parameter.id}</span></p>
                            </div>
                            <div className={style.form_row} style={{marginBottom: '1rem'}}>
                                <p>Puesto: <span>{userInfo_parameter.positions.position}</span></p>
                                <p>Instancia: <span>{userInfo_parameter.titles.title}</span></p>
                            </div>
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

                            <div className={style.request_datecontainer}>
                                <p>Presento la solicitud a las <span>{formatDateandHour(omissionf_parameter.created_at).time}</span> del día <span>{formatDateandHour(omissionf_parameter.created_at).day}</span> del mes <span>{formatDateandHour(omissionf_parameter.created_at).month}</span> del año <span>{formatDateandHour(omissionf_parameter.created_at).year}</span></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}