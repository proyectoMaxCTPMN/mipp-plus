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

import style from './basicJusti.module.css'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {I18nProvider} from "@react-aria/i18n";
import Link from "next/link";

function getLocalDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`; // siempre YYYY-MM-DD correcto en local
}


export default function BasicJustiForm({
    title_parameter, 
    position_parameter, 
    request_id_parameter,
    userId_parameter,
    absenceData_parameter,
}){

    const router = useRouter();

    const [fecha, setFecha] = useState(parseDate(absenceData_parameter.request_date));
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        userId: userId_parameter,
        request_id: request_id_parameter,
        justification_date: getLocalDateString(new Date()),
        absence_date: absenceData_parameter.absence_date,
        is_absence: absenceData_parameter.is_absence,
        is_all_day: absenceData_parameter.is_whole_day,
        attachment_url: absenceData_parameter.evidence_file_url || null,
        justification_reason: absenceData_parameter.reason,
        absent_time: absenceData_parameter.absent_time,
        justification_text: absenceData_parameter.personal_reason || '',
        assembly_type: absenceData_parameter.assembly_type || '',
        leaving_at: absenceData_parameter.leaving_at,
        justification_comment: ''
    })
    const [hasAttachment, setHasAttachment] = useState((absenceData_parameter.evidence_file_url))
    const [changedInput, setChangedInput] = useState(false)
    const [inputFile, setInputFile] = useState('');
    const [inputName, setInputName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputFile)
        setIsLoading(true)
        const data = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value)
        })

        if (changedInput) {
            data.append("changed_input", true)
            data.append("new_attachment", inputFile)
        }

        const response = await fetch(`/api/save_justi`, {
            method: "POST",
            body: data
        })

        const dataResponse = await response.json()

        if (response.ok) {
            setIsLoading(false)
            toast.success("Solicitud enviada exitosamente...!")
            router.refresh()
        }else{
            setIsLoading(false)
            toast.error("Hubo un error al enviar la solicitud")
            console.error(dataResponse)
            
        }
    }

    const handleInputChange = (e) => {
        setInputFile(e.target.files[0])
        setInputName(e.target.value)
    }
    
    const handleDateChange = (e) => {
        const day = e.day.toString().padStart(2, '0')
        const month = e.month.toString().padStart(2, '0')
        const year = e.year.toString()
        setFormData((prev) => ({...prev, absence_date: `${day}-${month}-${year}`}))
        setFecha(e)
    }
    
    useEffect(()=> {
        const day = fecha.day.toString().padStart(2, '0')

        const month = fecha.month.toString().padStart(2, '0')
        const year = fecha.year.toString()
        setFormData((prev) => ({...prev, absence_date: `${year}-${month}-${day}`}))
    }, [])
    
    return(
        <div className={style.form_container}>
            <h1>Formulario de solicitud de permiso salida/ausencia/tardía/incapacidad</h1>
            <p><span>Importante:</span> Todo permiso de ausencia laboral está sujeto a cumplimiento de requisitos y copia adjunta de documento pertinente de cita, convocatoria o licencia, de ser posible con tres días de anticipación. Posterior a la ausencia, el funcionario debe hacer entrega del comprobante pertinente de asistencia en el plazo de 48 (cuarenta y ocho horas). Las licencias dependen de requisitos  previos para su goce. De no presentar el comprobante se transmitirá lo que corresponda.</p>
            

            <Form className={style.form} onSubmit={handleSubmit}>

                <div className={style.form_row}>
                    <div className={style.inputdate_container}>
                        <I18nProvider locale="es-CR">
                            <DatePicker
                                value={fecha}
                                label="Fecha de ausencia: "
                                labelPlacement="outside-left"
                                minValue={fecha}
                                id="absence_date"
                                name="absence_date"
                                onChange={handleDateChange}
                            />
                        </I18nProvider>
                    </div>

                    <div className={style.justify_container}>
                        <Input label="Justifico:" labelPlacement="outside-left" variant="flat" value={formData.is_absence ? 'Ausencia' : 'Tardía'} disabled />
                    </div>

                </div>

                <Input label="Tipo:" labelPlacement="outside-left" variant="flat" value={formData.is_whole_day ? 'Jornada Lab. Completa' : 'Media Jornada Lab.'} disabled />



                <div className={style.absencescontainer}>
                    {(title_parameter.title_id === 2 && position_parameter === "Docente Academico") ?(
                        <Input label="Cantidad de lecciones ausente: " type="number" labelPlacement="outside-left" variant="flat" value={formData.absent_time} disabled  />
                    ):(
                        <Input label="Cantidad de horas ausente: " type="number" labelPlacement="outside-left" variant="flat" value={formData.absent_time} disabled />
                    )}
                </div>

                {
                    formData.is_absence &&(
                        <div className={style.leaving_at}>
                            <Input label="Saliendo a las:" labelPlacement="outside-left" variant="flat" value={formData.absent_time} disabled />
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
                        disabled
                    >
                        <SelectItem key={'1'}>Cita Medica</SelectItem>
                        <SelectItem key={'2'}>Convocatoria Asamblea</SelectItem>
                        <SelectItem key={'3'}>Asuntos Personales</SelectItem>
                    </Select>



                    {formData.justification_reason == "2" &&(
                    <div className={style.typeconvocatorycontainer}>

                        <RadioGroup value={formData.assembly_type} orientation="horizontal" isDisabled>
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
                                disabled
                                value={formData.justification_text}
                                variant="faded"
                            />
                    </div>
                    )}
                    

                </div>

                <div className={style.justification_comment}>
                            <Input 
                                placeholder="(Opcional) Agregue un comentario"
                                value={formData.justification_comment}
                                onValueChange={(e) => setFormData((prev) => ({...prev, justification_comment: e}))}
                                variant="faded"
                            />
                    </div>
                
                {
                    hasAttachment != '' 
                    ?
                        <div className={style.oldFile}>
                            <p>Utilizando archivo anterior</p>
                            <a target="_blank" href={hasAttachment.split('?')[0]} className={style.actionBtn}>Ver</a>   
                            <a target="_blank" href={hasAttachment} className={style.actionBtn}>Descargar</a>   
                        </div>
                    :
                        <p>Sin archivo anterior</p>

                }

                <div className={style.evidence}>
                    <Checkbox isSelected={changedInput} onValueChange={setChangedInput}>
                        Adjuntar nuevo archivo?
                    </Checkbox>
                </div>

                {
                    changedInput &&
                    <div className={style.evidence_container}>
                        <label htmlFor="file-upload" className={style.evidence_label}>Adjuntar evidencia</label>
                        <input type="file" id="file-upload" value={inputName} onChange={(e) => handleInputChange(e)} className={style.evidence_input} />
                    </div>
                }

                <div className={style.buttonContainer}>
                    <Button type="submit" isLoading={isLoading} size="lg" className={style.actionBtn}>Enviar</Button>
                </div>
                
            </Form>

        </div>
    )
}
