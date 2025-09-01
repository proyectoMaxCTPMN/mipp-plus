'use client'

import { toast } from 'react-toastify'
import style from './permission-formulary.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { formatDate } from '@/app/utils/formatDate'
import FormTemplate from '@/app/mipp/components/forms/FormTemplate'
import BasicAbsenceForm_Detail from '@/app/mipp/components/forms/absence/basic_detail/BasicAbsenceForm_Detail'
import generarPDF from '@/app/utils/generarPDF'
import { Button, Input } from '@heroui/react'
import { updateRevised } from '@/app/utils/allFetch'
import {formatDateandHour } from '@/app/utils/formatDate'


export default function Permission_Formulary_Page({userInfo_parameter, title_parameter, absencef_parameter, userRoles}){
    const fullName = userInfo_parameter.first_name + ' ' + userInfo_parameter.last_name + ' ' + userInfo_parameter.second_last_name
    const router = useRouter()
    const formData = absencef_parameter[0]
    const [showPopup, setShowPopup] = useState(false)
    console.log(formData)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setShowPopup(true)
    }

    useEffect(() => {
        const revisar = async () => {
            await updateRevised('absence_requests', absencef_parameter[0].id)
        }

        revisar()

    }, [])

    return(
        <div className={style.body}>
            <FormTemplate  fullName_parameter={fullName} onDownloadClick={
                () => generarPDF({
                    fecha_solicitud: formatDate(formData.absence_date),
                    fecha_ausencia: formatDate(formData.absence_date),
                    tipo_falta: formData.is_whole_day ? 'Jornada Laboral Completa' : 'Media Jornada',
                    desde_las: formData.from_hour,
                    hasta_las: formData.to_hour,
                    horas_ausente: formData.absent_time,
                    motivo: formData.reason,
                    esta_aprovado: formData.is_approved ? 'Si' : 'No',
                    esta_denegado: formData.is_denied ? 'Si' : 'No',
                    esta_pendiente: formData.is_pending ? 'Si' : 'No'
                }, "Formulario de solicitud de permiso salida/ausencia/tardía/incapacidad", fullName)
            }>
                <BasicAbsenceForm_Detail
                    userRoles_parameter={userRoles}
                    title_parameter={title_parameter}
                    absencef={formData}
                    PPuserInfo_parameter={userInfo_parameter}
                />

                <p className='mt-3'>Presento la solicitud a las <span>{formatDateandHour(formData.created_at).time}</span> del día <span>{formatDateandHour(formData.created_at).day}</span> del mes <span>{formatDateandHour(formData.created_at).month}</span> del año <span>{formatDateandHour(formData.created_at).year}</span></p>
                {
                    (userRoles.manage_document || userRoles.root) &&
                    <Button color='primary' className='mt-3' onPress={() => setShowPopup(true)}>{formData.is_pending ? "Gestionar Solicitud" : "Revisar solicitud"}</Button>
                }

                
            </FormTemplate>
            
            {
                showPopup && <SendPopup requestId_parameter={formData.id} router={router} setShowPopup={setShowPopup} canManage={formData.is_pending == true} requestStatus={{is_pending: formData.is_pending, is_approved: formData.is_approved, is_denied: formData.is_denied, is_convocatory: formData.is_convocatory}}/>
            }
        </div>
    )
}

function SendPopup({requestId_parameter, router, setShowPopup, canManage, requestStatus}){
    const [isAccept, setIsAccept] = useState(false)
    const [isConvocatory, setIsConvocatory] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const data = new FormData()
        data.append('isAccept', isAccept)
        data.append('isConvocatory', isConvocatory)
        data.append('request_id', requestId_parameter)

        const response = await fetch(`/api/manage_absence`, {
            method: "POST",
            body: data
        })

        if (response.ok) {
            setLoading(false)
            toast.success("Solicitud manejada exitosamente...!")
            router.refresh()
        }else{
            setLoading(false)
            toast.error("Hubo un error al manejar la solicitud")
            router.refresh()
            
        }
    }

    return(
        <div className={style.popUpContainer}>
            <form className={style.popUpCard} onSubmit={handleSubmit}>
                
                <Image src={"/Card-header.svg"} width={20} height={20} alt='Form-header' className={style.cardheaderimg}/>
                <div className={style.datePopUp}>
                    <label htmlFor="date">Fecha:</label>
                    <Input type="text" name="date" id="date" defaultValue={new Date().toLocaleDateString() } disabled/>
                </div>
                <p>Quien suscribe, <span>M.SC. Laura Ramón Elizondo</span> en calidad de <span>Directora</span>, con base a las leyes y reglamentos vigentes, responde a solicitud de justificación de permiso; bajo la resolución de:</p>

                <div className={style.radioContainerPopUp}>
                    <div className={style.radioPopUp}>
                        <input required type="radio" name="resolution" id="approve" defaultChecked={!canManage && requestStatus.is_approved}  disabled={!requestStatus.is_pending} onClick={() => setIsAccept(true)}/>
                        <label htmlFor="approve">Aprobar lo solicitado</label>
                    </div>

                    <div className={style.radioPopUp}>
                        <input required type="radio" name="resolution" id="deny" defaultChecked={!canManage && requestStatus.is_denied} disabled={!requestStatus.is_pending} onClick={() => setIsAccept(false)}/>
                        <label htmlFor="deny">Denegar lo solicitado</label>
                    </div>

                    <div className={style.radioPopUp}>
                        <input required type="radio" name="resolution" id="convocatory" defaultChecked={!canManage && requestStatus.is_convocatory} disabled={!requestStatus.is_pending} onClick={() => setIsConvocatory(true)}/>
                        <label htmlFor="convocatory">Acoger convocatoria</label>
                    </div>
                </div>

                <div className={style.inputContainer}>
                    <input type="button" value="Cancelar" className={style.btnPopUp} onClick={() => setShowPopup(false)}/>
                    {
                        canManage == true && <Button type="submit" isLoading={loading} className={style.btnPopUp}>Manejar</Button>
                    }
                    
                </div>
                
            </form>
        </div>
    )
}