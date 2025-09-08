'use client'

import {
    Radio, RadioGroup,
    Select, SelectItem,
    Input,
    Button,
    Form,
} from "@heroui/react";
import style from './reportForm.module.css'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useRouter } from 'next/navigation'




export default function ReportForm({ userId_parameter}){
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        userId: userId_parameter,
        report_place: 0,
        report_building: 0,
        report_floor: 0,
        report_classroom: 0,
        report_detail: '',
        evidence_file: null,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)

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
            router.push('/mipp/dashboard')
            setIsLoading(false)
        }else{
            toast.error("Hubo un error al enviar la solicitud")
            console.error(dataResponse)
            setIsLoading(false)
            
        }
        
    }

    console.log(formData)


    return(
        <div className={style.form_container}>
            <h1>Formulario de Justificacion de Omision de Marca</h1>
            

            <Form className={style.form} onSubmit={handleSubmit}>


                <RadioGroup className={style.radioContainer} value={formData.report_place} label={'Lugar del Reporte'} isRequired orientation="horizontal" onValueChange={(e) => setFormData((prev) => ({...prev, report_place: e}))}>
                    <Radio value={1}>Aula</Radio>
                    <Radio value={2}>Pasillo</Radio>
                    <Radio value={3}>Otro</Radio>
                </RadioGroup>

                <div className={style.placeContainer}>
                    <Select
                        isRequired
                        label="Edificio: "
                        labelPlacement="outside-left"
                        selectedKeys={[formData.report_building]}
                        variant="bordered"
                        onChange={(e) => {setFormData((prev) => ({...prev, report_building: e.target.value}));}}
                        placeholder="Seleccione una opcion"
                    >
                        <SelectItem key={1}>Edificio 1</SelectItem>
                        <SelectItem key={2}>Edificio 2</SelectItem>
                        <SelectItem key={3}>Edificio 3</SelectItem>
                        <SelectItem key={4}>Edificio 4</SelectItem>
                        <SelectItem key={5}>Edificio 5</SelectItem>
                        <SelectItem key={6}>Gimnasio</SelectItem>
                        <SelectItem key={7}>Dirección</SelectItem>
                        <SelectItem key={8}>Comedor</SelectItem>
                        <SelectItem key={9}>Lab. Electro</SelectItem>
                    </Select>

                    <Select
                        isRequired
                        label="Piso: "
                        labelPlacement="outside-left"
                        selectedKeys={[formData.report_floor]}
                        variant="bordered"
                        onChange={(e) => {setFormData((prev) => ({...prev, report_floor: e.target.value}));}}
                        placeholder="Seleccione una opcion"
                    >
                        <SelectItem key={1}>1° Piso</SelectItem>
                        <SelectItem key={2}>2° Piso</SelectItem>
                        <SelectItem key={3}>N/A</SelectItem>
                    </Select>

                    <Input isRequired label="Aula: " min={0} max={30} placeholder="" type="number" labelPlacement="outside-left" variant="bordered" value={formData.report_classroom} onValueChange={(e) => setFormData((prev) => ({...prev, report_classroom: e}))} />
                </div>

                <Input isRequired label="Detalle: " placeholder="" type="text" labelPlacement="outside-top" variant="faded" value={formData.report_detail} onValueChange={(e) => setFormData((prev) => ({...prev, report_detail: e}))} />
                

                <div className={style.buttonContainer}>
                    <Button type="reset" size="lg" className={style.actionBtn}>Limpiar</Button>
                    <Button type="submit" isLoading={isLoading} size="lg" className={style.actionBtn}>Enviar</Button>
                </div>
                
            </Form>

        </div>
    )
}

