'use client'

import {
    DatePicker,
    Radio, RadioGroup,
    Select, SelectItem,
    Input,
    Button,
    Form,
    Pagination,
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Tooltip,
} from "@heroui/react";
import style from './basicAbsence.module.css'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {getLocalTimeZone, today} from "@internationalized/date";
import {I18nProvider} from "@react-aria/i18n";
import Image from "next/image";

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



export default function BasicAbsenceForm({title_parameter, userId_parameter}){
    const reasons = ["", "Cita médica", "Convocatoria Asamblea", "Asuntos Personales"]
    const assemblyTypes = ["", "Regional", "Nacional", "Circuital", "Sindical"]
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
    const [pageIndex, setPageIndex] = useState(1);
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
            evidence_file : event
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
                <Button color="primary" className={style.goPrev} onPress={() => { pageIndex > 1 && setPageIndex(pageIndex - 1)}}>{"<"}</Button>
                <Button color="primary" className={style.goNext} onPress={() => {pageIndex < 6 && setPageIndex(pageIndex + 1)}}>{">"}</Button>
                <Pagination className={style.pagination} color="primary" page={pageIndex} total={6} onChange={setPageIndex} />

                <div className={style.pagesContainer} style={{right: `calc((100% * ${pageIndex - 1} )`}}>
                    <div className={style.inputdate_container}>
                        <h1 className={style.slideTitle}>Fecha de la ausencia</h1>
                        <p className={style.slideSubtitle}>Recordá que solo podés pedir solicitudes 48 horas antes</p>
                        <I18nProvider locale="es-CR">
                            <DatePicker
                                value={fecha}
                                label="Fecha de ausencia"
                                minValue={fecha}
                                id="absence_date"
                                name="absence_date"
                                onChange={handleDateChange}
                            />
                        </I18nProvider>
                    </div>

                    <div className={style.hourcontainer}>
                        <h1 className={style.slideTitle}>Tiempo a faltar</h1>
                        <p className={style.slideSubtitle}>Elegí un rango de horas</p>
                        <Select
                            label="Desde las"
                            placeholder="Seleccione una hora"
                            selectedKeys={[formData.from_hour]}
                            variant="bordered"
                            onChange={(e) => {setFormData((prev) => ({...prev, from_hour: e.target.value}))}}
                            labelPlacement="outside"
                        >
                            {fromHours.map((hour) => (
                            <SelectItem key={hour.key}>{hour.label}</SelectItem>
                            ))}
                        </Select>

                        <Select
                            label="Hasta las"
                            placeholder="Seleccione una hora"
                            selectedKeys={[formData.to_hour]}
                            variant="bordered"
                            onChange={(e) => setFormData((prev) => ({...prev, to_hour: e.target.value}))}
                            labelPlacement="outside"
                        >
                            {toHours.map((hour) => (
                            <SelectItem key={hour.key}>{hour.label}</SelectItem>
                            ))}
                        </Select>
                    </div>
                    
                    <div className={style.radiosContainer}>
                        <h1 className={style.slideTitle}>Tipo de permiso</h1>

                        <div className={style.radiosOptions}>
                            <RadioGroup value={formData.is_whole_day} label='Tipo de ausencia'  orientation="vertical" onValueChange={(e) => setFormData((prev) => ({...prev, is_whole_day: e}))}>
                                <Radio value={true}>Jornada Laboral Completa</Radio>
                                <Radio value={false}>Media Jornada</Radio>
                            </RadioGroup>


                            <RadioGroup  value={formData.is_absence} label='Tipo de falta' orientation="vertical" onValueChange={(e) => setFormData((prev) => ({...prev, is_absence: e}))}>
                                <Radio value={false}>Tardía</Radio>
                                <Radio value={true}>Ausencia</Radio>
                            </RadioGroup>                         
                        </div>
                        {
                            formData.is_absence &&(
                                <Input label="Saliendo del centro educativo a las" placeholder="Inserte la hora de salida" value={formData.leaving_at} onValueChange={(e) => setFormData((prev) => ({...prev, leaving_at: e}))} />
                            )
                        }

                    </div>

                    <div className={style.absencescontainer}>
                        <h1 className={style.slideTitle}>{(title_parameter.title_id === 2 && position_parameter === "Docente Academico") ? 'Lecciones ' : 'Horas '}a faltar</h1>
                        <p className={style.slideSubtitle}></p>
                        {(title_parameter.title_id === 2 && position_parameter === "Docente Academico") ?(
                            <Input label="Cantidad de lecciones ausente" labelPlacement="outside" type="number" placeholder="Inserte la cantidad de lecciones" value={formData.absent_time} onValueChange={(e) => setFormData((prev) => ({...prev, absent_time: e}))} />
                        ):(
                            <Input label="Cantidad de horas ausente" type="number" labelPlacement="outside" placeholder="Inserte la cantidad de horas" value={formData.absent_time} onValueChange={(e) => setFormData((prev) => ({...prev, absent_time: e}))} />
                        )}
                    </div>

                    <div className={style.reasoncontainer}>
                        <h1 className={style.slideTitle}>Motivo de la ausencia</h1>
                        <p className={style.slideSubtitle}>Recordá que si el motivo es personal o no adjuntas algún comprobante, tenés que ir a hablar con su superior</p>
                        <Select
                            label="Motivo"
                            placeholder="Seleccione un motivo"
                            selectedKeys={[formData.reason]}
                            variant="bordered"
                            onChange={(e) => {setFormData((prev) => ({...prev, reason: e.target.value, assembly_type: '', personal_reason: ''}));}}
                            labelPlacement="outside"
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

                                <Input 
                                    label="Explique"
                                    labelPlacement="outside"
                                    placeholder="Explique su situación"
                                    value={formData.personal_reason}
                                    variant="faded"
                                    onValueChange={(e) => setFormData((prev) => ({...prev, personal_reason: e}))}
                                />

                        )}

                        <div className={style.evidence_container}>
                            <label htmlFor="file-upload" className={style.evidence_label}>Adjuntar Evidencia</label>
                            <input type="file" id="file-upload" value={inputName} onChange={(e) => handleInputChange(e)} className={style.evidence_input} />
                        </div>

                    </div>

                    <div className={style.verifyData}>
                        <h1 className={style.slideTitle}>Verificación de datos</h1>
                        <Table hideHeader isStriped className={style.table}>
                            <TableHeader>
                                <TableColumn>NAME</TableColumn>
                                <TableColumn>VALUE</TableColumn>
                                <TableColumn>ACTION</TableColumn>
                            </TableHeader>

                            <TableBody>
                                <TableRow key="1">
                                    <TableCell>Fecha de ausencia</TableCell>
                                    <TableCell>{formData.absence_date}</TableCell>
                                    <TableCell onClick={() => setPageIndex(1)}>
                                        <Tooltip content="Editar Fecha">
                                            <Image src={'/edit.svg'} width={20} height={20} alt="edit"></Image>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>

                                <TableRow key="2">
                                    <TableCell>Tiempo:</TableCell>
                                    <TableCell>{formData.from_hour} - {formData.to_hour}</TableCell>
                                    <TableCell onClick={() => setPageIndex(2)}>
                                        <Tooltip content="Editar Horas">
                                            <Image src={'/edit.svg'} width={20} height={20} alt="edit"></Image>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>

                                <TableRow key="3">
                                    <TableCell>Tipo de solicitud</TableCell>
                                    <TableCell>{formData.is_whole_day ? 'Jornada Laboral Completa' : 'Media Jornada'}</TableCell>
                                    <TableCell onClick={() => setPageIndex(3)}>
                                        <Tooltip content="Editar Tipo">
                                            <Image src={'/edit.svg'} width={20} height={20} alt="edit"></Image>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>

                                <TableRow key="4">
                                    <TableCell>Tipo de falta</TableCell>
                                    <TableCell>{formData.is_absence ? 'Ausencia' : 'Tardía'}</TableCell>
                                    <TableCell onClick={() => setPageIndex(3)}>
                                        <Tooltip content="Editar Falta">
                                            <Image src={'/edit.svg'} width={20} height={20} alt="edit"></Image>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>


                                {
                                    formData.leaving_at != '' &&
                                    <TableRow key="5">
                                        <TableCell>Saliendo a las</TableCell>
                                        <TableCell>{formData.leaving_at}</TableCell>
                                        <TableCell onClick={() => setPageIndex(3)}>
                                            <Tooltip content="Editar Saliendo">
                                                <Image src={'/edit.svg'} width={20} height={20} alt="edit"></Image>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                }

                                    <TableRow key="6">
                                        <TableCell>{(title_parameter.title_id === 2 && position_parameter === "Docente Academico") ? 'Lecciones ' : 'Horas '}a faltar</TableCell>
                                        <TableCell>{formData.absent_time}</TableCell>
                                        <TableCell onClick={() => setPageIndex(4)}>
                                            <Tooltip content="Editar Horas">
                                                <Image src={'/edit.svg'} width={20} height={20} alt="edit"></Image>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow key="7">
                                        <TableCell>Motivo</TableCell>
                                        <TableCell>{reasons[formData.reason]}</TableCell>
                                        <TableCell onClick={() => setPageIndex(5)}>
                                            <Tooltip content="Editar Motivo">
                                                <Image src={'/edit.svg'} width={20} height={20} alt="edit"></Image>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>

                                    {
                                        formData.reason == '2' &&
                                            <TableRow key="8">
                                            <TableCell>Tipo de Asamblea</TableCell>
                                            <TableCell>{assemblyTypes[formData.assembly_type]}</TableCell>
                                            <TableCell onClick={() => setPageIndex(5)}>
                                                <Tooltip content="Editar Asamblea">
                                                    <Image src={'/edit.svg'} width={20} height={20} alt="edit"></Image>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    }


                            </TableBody>
                        </Table>

                        <Button type="submit" isLoading={isLoading} size="md" className={style.confirmBtn}>Enviar</Button>

                    </div>
                </div>


            </Form>

        </div>
    )
}

