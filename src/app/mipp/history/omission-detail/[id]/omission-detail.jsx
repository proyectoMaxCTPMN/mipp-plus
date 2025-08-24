import style from './omission-detail.module.css'


export default function Omission_Formulary_Detail_Page() {

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
                                    <input type="date" name="omission_date" id="omission_date"/>
                                    <Image src={"/calendar-regular.svg"} width={20} height={20} alt='Calendar' className={style.inputdate_calendar}></Image>
                                </span>
                        </div>
                        <div className={style.reasonofomissioncontainer}>
                            <label>
                                <input type="radio" name="omission_type"/>
                                Entrada
                            </label>
                            <label>
                                <input type="radio" name="omission_type"/>
                                Salida
                            </label>
                            <label>
                                <input type="radio" name="omission_type"/>
                                Todo el día
                            </label>

                            <label>
                                <input type="radio" name="omission_type"/>
                                Salida anticipada
                            </label>

                        </div>
                        
                        <div className={style.timeContainer}>
                            {(formData.omission_type == 1 || formData.omission_type == 3) && 
                                <>
                                    <label>Hora de entrada:</label>
                                    <select name="entry_time" id="entry_time" className={style.hourSelect} value={formData.entry_time} onChange={handleInputChange}>
                                        <option value="" disabled>Seleccione</option>
                                    </select>
                                </>
                            }
                            {(formData.omission_type == 2 || formData.omission_type == 3) &&
                                <>
                                    <label>Hora de salida:</label>
                                    <select name="exit_time" id="exit_time" className={style.hourSelect} value={formData.exit_time} onChange={handleInputChange}>
                                        <option value="" disabled>Seleccione</option>
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