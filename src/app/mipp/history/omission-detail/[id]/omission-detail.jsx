import style from './omission-detail.module.css'


export default function Omission_Formulary_Detail_Page({omissionf_parameter}) {

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
                                    <input type="date" name="omission_date" id="omission_date" disabled defaultValue={omissionf_parameter.omission_date}/>
                                    <Image src={"/calendar-regular.svg"} width={20} height={20} alt='Calendar' className={style.inputdate_calendar}></Image>
                                </span>
                        </div>
                        <div className={style.reasonofomissioncontainer}>
                            <label>
                                <input type="radio" name="omission_type" defaultChecked={omission_type == 1} disabled/>
                                Entrada
                            </label>
                            <label>
                                <input type="radio" name="omission_type" defaultChecked={omission_type == 2} disabled/>
                                Salida
                            </label>
                            <label>
                                <input type="radio" name="omission_type" defaultChecked={omission_type == 3} disabled/>
                                Todo el día
                            </label>

                            <label>
                                <input type="radio" name="omission_type" defaultChecked={omission_type == 4} disabled/>
                                Salida anticipada
                            </label>

                        </div>
                        
                        <div className={style.timeContainer}>
                            {(omissionf_parameter.omission_type == 1 || omissionf_parameter.omission_type == 3) && 
                                <>
                                    <label>Hora de entrada:</label>
                                    <select name="entry_time" id="entry_time" className={style.hourSelect} defaultValue={omissionf_parameter.entry_time} disabled>
                                        <option value="" disabled>Seleccione</option>
                                    </select>
                                </>
                            }
                            {(omissionf_parameter.omission_type == 2 || omissionf_parameter.omission_type == 3) &&
                                <>
                                    <label>Hora de salida:</label>
                                    <select name="exit_time" id="exit_time" className={style.hourSelect} defaultValue={omissionf_parameter.exit_time} disabled>
                                        <option value="" disabled>Seleccione</option>
                                    </select>
                                </>
                            }
                            {omissionf_parameter.omission_type == 4 &&
                                <div className={style.anticipated_exitcontainer}>
                                    <label>Hora de salida:</label>
                                    <input type="text" name='exit_time' id='exit_time' className={style.anticipated_exitinput} defaultValue={omissionf_parameter.exit_time}/>
                                </div>
                            }
                        </div>

                        <div className={style.justificationcontainer}>
                            <span>Justificación:</span>  
                            <textarea name="omission_reason" id="omission_reason" className={style.justification} value={formData.reason}>
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
    )
} 