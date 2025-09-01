'use client'

import { formatDate, formatDateandHour } from '@/app/utils/formatDate'
import style from './justification-formulary.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'
import FormTemplate from '@/app/mipp/components/forms/FormTemplate'
import DetailJustiForm from '@/app/mipp/components/forms/justification/detail/DetailJustiForm'
import { Button } from '@heroui/react'

export default function Justification_Formulary_Page({userId_parameter, justif_parameter, userInfo_parameter, title_parameter, userRoles }){
    const fullName = userInfo_parameter.first_name + ' ' + userInfo_parameter.last_name + ' ' + userInfo_parameter.second_last_name
    const router = useRouter();
    const formData = justif_parameter[0]
    console.log(formData)
    const [hasAttachment, setHasAttachment] = useState(justif_parameter.attachment_url != 'null' ? true : false)

    console.log(hasAttachment)
    const [showPopup, setShowPopup] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setShowPopup(true)
    }

    return(

    <div className={style.body}>
        <FormTemplate fullName_parameter={fullName}>
            <DetailJustiForm userRoles_parameter={userRoles}
                title_parameter={title_parameter}
                justification_parameter={formData}
                PPuserInfo_parameter={userInfo_parameter}/>
            
            <p className='mt-3'>Presento la solicitud a las <span>{formatDateandHour(formData.created_at).time}</span> del día <span>{formatDateandHour(formData.created_at).day}</span> del mes <span>{formatDateandHour(formData.created_at).month}</span> del año <span>{formatDateandHour(formData.created_at).year}</span></p>
            {
                (userRoles.manage_document || userRoles.root) &&
                <Button color='primary' className='mt-3' onPress={() => setShowPopup(true)}>{formData ? "Gestionar Solicitud" : "Revisar solicitud"}</Button>
            }
        </FormTemplate>
            {
                showPopup && <SendPopup justiId_parameter={formData.id} router={router} setShowPopup={setShowPopup} canManage={justif_parameter.justification_response_state == 0} responseState={justif_parameter.justification_response_state} justiComment={justif_parameter.justification_response_comment}/>
            }
        </div>
)}


function SendPopup({justiId_parameter, router, setShowPopup, canManage, responseState, justiComment}){
    const [form, setForm] = useState('')
    const [comment, setComment] = useState(justiComment || '')
    

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
            <div className={style.popUpCard}>
                
                <Image src={"/Card-header.svg"} width={20} height={20} alt='Form-header' className={style.cardheaderimg}/>
                <div className={style.datePopUp}>
                    <label htmlFor="date">Fecha:</label>
                    <input type="date" name="date" id="date" defaultValue={new Date().toLocaleDateString('en-CA')} disabled/>
                </div>
                <p>Quien suscribe, <span>M.SC. Laura Ramón Elizondo</span> en calidad de <span>Directora</span>, con base a las leyes y reglamentos vigentes, responde a solicitud de justificación de permiso; bajo la resolución de:</p>

                <div className={style.radioContainerPopUp}>
                    <div className={style.radioPopUp}>
                        <input type="radio" name="resolution" id="approve_partial" defaultChecked={responseState == 1} onClick={() => setForm("1")}/>
                        <label htmlFor="approve_partial">Aceptar con rebajo salarial parcial.</label>
                    </div>

                    <div className={style.radioPopUp}>
                        <input type="radio" name="resolution" id="approve_total" defaultChecked={responseState == 2} onClick={() => setForm("2")}/>
                        <label htmlFor="approve_total">Aceptar con rebajo salarial total.</label>
                    </div>

                    <div className={style.radioPopUp}>
                        <input type="radio" name="resolution" id="approve" defaultChecked={responseState == 3} onClick={() => setForm("3")}/>
                        <label htmlFor="approve">Aceptar sin rebajo salarial.</label>
                    </div>

                    <div className={style.radioPopUp}>
                        <input type="radio" name="resolution" id="deny" defaultChecked={responseState == 4} onClick={() => setForm("4")}/>
                        <label htmlFor="deny">Denegar lo solicitado.</label>
                    </div>

                    <div className={style.radioPopUp}>
                        <input type="radio" name="resolution" defaultChecked={responseState == 5} id="convocatory" onClick={() => setForm("5")}/>
                        <label htmlFor="convocatory">Acoger convocatoria.</label>
                    </div>
                </div>

                <div className={style.commentResponse}>
                    <label htmlFor="justification_response_comment">Comentario</label>
                    <textarea name="justification_response_comment" id="justification_response_comment" value={comment}  onChange={(e) => setComment(e.target.value)}></textarea>
                </div>

                <div className={style.inputContainer}>
                    <input type="button" value="Cancelar" className={style.btnPopUp} onClick={() => setShowPopup(false)}/>
                    {
                        canManage && <input type="button" value="Aceptar" className={style.btnPopUp} onClick={handleSubmit}/>
                    }
                    
                    
                </div>
                
            </div>
        </div>
    )
}