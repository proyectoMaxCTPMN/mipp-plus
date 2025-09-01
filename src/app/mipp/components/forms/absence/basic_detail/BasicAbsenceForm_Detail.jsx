'use client'
import {
    DatePicker,
    Radio, RadioGroup,
    Select, SelectItem,
    Input,
    Button,
    Form,
} from "@heroui/react";
import {parseDate} from "@internationalized/date";

import style from './basicAbsence_detail.module.css'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {I18nProvider} from "@react-aria/i18n";
import { getUserRoles } from "@/app/utils/userFetch";


const fromHours = [
  {key: "7:00", label: "7:00"},
  {key: "7:40", label: "7:40"},
  {key: "8:20", label: "8:20"},
  {key: "9:00", label: "9:00"},
  {key: "9:20", label: "9:20"},
  {key: "10:00", label: "10:00"},
  {key: "10:40", label: "10:40"},
  {key: "11:20", label: "11:20"},
  {key: "12:10", label: "12:10"},
  {key: "12:50", label: "12:50"},
  {key: "1:30", label: "1:30"},
  {key: "2:10", label: "2:10"},
  {key: "2:30", label: "2:30"},
  {key: "3:10", label: "3:10"},
  {key: "3:50", label: "3:50"},
  {key: "4:30", label: "4:30"},
];

const toHours = [
  {key: "7:40", label: "7:40"},
  {key: "8:20", label: "8:20"},
  {key: "9:00", label: "9:00"},
  {key: "9:20", label: "9:20"},
  {key: "10:00", label: "10:00"},
  {key: "10:40", label: "10:40"},
  {key: "11:20", label: "11:20"},
  {key: "12:10", label: "12:10"},
  {key: "12:50", label: "12:50"},
  {key: "1:30", label: "1:30"},
  {key: "2:10", label: "2:10"},
  {key: "2:30", label: "2:30"},
  {key: "3:10", label: "3:10"},
  {key: "3:50", label: "3:50"},
  {key: "4:30", label: "4:30"},
];



export default function BasicAbsenceForm_Detail({
    userRoles_parameter,
    title_parameter, 
    absencef,
    PPuserInfo_parameter,


}){
    const router = useRouter()
    const [fecha, setFecha] = useState(parseDate(absencef.absence_date));
    const [formData, setFormData] = useState({
        userId: absencef.user_id,
        request_date: absencef.request_date,
        absence_date: absencef.absence_date,
        is_whole_day: absencef.is_whole_day,
        is_absence: absencef.is_absence,
        from_hour: absencef.from_hour,
        to_hour: absencef.to_hour,
        leaving_at: absencef.leaving_at,
        absent_time: absencef.absent_time,
        reason: absencef.reason,
        assembly_type: absencef.assembly_type,
        personal_reason: absencef.personal_reason,
    })

    console.log(absencef.absence_date)

    return(
        <div className={style.form_container}>
            <h1>Formulario de solicitud de permiso salida/ausencia/tardía/incapacidad</h1>
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

                    <RadioGroup isDisabled className={style.is_whole_day} defaultValue={formData.is_whole_day}  orientation="horizontal">
                        <Radio value={true}>Jornada Laboral Completa</Radio>
                        <Radio value={false}>Media Jornada</Radio>
                    </RadioGroup>
                </div>

                <div className={style.hourcontainer}>
                    <Select
                        label="Desde las:"
                        placeholder="Seleccione una hora"
                        labelPlacement="outside-left"
                        selectedKeys={[formData.from_hour]}
                        variant="bordered"
                        isDisabled
                    >
                        {fromHours.map((hour) => (
                        <SelectItem key={hour.key}>{hour.label}</SelectItem>
                        ))}
                    </Select>
                    <Select
                        label="Hasta las:"
                        placeholder="Seleccione una hora"
                        labelPlacement="outside-left"
                        selectedKeys={[formData.to_hour]}
                        variant="bordered"
                        isDisabled
                    >
                        {toHours.map((hour) => (
                        <SelectItem key={hour.key}>{hour.label}</SelectItem>
                        ))}
                    </Select>
                </div>

                <div className={style.absencescontainer}>
                    {(title_parameter.title_id === 2 && position_parameter === "Docente Academico") ?(
                        <Input isDisabled label="Cantidad de lecciones ausente" placeholder="Ej: 12" type="number" labelPlacement="outside-left" variant="underlined" defaultValue={formData.absent_time} />
                    ):(
                        <Input isDisabled label="Cantidad de horas ausente" placeholder="Ej: 12" type="number" labelPlacement="outside-left" variant="underlined" defaultValue={formData.absent_time} />
                    )}
                </div>
                
                <div className={style.radiosContainer}>
                    <p>Tipo de falta:</p>
                    <div className={style.radiosOptions}>
                        <RadioGroup isDisabled defaultValue={formData.is_absence} orientation="horizontal">
                            <Radio value={false}>Tardía</Radio>
                            <Radio value={true}>Ausencia</Radio>
                        </RadioGroup>                         
                    </div>
                </div>

                {
                    formData.is_absence &&(
                        <Input isDisabled label="Hora de salida:" labelPlacement="outside-left" variant="underlined" className={style.leaving_at} placeholder="E.j: 12:00pm" defaultValue={formData.leaving_at} />
                    )
                }



                <div className={style.reasoncontainer}>
                    <Select
                        label="Motivo: "
                        placeholder="Seleccione un motivo"
                        selectedKeys={[formData.reason.toString()]}
                        className={style.reasonSelect}
                        variant="bordered"
                        isDisabled
                        labelPlacement="outside-left"
                    >
                        <SelectItem key={'1'}>Cita Medica</SelectItem>
                        <SelectItem key={'2'}>Convocatoria Asamblea</SelectItem>
                        <SelectItem key={'3'}>Asuntos Personales</SelectItem>
                    </Select>



                    {formData.reason == 2 &&(
                    <div className={style.typeconvocatorycontainer}>

                        <RadioGroup isDisabled defaultValue={formData.assembly_type} orientation="horizontal">
                            <Radio value={1}>Regional</Radio>
                            <Radio value={2}>Nacional</Radio>
                            <Radio value={3}>Circuital</Radio>
                            <Radio value={4}>Sindical</Radio>
                        </RadioGroup>
                    </div>
                    )}

                    {formData.reason == 3 &&(
                    <div className={style.personal_reason}>
                            <Input 
                                placeholder="Explique su situación"
                                isDisabled
                                defaultValue={formData.personal_reason}
                                variant="faded"
                            />
                    </div>


                    )}
                    

                </div>



                {
                    absencef.evidence_file_url != null 
                    ?
                        <div className={style.oldFile}>
                            <p>Archivo detectado</p>
                            <a target="_blank" href={absencef.evidence_file_url.split('?')[0]} className={style.actionBtn}>Ver</a>   
                            <a target="_blank" href={absencef.evidence_file_url} className={style.actionBtn}>Descargar</a>   
                        </div>
                    :
                        <p>Sin archivo adjunto</p>

                }

                {
                    absencef.is_justified 
                    ?
                    <h1 className="relative text-[16px]! self-end bg-success p-2 rounded-lg text-primary-foreground shadow-md align-self-end"> 
                        {!(userRoles_parameter.root || userRoles_parameter.manage_documents) ? "Aprobado: Justificacion Enviada" : "Gestionado: Justificación"}
                    </h1>
                    :
                    
                        absencef.is_approved ?
                            (<h1 className="relative text-[16px]! self-end bg-secondary p-2 rounded-lg text-primary-foreground shadow-md align-self-end"> 
                                {!(userRoles_parameter.root || userRoles_parameter.manage_documents) ? "Aprobado: Justificación sin Enviar": "Gestionado: Justificación en espera..."}
                            </h1>)
                        :
                        absencef.is_denied ?
                            <h1 className="relative text-[16px]! self-end bg-danger p-2 rounded-lg text-primary-foreground shadow-md align-self-end"> 
                                {!(userRoles_parameter.root || userRoles_parameter.manage_documents) ?'Solicitud Denegada' : 'Gestionado: Solicitud Denegada'}
                            </h1>
                        :
                        absencef.is_convocatory ?
                            <h1 className="relative text-[16px]! self-end bg-secondary p-2 rounded-lg text-primary-foreground shadow-md align-self-end"> 
                                {!(userRoles_parameter.root || userRoles_parameter.manage_documents) ?'Acoger Convocatoria' : 'Gestionado: Acoger Convocatoria'}
                            </h1>
                        :
                            <h1 className="relative text-[16px]! self-end bg-warning p-2 rounded-lg text-primary-foreground shadow-md align-self-end"> 
                                Pendiente{!(userRoles_parameter.root || userRoles_parameter.manage_documents) ? (absencef.is_revised ? ': Revisada por superior': ': Sin revisar'):(absencef.is_revised ? ': Visto anteriormente': ': Nueva')}
                            </h1>
                }
                
                
            </Form>

        </div>
    )
}

