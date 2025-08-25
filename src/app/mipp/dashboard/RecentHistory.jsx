'use client'
import Link from 'next/link'
import style from './dashboard.module.css'
import Image from 'next/image'
import { formatDate } from '@/app/utils/formatDate';
import {Tabs, Tab, Card, CardBody, CardHeader, 
    Divider, Chip, Popover, PopoverTrigger, PopoverContent,
    Listbox, ListboxItem} from "@heroui/react";
import { useRouter } from 'next/navigation';

const reasons = ["", "Cita médica", "Convocatoria Asamblea", "Asuntos Personales"]
const typeofomission = ["","Entrada","Salida","Todo el día","Salida Anticipada"]
const statuses = ['Pendiente', 'Rebajo salarial parcial', 'Rebajo salarial total', "Sin rebajo salarial", "Denegado", "Acogió convocatoria"]

function getTimeLeft(expired_date) {
    const now = new Date();
    const expire = new Date(expired_date);

    // Format both dates for display
    const nowStr = now.toLocaleDateString('es-CR');
    const expireStr = expire.toLocaleDateString('es-CR');

    const diffMs = expire - now;

    if (diffMs <= 0) return (<span className={style.isExpiredText}>0d 0min</span>);

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    let result = "";
    if (diffDays > 0) result += `${diffDays}d`;
    if (diffHours > 0) result += ` ${diffHours}h `;
    if (diffDays === 0 && diffHours === 0 && diffMinutes > 0) result += `${diffMinutes} min`;
    if (!result) result = "> 1min";
    return (<span className={style.notExpiredText}>{result.trim()}</span>);
}

export default function RecentHistory({AllDocuments_parameter}){
    console.log(AllDocuments_parameter)
    const router = useRouter()
    return (
    <div className={style.tabsContainer}>


      <Tabs aria-label="Options" className={style.tabs}>
        <Tab key="soli" title="Justificaciones y Solicitudes" className={style.tab}>
          <Card>  
            <CardBody className={style.cardsContainer} >
                {
                    AllDocuments_parameter.absences.map((absence) => (
                        <Popover placement="bottom" key={absence.id}>
                            <PopoverTrigger>
                                <Card  className={style.itemContainer} isPressable>
                                    <CardHeader className={style.itemHeader}>
                                        <h1>{reasons[absence.reason]}</h1>
                                        {
                                            absence.is_pending && <Chip color='warning' variant='bordered'>Pendiente</Chip>
                                        }
                                        {
                                            absence.is_approved && <Chip color='success' variant='bordered'>Aprobado</Chip>
                                        }
                                        {
                                            absence.is_denied && <Chip color='danger' variant='bordered'>Denegado</Chip>
                                        }
                                    </CardHeader>
                                    <Divider />
                                    <CardBody className={style.itemBody}>
                                        <div className={style.absence_info}>
                                            <div style={{display: 'flex', gap: '5px'}}>
                                                <p>Fecha de Solicitud: </p>
                                                <Chip>{formatDate(absence.request_date)}</Chip>
                                            </div>
                                            <div style={{display: 'flex', gap: '5px'}}>
                                                <p>Fecha de Ausencia: </p>
                                                <Chip>{formatDate(absence.absence_date)}</Chip>
                                            </div>
                                            
                                                {
                                                    absence.is_approved ? 
                                                    <div className={style.clockcontainer}>
                                                        <p>Justificacion:</p>
                                                        {(absence.is_justified && absence.justifications.justification_response_state == 0) &&
                                                            <Chip color='warning'>Enviada</Chip>
                                                        }
                                                        
                                                        {(absence.is_justified && absence.justifications.justification_response_state != 0) &&
                                                            <Chip color='primary'>Gestionada</Chip>
                                                        }
                                                        {!absence.is_justified &&
                                                            <Chip className={style.clockChip} variant='bordered'>
                                                                <div style={{display: 'flex', gap:'5px'}}>
                                                                    <Image src={absence.is_expired ? '/clock_expired.svg' : '/clock.svg'} width={20} height={20} alt='clock icon' className={style.clockicon}/>
                                                                    <p style={absence.is_expired ? {color: "red", textDecoration: "line-through"} : {}}>{getTimeLeft(absence.expire_date)}</p>
                                                                </div>
                                                            </Chip>
                                                        }
                                                    </div>
                                                    :(
                                                        <div className={style.clockcontainer}>
                                                        <p>Justificacion: </p>
                                                        <Chip >N/A</Chip>
                                                        </div>
                                                    )
                                                }
                                        </div>
                                    </CardBody>
                                </Card>
                            </PopoverTrigger>

                            <PopoverContent>
                                <Listbox aria-label="Actions" onAction={(url) => router.push(url)} disabledKeys={(absence.is_justified == true || absence.is_approved == false) && [`/mipp/solicitude/justification-formulary/${absence.id}`]}>
                                    <ListboxItem key={`/mipp/history/solicitude-detail/${absence.id}`}>Ver Detalles</ListboxItem>
                                    <ListboxItem key={`/mipp/solicitude/justification-formulary/${absence.id}`}>Ir a Justificar</ListboxItem>
                                </Listbox>
                            </PopoverContent>
                        </Popover>
                    ))
                }          
                {
                    AllDocuments_parameter.justi.map((justification) => (
                        <Popover placement="bottom" key={justification.id} >
                            <PopoverTrigger>
                                <Card  className={style.itemContainer} isPressable>
                                    <CardHeader className={style.itemHeader}>
                                        <h1>{statuses[justification.justification_reason]}</h1>

                                                    {
                                                        (justification.justification_response_state == 0 || justification.justification_response_state == 5) && 
                                                        <>
                                                            <Chip color='warning' variant='bordered'>{statuses[justification.justification_response_state]}</Chip>
                                                        </>
                                                    }

                                                    {
                                                        ([1,2,3].includes(justification.justification_response_state)) && 
                                                        <>
                                                            <Chip color='success' variant='bordered'>{statuses[justification.justification_response_state]}</Chip>
                                                        </>
                                                    }

                                                    {
                                                        (justification.justification_response_state == 4) && 
                                                        <>
                                                            <p color='danger' variant='bordered'>{statuses[justification.justification_response_state]}</p>
                                                        </>
                                                    }
                                    </CardHeader>
                                    <Divider />
                                    <CardBody className={style.itemBody}>
                                        <div className={style.absence_info}>
                                            <Chip color='danger' variant='dot'>Justificacion sin solicitud</Chip>
                                            <div style={{display: 'flex', gap: '5px'}}>
                                                <p>Fecha de Solicitud: </p>
                                                <Chip>{new Date(justification.created_at).toLocaleDateString('es-CR')}</Chip>
                                            </div>
                                            <div style={{display: 'flex', gap: '5px'}}>
                                                <p>Fecha de Ausencia: </p>
                                                <Chip>{formatDate(justification.absence_date)}</Chip>
                                            </div>
                                            
                                                {
                                                    <div className={style.clockcontainer}>
                                                        <p>Estado:</p>
                                                        {(justification.justification_response_state == 0) &&
                                                            <Chip color='warning'>Enviada</Chip>
                                                        }
                                                        
                                                        {(justification.justification_response_state != 0) &&
                                                            <p color='primary'>Gestionada</p>
                                                        }
                                                    </div>
                                                }
                                        </div>
                                    </CardBody>
                                </Card>
                            </PopoverTrigger>
                            <PopoverContent>
                                <Listbox aria-label="Actions" onAction={(url) => router.push(url)}>
                                    <ListboxItem key={`/mipp/history/solicitude-detail/${justification.id}`}>Ver Detalles</ListboxItem>
                                </Listbox>
                            </PopoverContent>
                        </Popover>
                    ))
                }          
            </CardBody>
          </Card>
        </Tab>

        <Tab key="omission" title="Omisiones de Marca" className={style.tab}>
          <Card>  
            <CardBody className={style.cardsContainer} >
                {
                    AllDocuments_parameter.omissions.map((omission) => (
                        <Popover placement="bottom" key={omission.id}>
                            <PopoverTrigger>
                                <Card  className={style.itemContainer} isPressable>
                                    <CardHeader className={style.itemHeader}>
                                        <h1>Razón: {omission.omission_reason}</h1>
                                        <Chip color='default'>{typeofomission[omission.omission_type]}</Chip>
                                    </CardHeader>
                                    <Divider />
                                    <CardBody className={style.itemBody}>
                                        <div className={style.absence_info}>
                                            <div style={{display: 'flex', gap: '5px'}}>
                                                <p>Fecha de Omisión: </p>
                                                <Chip>{new Date(omission.created_at).toLocaleDateString('es-CR')}</Chip>
                                            </div>
                                            
                                                {
                                                    <div className={style.clockcontainer}>
                                                        <p>Visto: </p>
                                                        {(omission.is_revised) &&
                                                            <Chip color='success'>Vista</Chip>
                                                        }
                                                        
                                                        {(!omission.is_revised) &&
                                                            <Chip color='primary'>Sin Ver</Chip>
                                                        }
                                                    </div>
                                                }

                                                {
                                                    <div className={style.clockcontainer}>
                                                        <p>Estado</p>
                                                        <Chip color='success'>{omission.omission_state}</Chip>
                                                    </div>
                                                }


                                        </div>
                                    </CardBody>
                                </Card>
                            </PopoverTrigger>

                            <PopoverContent>
                                <Listbox aria-label="Actions" onAction={(url) => router.push(url)}>
                                    <ListboxItem key={`/mipp/history/omission-detail/${omission.id}`}>Ver Detalles</ListboxItem>
                                </Listbox>
                            </PopoverContent>
                        </Popover>
                    ))
                }                 
            </CardBody>
          </Card>
        </Tab>

        <Tab key="reports" title="Reporte de Infraestructura" className={style.tab}>
          <Card>
            <CardBody className={style.cardsContainer} >
                {
                    AllDocuments_parameter.infra.map((report) => (
                        <Popover placement="bottom" key={report.id}>
                            <PopoverTrigger>
                                <Card  className={style.itemContainer} isPressable>
                                    <CardHeader className={style.itemHeader}>
                                        <h1>Detalle: {report.report_detail}</h1>

                                        {
                                            report.is_revised ?
                                                <Chip color='success' variant='bordered'>Revisado</Chip>
                                            :
                                                <Chip color='warning' variant='bordered'>Sin Revisar</Chip>
                                        }
                                        
                                    </CardHeader>
                                    <Divider />
                                    <CardBody className={style.itemBody}>
                                        <div className={style.absence_info}>
                                            <div style={{display: 'flex', gap: '5px'}}>
                                                <p>Fecha de Reporte: </p>
                                                <Chip>{new Date(report.report_date).toLocaleDateString('es-CR')}</Chip>
                                            </div>
                                            
                                                {
                                                    <div className={style.clockcontainer}>
                                                        <p>Estado: </p>
                                                        {(report.is_managed) &&
                                                            <Chip color='success'>Manejado</Chip>
                                                        }
                                                        
                                                        {(!report.is_managed) &&
                                                            <Chip color='primary'>Sin Manejar</Chip>
                                                        }
                                                    </div>
                                                }

                                        </div>
                                    </CardBody>
                                </Card>
                            </PopoverTrigger>

                            <PopoverContent>
                                <Listbox aria-label="Actions" onAction={(url) => router.push(url)}>
                                    <ListboxItem key={`/mipp/history/infra-detail/${report.id}`}>Ver Detalles</ListboxItem>
                                </Listbox>
                            </PopoverContent>
                        </Popover>
                    ))
                }                 
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
