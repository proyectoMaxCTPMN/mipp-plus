'use client'

import {
    DatePicker,
    Radio, RadioGroup,
    Select, SelectItem,
    Input,
    Button,
    Form,
} from "@heroui/react";

import style from './basicAbsence_old.module.css'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {getLocalTimeZone, today} from "@internationalized/date";
import {I18nProvider} from "@react-aria/i18n";

function getLocalDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`; // siempre YYYY-MM-DD correcto en local
}


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



export default function BasicAbsenceForm_Old({title_parameter, userId_parameter}){
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [fecha, setFecha] = useState(today(getLocalTimeZone()).add({days: 3}));
    const [formData, setFormData] = useState({
        userId: userId_parameter,
        request_date: getLocalDateString(new Date()),
        absence_date: '',
        is_whole_day: true,
        is_absence: false,
        from_hour: '',
        to_hour: '',
        leaving_at: '',
        absent_time: '',
        reason: '',
        assembly_type: null,
        personal_reason: null,
        evidence_file: undefined,
    })
    const [inputName, setInputName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const data = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value)
        })

        const response = await fetch(`/api/send_permission`, {
            method: "POST",
            body: data
        })

        const dataResponse = await response.json()

        if (response.ok) {
            setIsLoading(false)
            toast.success("Solicitud enviada exitosamente...!")
            router.push('/mipp/dashboard')
        }else{
            setIsLoading(false)
            toast.error("Hubo un error al enviar la solicitud")
            console.error(dataResponse)
            
        }
    }

    const handleInputChange = (event) => {
        setFormData(prev => ({
            ...prev,
            evidence_file : event.target.files[0]
        }));
        setInputName(event.target.value)
        
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
        setFormData((prev) => ({...prev, absence_date: `${day}-${month}-${year}`}))
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

                    <RadioGroup className={style.is_whole_day} value={formData.is_whole_day}  orientation="horizontal" onValueChange={(e) => setFormData((prev) => ({...prev, is_whole_day: e}))}>
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
                        onChange={(e) => {setFormData((prev) => ({...prev, from_hour: e.target.value})); console.log(formData.from_hour)}}
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
                        onChange={(e) => setFormData((prev) => ({...prev, to_hour: e.target.value}))}
                    >
                        {toHours.map((hour) => (
                        <SelectItem key={hour.key}>{hour.label}</SelectItem>
                        ))}
                    </Select>
                </div>

                <div className={style.absencescontainer}>
                    {(title_parameter.title_id === 2 && position_parameter === "Docente Academico") ?(
                        <Input label="Cantidad de lecciones ausente" placeholder="Ej: 12" type="number" labelPlacement="outside-left" variant="underlined" value={formData.absent_time} onValueChange={(e) => setFormData((prev) => ({...prev, absent_time: e}))} />
                    ):(
                        <Input label="Cantidad de horas ausente" placeholder="Ej: 12" type="number" labelPlacement="outside-left" variant="underlined" value={formData.absent_time} onValueChange={(e) => setFormData((prev) => ({...prev, absent_time: e}))} />
                    )}
                </div>
                
                <div className={style.radiosContainer}>
                    <p>Tipo de falta:</p>
                    <div className={style.radiosOptions}>
                        <RadioGroup  value={formData.is_absence} orientation="horizontal" onValueChange={(e) => setFormData((prev) => ({...prev, is_absence: e}))}>
                            <Radio value={false}>Tardía</Radio>
                            <Radio value={true}>Ausencia</Radio>
                        </RadioGroup>                         
                    </div>
                </div>

                {
                    formData.is_absence &&(
                        <Input label="Hora de salida:" labelPlacement="outside-left" variant="underlined" className={style.leaving_at} placeholder="E.j: 12:00pm" value={formData.leaving_at} onValueChange={(e) => setFormData((prev) => ({...prev, leaving_at: e}))} />
                    )
                }



                <div className={style.reasoncontainer}>
                    <Select
                        label="Motivo: "
                        placeholder="Seleccione un motivo"
                        selectedKeys={[formData.reason]}
                        className={style.reasonSelect}
                        variant="bordered"
                        onChange={(e) => {setFormData((prev) => ({...prev, reason: e.target.value, assembly_type: '', personal_reason: ''})); console.log(e)}}
                        labelPlacement="outside-left"
                    >
                        <SelectItem key={'1'}>Cita Medica</SelectItem>
                        <SelectItem key={'2'}>Convocatoria Asamblea</SelectItem>
                        <SelectItem key={'3'}>Asuntos Personales</SelectItem>
                    </Select>



                    {formData.reason == "2" &&(
                    <div className={style.typeconvocatorycontainer}>

                        <RadioGroup value={formData.assembly_type} orientation="horizontal" onValueChange={(e) => setFormData((prev) => ({...prev, assembly_type: e}))}>
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
                                
                                value={formData.personal_reason}
                                variant="faded"
                                onValueChange={(e) => setFormData((prev) => ({...prev, personal_reason: e}))}
                            />
                    </div>


                    )}
                    

                </div>

                <div className={style.evidence_container}>
                    <label htmlFor="file-upload" className={style.evidence_label}>Adjuntar evidencia</label>
                    <input type="file" id="file-upload" value={inputName} onChange={(e) => handleInputChange(e)} className={style.evidence_input} />
                </div>
                
                

                <div className={style.buttonContainer}>
                    <Button type="reset" size="lg" className={style.actionBtn}>Limpiar</Button>
                    <Button type="submit" isLoading={isLoading} size="lg" className={style.actionBtn}>Enviar</Button>
                </div>
                
            </Form>

        </div>
    )
}

