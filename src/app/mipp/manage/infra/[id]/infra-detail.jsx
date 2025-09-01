'use client'
import style from './infra-detail.module.css'
import Image from 'next/image'
import Link from 'next/link';
import { useState } from 'react';
import {formatDateandHour } from '@/app/utils/formatDate'
export default function Infrastructure_Formulary_Detail_Page({infraf_parameter, fullName_parameter, position_parameter, title_parameter}) {
    const [showPopup, setShowPopup] = useState(false)

    return(
        <div className={style.body}>
        <div className={style.container}>
            <div className={style.formulary_upperinformationcontainer}>
                <div className={style.cardname}>{fullName_parameter.full_name}</div>
            </div>
            <div className={style.cardcontainer}>
                <Image src={'/Card-header.svg'} width={20} height={20} alt='Form-header' className={style.cardheaderimg} priority/>
                <div className={style.form_container}>
                    <h1>Formulario de Reporte de Infraestructura</h1>
                    <form className={style.form}>
                        <div className={style.locationcontainer}>
                            <label>
                                <input type="radio" name="report_place" defaultChecked={infraf_parameter.report_place == 1} disabled/>
                                Aula
                            </label>
                            <label>
                                <input type="radio" name="report_place" defaultChecked={infraf_parameter.report_place == 2} disabled/>
                                Pasillo
                            </label>
                            <label>
                                <input type="radio" name="report_place" defaultChecked={infraf_parameter.report_place == 3} disabled/>
                                Otro
                            </label>
                        </div>
                        <div className={style.exactlocationcontainer}>
                            <div className={style.building}>
                                <label>Edificio</label>
                                <select name="report_building" id="report_building" defaultValue={infraf_parameter.report_building} disabled>
                                    <option>{infraf_parameter.report_building}</option>
                                </select>
                            </div>
                            <div className={style.floor}>
                                <label>Piso</label>
                                <select name="report_floor" id="report_floor" defaultValue={infraf_parameter.report_floor} disabled>
                                    <option value="">{infraf_parameter.report_floor}</option>
                                </select>
                            </div>
                            <div className={style.classroom}>
                                <label>Aula</label>
                                <input type="number" name="report_classroom" id="report_classroom" min="1" max="36" defaultValue={infraf_parameter.report_classroom} disabled/>
                            </div>
                        </div>
                        <div className={style.reportcontainer}>
                            <span>Detalle:</span>  
                            <textarea name="report_detail" id="report_detail" className={style.report} defaultValue={infraf_parameter.report_detail} disabled/>
                        </div>
                        <div className={style.evidencecontainer}>
                            <span>Adjunte evidencia (En caso de que lo vea necesario):</span>
                            {
                            infraf_parameter.attachment_url != null ?(
                                <Link href={infraf_parameter.attachment_url} style={{width: '100%', fontStyle:'italic', color: '#616161'}}>
                                    <div className={style.evidence_input}>
                                        <p>Ver Archivo...</p>
                                    </div>
                                </Link>
                            ):(
                                <div className={style.evidence_input}>
                                    <p style={{fontStyle:'italic', color: '#616161'}}>No hay archivo</p>
                                </div>
                            )
                        }
                        </div>
                        
                        <div className={style.solicitudestatus}>
                            <p>Estado:</p>
                            <>
                                {infraf_parameter.is_revised && (
                                    <span style={{ color: '#616161'}}>Visto</span>
                                )}
                                {!infraf_parameter.is_managed && (
                                    <span style={{ color: '#DEAA00'}}>Pendiente</span>
                                )}
                                {infraf_parameter.is_managed && (
                                    <span style={{ color: '#1D2958'}}>Gestionado</span>
                                )}
                            </>
                        </div>
                    </form>
                    <input type="button" value="Manejar" className={style.manageBtn} onClick={() => setShowPopup(true)}/>
                </div>
            </div>
        </div>
        {
            showPopup && <SendPopup PPinfraf_parameter={infraf_parameter} PPfullName_parameter={fullName_parameter} setShowPopup={setShowPopup} PPposition_parameter={position_parameter} PPtitle_parameter={title_parameter}/>
        }
        </div>
    )
}
function SendPopup({setShowPopup , }){
    const handleSubmit = async () => {
        const data = new FormData()
        data.append('justification_response_state', form)
        data.append('justification_id', justiId_parameter)
        data.append('justification_response_comment', comment)

        const response = await fetch(`/api/manage_justi`, {
            method: "POST",
            body: data
        })

        if (response.ok) {
            toast.success("Justificacion manejada exitosamente...!")
            router.push('/mipp/manage/dashboard')
        }else{
            toast.error("Hubo un error al manejar la solicitud")
            router.refresh()
            
        }
    }

    return(
        <div className={style.popUpContainer}>
            <div className={style.popUpExit} onClick={() => setShowPopup(false)}><Image src={"/close.svg"} width={20} height={20} alt='Close_icon' className={style.Exit_icon}/></div>
            <div className={style.popUpCard}>
                <Image src={'/Card-header.svg'} width={20} height={20} alt='Form-header' className={style.cardheaderimg} priority/>
                <div className={style.form_container} style={{width: '100%'}}>
                    <h1>Resolucion de Reporte</h1>
                    <form className={style.form} onSubmit={handleSubmit}>
                        <h1>Marcar como: Gestionado</h1>
                        <button type="submit" className={style.manageBtn} onClick={() => setShowPopup(false)}/>
                    </form>
                </div>
            </div>
        </div>
    )
}
