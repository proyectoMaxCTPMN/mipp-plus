'use client'

import {
    DatePicker,
    Radio, RadioGroup,
    Select, SelectItem,
    Input,
    Button,
    Form,
} from "@heroui/react";

import style from './omissionForm.module.css'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {getLocalTimeZone, today} from "@internationalized/date";
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



export default function OmissionForm({ userId_parameter}){
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [fecha, setFecha] = useState(today(getLocalTimeZone()));
    const [formData, setFormData] = useState({
        userId: userId_parameter,
        omission_date: '',
        omission_reason: '',
        entry_time: '',
        exit_time: '',
        omission_type: 0,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)

        const data = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value)
        })

        const response = await fetch(`/api/save_omission`, {
            method: "POST",
            body: data
        })

        const dataResponse = await response.json()

        if (response.ok) {
            toast.success("Solicitud enviada exitosamente...!")
            router.push('/mipp/dashboard')
            setIsLoading(false)
        }else{
            toast.error("Hubo un error al enviar la solicitud")
            console.error(dataResponse)
            setIsLoading(false)
            
        }
        
    }

    const handleDateChange = (e) => {
        const day = e.day.toString().padStart(2, '0')
        const month = e.month.toString().padStart(2, '0')
        const year = e.year.toString()
        setFormData((prev) => ({...prev, omission_date: `${month}-${day}-${year}`}))
        setFecha(e)
    }

    useEffect(()=> {
        const day = fecha.day.toString().padStart(2, '0')

        const month = fecha.month.toString().padStart(2, '0')
        const year = fecha.year.toString()
        setFormData((prev) => ({...prev, omission_date: `${month}-${day}-${year}`}))
    }, [])

    return(
        <div className={style.form_container}>
            <h1>Formulario de Justificacion de Omision de Marca</h1>
            

            <Form className={style.form} onSubmit={handleSubmit}>

                    <div className={style.inputdate_container}>
                        <I18nProvider locale="es-CR">
                            <DatePicker
                                value={fecha}
                                label="Fecha de omision: "
                                labelPlacement="outside-left"
                                minValue={fecha}
                                id="absence_date"
                                name="absence_date"
                                onChange={handleDateChange}
                                isRequired
                            />
                        </I18nProvider>
                    </div>

                <RadioGroup value={formData.omission_type} label={'Tipo de Omision'} isRequired orientation="horizontal" onValueChange={(e) => setFormData((prev) => ({...prev, omission_type: e, entry_time: '', exit_time: ''}))}>
                    <Radio value={1}>Entrada</Radio>
                    <Radio value={2}>Salida</Radio>
                    <Radio value={3}>Todo el dia</Radio>
                    <Radio value={4}>Salida anticipada</Radio>
                </RadioGroup>

                <div className={style.timeContainer}>
                            {(formData.omission_type == 1 || formData.omission_type == 3) && 
                                <>
                                    <Select
                                        isRequired
                                        label="Hora de entrada:"
                                        placeholder="Seleccione una hora"
                                        labelPlacement="outside-left"
                                        selectedKeys={[formData.entry_time]}
                                        variant="bordered"
                                        className="mb-3"
                                        onChange={(e) => {setFormData((prev) => ({...prev, entry_time: e.target.value}));}}
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
                                        isRequired
                                        label="Hora de entrada:"
                                        placeholder="Seleccione una hora"
                                        labelPlacement="outside-left"
                                        selectedKeys={[formData.exit_time]}
                                        variant="bordered"
                                        
                                        onChange={(e) => {setFormData((prev) => ({...prev, exit_time: e.target.value}))}}
                                    >
                                        {toHours.map((hour) => (
                                        <SelectItem key={hour.label}>{hour.label}</SelectItem>
                                        ))}
                                    </Select>
                                </>
                            }
                            {formData.omission_type == 4 &&
                                <Input isRequired label="Hora de salida: " placeholder="Ej: 12" type="text" labelPlacement="outside-left" variant="underlined" value={formData.exit_time} onValueChange={(e) => setFormData((prev) => ({...prev, exit_time: e}))} />
                            }
                </div>

                <Input isRequired label="Justificación: " placeholder="" type="text" labelPlacement="outside-left" variant="faded" value={formData.omission_reason} onValueChange={(e) => setFormData((prev) => ({...prev, omission_reason: e}))} />
                

                <div className={style.buttonContainer}>
                    <Button type="reset" size="lg" className={style.actionBtn}>Limpiar</Button>
                    <Button type="submit" isLoading={isLoading} size="lg" className={style.actionBtn}>Enviar</Button>
                </div>
                
            </Form>

        </div>
    )
}

