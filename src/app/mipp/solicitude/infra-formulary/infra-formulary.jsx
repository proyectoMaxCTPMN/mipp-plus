'use client'

import Navbar from '../../components/nav/Navbar'
import style from './infra-formulary.module.css'
import Image from 'next/image'
import { useState } from 'react';


export default function Infra_Formulary_Page({fullName_parameter}){
const [aula, setAula] = useState(1);
    return(
        <div className={style.body}>
        <div className={style.container}>
            <div className={style.cardname}>{fullName_parameter.full_name}</div>

            <div className={style.cardcontainer}>
                <Image src={'/Card-header.svg'} width={20} height={20} alt='Form-header' className={style.cardheaderimg}/>
                <div className={style.form_container}>
                    <h1>Formulario de Reporte de Infraestructura</h1>
                    <form className={style.form}>
                        <div className={style.locationcontainer}>
                            <label>
                                <input type="radio" name="location"/>
                                Aula
                            </label>
                            <label>
                                <input type="radio" name="location"/>
                                Pasillo
                            </label>
                            <label>
                                <input type="radio" name="location"/>
                                Otro
                            </label>
                        </div>
                        <div className={style.exactlocationcontainer}>
                            <div className={style.building}>
                                <label>Edificio</label>
                                <select name="building" id="building">
                                    <option value="">N/A</option>
                                    <option value="">1</option>
                                    <option value="">2</option>
                                    <option value="">3</option>
                                    <option value="">4</option>
                                    <option value="">5</option>
                                </select>
                            </div>
                            <div className={style.floor}>
                                <label>Piso</label>
                                <select name="floor" id="floor">
                                    <option value="">N/A</option>
                                    <option value="">1</option>
                                    <option value="">2</option>
                                </select>
                            </div>
                            <div className={style.classroom}>
                                <label>Aula</label>
                                <input type="number" name="" id="" min="1" max="36" defaultValue="1"/>
                            </div>
                        </div>
                        <div className={style.reportcontainer}>
                                <span>Detalle:</span>  
                                <textarea name="report" id="report" className={style.report}>
                                </textarea>
                        </div>
                        <div className={style.evidencecontainer}>
                            <span>Adjunte evidencia (En caso de que lo vea necesario):</span>
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