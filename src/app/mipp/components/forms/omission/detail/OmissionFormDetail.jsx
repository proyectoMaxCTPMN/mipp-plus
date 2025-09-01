'use client'

import {
    DatePicker,
    Radio, RadioGroup,
    Select, SelectItem,
    Input,
    Button,
    Form,
} from "@heroui/react";

import style from '../omissionForm.module.css'
import { useState, useEffect } from 'react'
import {getLocalTimeZone, parseDate, today} from "@internationalized/date";
import {I18nProvider} from "@react-aria/i18n";



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



export default function OmissionForm({  omissionf, PPfullName_parameter, PPposition_parameter, PPtitle_parameter}){
    const [fecha, setFecha] = useState(parseDate(omissionf.omission_date));
    const [formData, setFormData] = useState(
        omissionf
    );


    useEffect(()=> {
        const day = fecha.day.toString().padStart(2, '0')

        const month = fecha.month.toString().padStart(2, '0')
        const year = fecha.year.toString()
        setFormData((prev) => ({...prev, omission_date: `${month}-${day}-${year}`}))
        setFecha(`${year}-${month}-${day}`)
    }, [])

    return(
        <div className={style.form_container}>
            <h1>Formulario de solicitud de permiso salida/ausencia/tardía/incapacidad</h1>
            <p><span>Importante:</span> Todo permiso de ausencia laboral está sujeto a cumplimiento de requisitos y copia adjunta de documento pertinente de cita, convocatoria o licencia, de ser posible con tres días de anticipación. Posterior a la ausencia, el funcionario debe hacer entrega del comprobante pertinente de asistencia en el plazo de 48 (cuarenta y ocho horas). Las licencias dependen de requisitos  previos para su goce. De no presentar el comprobante se transmitirá lo que corresponda.</p>

            <Form className={style.form} >

                <div className="flex">
                    <Input isDisabled label="Nombre: " placeholder="Ej: 12" type="text" labelPlacement="outside-left" variant="underlined" defaultValue={PPfullName_parameter.full_name} />
                    <Input isDisabled label="Cedula: " placeholder="Ej: 12" type="text" labelPlacement="outside-left" variant="underlined" defaultValue={omissionf.user_id} />
                </div>

                <div className="flex">
                    <Input isDisabled label="Puesto: " placeholder="Ej: 12" type="text" labelPlacement="outside-left" variant="underlined" defaultValue={PPposition_parameter} />
                    <Input isDisabled label="Instancia: " placeholder="Ej: 12" type="text" labelPlacement="outside-left" variant="underlined" defaultValue={PPtitle_parameter.title} />
                </div>
                
                

                <div className={style.inputdate_container}>
                    <I18nProvider locale="es-CR">
                        <DatePicker
                            defaultValue={fecha}
                            label="Fecha de omision: "
                            labelPlacement="outside-left"
                            id="absence_date"
                            name="absence_date"
                            isDisabled
                        />
                    </I18nProvider>
                </div>

                <RadioGroup defaultValue={formData.omission_type} label={'Tipo de Omision'} isDisabled orientation="horizontal" >
                    <Radio value={1}>Entrada</Radio>
                    <Radio value={2}>Salida</Radio>
                    <Radio value={3}>Todo el dia</Radio>
                    <Radio value={4}>Salida anticipada</Radio>
                </RadioGroup>

                <div className={style.timeContainer}>
                            {(formData.omission_type == 1 || formData.omission_type == 3) && 
                                <>
                                    <Select
                                        label="Hora de entrada:"
                                        placeholder="Seleccione una hora"
                                        labelPlacement="outside-left"
                                        selectedKeys={[formData.entry_time]}
                                        variant="bordered"
                                        className="mb-3"
                                        isDisabled
                                    >
                                        {fromHours.map((hour) => (
                                        <SelectItem key={hour.label}>{hour.label}</SelectItem>
                                        ))}
                                    </Select>
                                </>
                            }
                            {(formData.omission_type == 2 || formData.omission_type == 3) &&
                                <>
                                    <Select
                                        label="Hora de entrada:"
                                        placeholder="Seleccione una hora"
                                        labelPlacement="outside-left"
                                        selectedKeys={[formData.exit_time]}
                                        variant="bordered"
                                        
                                        isDisabled
                                    >
                                        {toHours.map((hour) => (
                                        <SelectItem key={hour.label}>{hour.label}</SelectItem>
                                        ))}
                                    </Select>
                                </>
                            }
                            {formData.omission_type == 4 &&
                                <Input isDisabled label="Hora de salida: " placeholder="Ej: 12" type="text" labelPlacement="outside-left" variant="underlined" defaultValue={formData.exit_time} />
                            }
                </div>

                <Input isDisabled label="Justificación: " placeholder="" type="text" labelPlacement="outside-left" variant="faded" defaultValue={formData.omission_reason} />
                
                <h1 className="w-max! relative text-[16px]! self-end bg-secondary p-2 rounded-lg text-primary-foreground shadow-md align-self-end"> 
                    {omissionf.is_revised ? 'Revisado: ' : 'Sin revisar: '}{omissionf.omission_state}
                </h1>

            </Form>

        </div>
    )
}

