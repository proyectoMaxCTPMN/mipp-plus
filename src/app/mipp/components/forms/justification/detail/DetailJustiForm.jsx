'use client'

import {parseDate} from "@internationalized/date";

import {
    DatePicker,
    Radio, RadioGroup,
    Select, SelectItem,
    Input,
    Button,
    Checkbox,
    Form,
} from "@heroui/react";

import style from './detailJusti.module.css'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {I18nProvider} from "@react-aria/i18n";

function getLocalDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`; // siempre YYYY-MM-DD correcto en local
}

export default function DetailJustiForm({
    title_parameter, 
    position_parameter, 
    justification_parameter,
    PPuserInfo_parameter
}){
    const statuses = ['Pendiente', 'Rebajo salarial parcial', 'Rebajo salarial total', "Sin rebajo salarial", "Denegado", "Acogió convocatoria"]

    const [fecha, setFecha] = useState(parseDate(justification_parameter.absence_date));
    const [formData, setFormData] = useState(justification_parameter)
    const [hasAttachment, setHasAttachment] = useState((justification_parameter.attachment_url))
    
    useEffect(()=> {
        const day = fecha.day.toString().padStart(2, '0')

        const month = fecha.month.toString().padStart(2, '0')
        const year = fecha.year.toString()
        setFormData((prev) => ({...prev, absence_date: `${day}-${month}-${year}`}))
    }, [])
    
    return(
        <div className={style.form_container}>
            <h1>Formulario de Justificación de permiso de salida / ausencia / tardía / incapacidad</h1>
            <p><span>Importante:</span> Todo permiso de ausencia laboral está sujeto a cumplimiento de requisitos y copia adjunta de documento pertinente de cita, convocatoria o licencia, de ser posible con tres días de anticipación. Posterior a la ausencia, el funcionario debe hacer entrega del comprobante pertinente de asistencia en el plazo de 48 (cuarenta y ocho horas). Las licencias dependen de requisitos  previos para su goce. De no presentar el comprobante se transmitirá lo que corresponda.</p>
            <p style={{marginTop: '.6em'}} className={style.personal_info}>Quien se suscribe, <span>{PPuserInfo_parameter.first_name + " " + PPuserInfo_parameter.last_name + " " + PPuserInfo_parameter?.second_last_name}</span>, con cédula de identidad <span>{PPuserInfo_parameter.id}</span>, quien labora en la institución educativa <span>CTP Mercedes Norte</span>, en el puesto de <span>{PPuserInfo_parameter.positions.position}</span>, en condición de <span>{PPuserInfo_parameter.has_ownership ? "Propietario" : "Interino"}</span> </p>

            <Form className={style.form}>

                <div className={style.form_row}>
                    <div className={style.inputdate_container}>
                        <I18nProvider locale="es-CR">
                            <DatePicker
                                defaultValue={fecha}
                                label="Fecha de ausencia: "
                                labelPlacement="outside-left"
                                id="absence_date"
                                name="absence_date"
                                isDisabled
                            />
                        </I18nProvider>
                    </div>

                    <div className={style.justify_container}>
                        <Input label="Justifico:" labelPlacement="outside-left" variant="flat" defaultValue={formData.is_absence ? 'Ausencia' : 'Tardía'} isDisabled />
                    </div>

                </div>

                <Input label="Tipo:" labelPlacement="outside-left" variant="flat" defaultValue={formData.is_whole_day ? 'Jornada Lab. Completa' : 'Media Jornada Lab.'} isDisabled />



                <div className={style.absencescontainer}>
                    {(title_parameter.title_id === 2 && position_parameter === "Docente Academico") ?(
                        <Input label="Cantidad de lecciones ausente: " type="number" labelPlacement="outside-left" variant="flat" defaultValue={formData.absent_time} isDisabled  />
                    ):(
                        <Input label="Cantidad de horas ausente: " type="number" labelPlacement="outside-left" variant="flat" defaultValue={formData.absent_time} isDisabled />
                    )}
                </div>

                {
                    formData.is_absence &&(
                        <div className={style.leaving_at}>
                            <Input label="Saliendo a las:" labelPlacement="outside-left" variant="flat" defaultValue={formData.absent_time} isDisabled />
                        </div>
                    )
                }

                <div className={style.reasoncontainer}>
                    <Select
                        label="Motivo: "
                        placeholder="Seleccione un motivo"
                        selectedKeys={[formData.justification_reason.toString()]}
                        className={style.reasonSelect}
                        variant="bordered"
                        labelPlacement="outside-left"
                        isDisabled
                    >
                        <SelectItem key={'1'}>Cita Medica</SelectItem>
                        <SelectItem key={'2'}>Convocatoria Asamblea</SelectItem>
                        <SelectItem key={'3'}>Asuntos Personales</SelectItem>
                    </Select>



                    {formData.justification_reason == "2" &&(
                    <div className={style.typeconvocatorycontainer}>

                        <RadioGroup defaultValue={formData.assembly_type} orientation="horizontal" isDisabled>
                            <Radio value={1}>Regional</Radio>
                            <Radio value={2}>Nacional</Radio>
                            <Radio value={3}>Circuital</Radio>
                            <Radio value={4}>Sindical</Radio>
                        </RadioGroup>
                    </div>
                    )}

                    {formData.reason == "3" &&(
                    <div className={style.personal_reason}>
                            <Input 
                                placeholder="Explique su situación"
                                isDisabled
                                defaultValue={formData.justification_text}
                                variant="faded"
                            />
                    </div>
                    )}
                    

                </div>
                
                {
                    hasAttachment
                    ?
                        <div className={style.oldFile}>
                            <p>Archivo detectado</p>
                            <a target="_blank" href={justification_parameter.attachment_url.split('?')[0]} className={style.actionBtn}>Ver</a>   
                            <a target="_blank" href={justification_parameter.attachment_url} className={style.actionBtn}>Descargar</a>   
                        </div>
                    :
                        <p>Sin archivo adjunto</p>

                }

                {
                    justification_parameter.justification_reason == '1'
                    ?
                        <h1 className="relative text-[16px]! self-end bg-warning p-2 rounded-lg text-primary-foreground shadow-md align-self-end"> 
                            {statuses[justification_parameter.justification_reason]}
                        </h1>
                    :
                    
                    ['2','3','4'].includes(justification_parameter.justification_reason) ?
                        (<h1 className="relative text-[16px]! self-end bg-success p-2 rounded-lg text-primary-foreground shadow-md align-self-end"> 
                            Aceptada: {statuses[justification_parameter.justification_reason]}
                        </h1>)

                    :
                    justification_parameter.justification_reason == '5' ?
                        <h1 className="relative text-[16px]! self-end bg-danger p-2 rounded-lg text-primary-foreground shadow-md align-self-end"> 
                            {statuses[justification_parameter.justification_reason]}
                        </h1>
                    :
                        <h1 className="relative text-[16px]! self-end bg-secondary p-2 rounded-lg text-primary-foreground shadow-md align-self-end"> 
                            {statuses[justification_parameter.justification_reason]}
                        </h1>
                }

                
            </Form>

        </div>
    )
}
