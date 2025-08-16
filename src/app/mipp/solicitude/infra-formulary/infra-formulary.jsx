'use client'

import { toast } from 'react-toastify';
import style from './infra-formulary.module.css'
import Image from 'next/image'
import { useState } from 'react';
import { useRouter } from 'next/navigation';



export default function Infra_Formulary_Page({fullName_parameter, userId_parameter}) {
    const router = useRouter()
    const [formData, setFormData] = useState({
        userId: userId_parameter,
        report_place: '',
        report_building: '',
        report_floor: '',
        report_classroom: '1',
        report_detail: '',
        evidence_file: null,
    });

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

    const handleSubmit = async (e) => {
        e.preventDefault();


        const data = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value)
        })


        const response = await fetch(`/api/save_infra_report`, {
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

    return(
        <div className={style.body}>
        <div className={style.container}>
            <div className={style.cardname}>{fullName_parameter.full_name}</div>

            <div className={style.cardcontainer}>
                <Image src={'/Card-header.svg'} width={20} height={20} alt='Form-header' className={style.cardheaderimg} priority/>
                <div className={style.form_container}>
                    <h1>Formulario de Reporte de Infraestructura</h1>
                    <form className={style.form} onSubmit={handleSubmit}>
                        <div className={style.locationcontainer}>
                            <label>
                                <input type="radio" name="report_place" onClick={(e) => changeRadio(e, 1)}/>
                                Aula
                            </label>
                            <label>
                                <input type="radio" name="report_place" onClick={(e) => changeRadio(e, 2)}/>
                                Pasillo
                            </label>
                            <label>
                                <input type="radio" name="report_place" onClick={(e) => changeRadio(e, 3)}/>
                                Otro
                            </label>
                        </div>
                        <div className={style.exactlocationcontainer}>
                            <div className={style.building}>
                                <label>Edificio</label>
                                <select name="report_building" id="report_building" value={formData.report_building} onChange={handleInputChange}>
                                    <option value="">Elija un edificio</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="Gimnasio">Gimnasio</option>
                                    <option value="Dirección">Dirección</option>
                                    <option value="Comedor">Comedor</option>
                                    <option value="Lab. Electro">Lab. Electro</option>
                                    <option value="Otro">Otro (Especificar)</option>
                                </select>
                            </div>
                            <div className={style.floor}>
                                <label>Piso</label>
                                <select name="report_floor" id="report_floor" value={formData.report_floor} onChange={handleInputChange}>
                                    <option value="">Elija un piso</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="n/a">N/A</option>
                                </select>
                            </div>
                            <div className={style.classroom}>
                                <label>Aula</label>
                                <input type="number" name="report_classroom" id="report_classroom" min="1" max="36" value={formData.report_classroom} onChange={handleInputChange}/>
                            </div>
                        </div>
                        <div className={style.reportcontainer}>
                            <span>Detalle:</span>  
                            <textarea name="report_detail" id="report_detail" className={style.report} value={formData.report_detail} onChange={handleInputChange} />
                        </div>
                        <div className={style.evidencecontainer}>
                            <span>Adjunte evidencia (En caso de que lo vea necesario):</span>
                            <input type="file" name="evidence_file" id="evidence_file" onChange={handleInputChange}  />
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