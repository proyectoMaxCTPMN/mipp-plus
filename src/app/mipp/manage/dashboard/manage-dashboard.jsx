'use client'
import Image from 'next/image';
import style from './manage-dashboard.module.css'
import {useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/app/utils/formatDate';






export default function ManageDashboard({allDocs_parameter}) {
    const router = useRouter()
    const [data, setData] = useState(allDocs_parameter)
    const [unfilteredData, setUnfilteredData] = useState(allDocs_parameter)
    const [search, setSearch] = useState('')
    const [showRequest, setShowRequest] = useState(true)
    const [showJustify, setShowJustify] = useState(true)
    const [showInfra, setShowInfra] = useState(true)
    const [showOmission, setShowOmission] = useState(true)
    const [orderBy, setOrderBy] = useState('descDate')
    
    const handleSearch = (e) => {
        const {value} = e.target;
        setSearch(value)
    }

    const reasons = ["", "Cita médica", "Convocatoria Asamblea", "Asuntos Personales"]
    const statuses = ['Pendiente', 'Rebajo salarial parcial', 'Rebajo salarial total', "Sin rebajo salarial", "Denegado", "Acogió convocatoria"]
    
    useEffect(() => {
        if (search != '') {
            setData(unfilteredData.filter(element => (element.data.user_id.first_name + " " + element.data.user_id.last_name).toLowerCase().startsWith(search.toLowerCase())))
        } else {
            setData(allDocs_parameter)
        }

        return
        
    }, [search])

    useEffect(() => {
        if (orderBy == 'type') {
            setData([...data].sort((a, b) => a.type.localeCompare(b.type)));
        } else if (orderBy == 'ascDate'){
            setData([...data].sort((a, b) => new Date(a.created_at) - new Date(b.created_at)));
            console.log(data)
        } else if (orderBy == 'descDate') {
            setData([...data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
        }
        return
    }, [orderBy]);
    return (
        <>
            <div className={style.searchContainer}>
                <label htmlFor="search">Buscar</label>
                <input type="text" name="search" id="search" className={style.searchInput} placeholder='Buscar por nombre de personal' value={search} onChange={handleSearch}/>
            </div>

            <div className={style.filtersContainer}>

                <div className={style.checkBoxesFilter}>

                    <div className={style.checkBox}>
                        <input type="checkbox" name="absence" id="absence" className={style.checkBoxInput} checked={showRequest} onChange={() => setShowRequest(!showRequest)}/>
                        <label htmlFor="absences" className={style.checkBoxLabel}>Solicitudes</label>
                    </div>

                    <div className={style.checkBox} >
                        <input type="checkbox" name="justi" id="justi" className={style.checkBoxInput} checked={showJustify} onChange={() => setShowJustify(!showJustify)}/>
                        <label htmlFor="justi" className={style.checkBoxLabel}>Justificaciones</label>
                    </div>

                    <div className={style.checkBox}>
                        <input type="checkbox" name="omission" id="omission" className={style.checkBoxInput} checked={showOmission} onChange={() => setShowOmission(!showOmission)}/>
                        <label htmlFor="omission" className={style.checkBoxLabel}>Omisiones de Marca</label>
                    </div>

                    <div className={style.checkBox}>
                        <input type="checkbox" name="infra" id="infra" className={style.checkBoxInput} checked={showInfra} onChange={() => setShowInfra(!showInfra)}/>
                        <label htmlFor="infra" className={style.checkBoxLabel}>Reportes de Infraestructura</label>
                    </div>

                </div>

                <div className={style.orderByFilter}>
                    <label htmlFor="order_by" className={style.selectLabel}>Ordenar por:</label>
                    <select name="order_by" id="order_by" className={style.selectInput} value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
                        <option value="descDate">Fecha (Reciente primero)</option>
                        <option value="ascDate">Fecha (Antiguo primero)</option>
                        <option value="type">Tipo de Documento</option>
                    </select>
                    
                </div>
            </div>


            <div className={style.main}>
                {
                    data.length > 0 &&
                    data.map((doc, index) => (

                        (doc.type == 'absence' && showRequest) ?
                            <div className={style.docSquare} key={index} onClick={() => router.push(`/mipp/manage/${doc.type}/${doc.data.id}`)}>

                                <div className={style.docContent}>
                                    <h1 className={style.docH1}>{doc.data.user_id.first_name} {doc.data.user_id.last_name}</h1>
                                    <h1 className={style.docType}>{formatDate(doc.date)} </h1>
                                    <h2 className={style.docType}>{doc.label}</h2>

                                    <p>Razón: {reasons[doc.data.reason]}</p>

                                    <p>Estado: {
                                        !doc.data.is_pending
                                        ?
                                            !doc.data.is_denied
                                            ?
                                                !doc.data.is_justified
                                                ?
                                                    "Aprobado"
                                                :
                                                "Justificado"

                                            :
                                            "Denegado"

                                        :
                                        "Pendiente"
                                        
                                    }
                                    </p>

                                    <p>Se ausenta el: {formatDate(doc.data.absence_date)}</p>

                                </div>
                                
                                <div className={style.squareFooter}>
                                    <p>Manejar</p>
                                    <Image src={'/manage_icon.svg'} height={20} width={20} alt='goTo icon'></Image>
                                </div>
                            </div>
                        :
                        (doc.type == 'infra' && showInfra) ?
                            <div className={style.docSquare} key={index} onClick={() => router.push(`/mipp/manage/${doc.type}/${doc.data.id}`)}>

                                <div className={style.docContent}>
                                    <h1 className={style.docH1}>{doc.data.user_id.first_name} {doc.data.user_id.last_name}</h1>
                                    <h1 className={style.docType}>{formatDate(doc.date)} </h1>
                                    <h2 className={style.docType}>{doc.label}</h2>

                                    <p>Estado: {
                                        !doc.data.is_revised
                                        ?
                                            "Sin revisar"
                                        :
                                        "Revisado"
                                        
                                    }
                                    </p>

                                    <p>{new Date(doc.date).toLocaleDateString('es-CR')}</p>

                                </div>
                                
                                <div className={style.squareFooter}>
                                    <p>Manejar</p>
                                    <Image src={'/manage_icon.svg'} height={20} width={20} alt='goTo icon'></Image>
                                </div>
                            </div>
                        :
                        (doc.type == 'justi' && showJustify) ?
                            <div className={style.docSquare} key={index} onClick={() => router.push(`/mipp/manage/${doc.type}/${doc.data.id}`)}>

                                <div className={style.docContent}>
                                    <h1 className={style.docH1}>{doc.data.user_id.first_name} {doc.data.user_id.last_name} </h1>
                                    <h1 className={style.docType}>{formatDate(doc.date)} </h1>
                                    <h2 className={style.docType}>{doc.label} </h2>

                                                            <p>Razón: {reasons[doc.data.justification_reason]}</p>


                                                            {
                                                                (doc.data.justification_response_state == 0 || doc.data.justification_response_state == 5) && 
                                                                <>
                                                                    <p>Estado: {statuses[doc.data.justification_response_state]}</p>
                                                                </>
                                                            }

                                                            {
                                                                ([1,2,3].includes(doc.data.justification_response_state)) && 
                                                                <>
                                                                    <p>Estado: {statuses[doc.data.justification_response_state]}</p>
                                                                </>
                                                            }

                                                            {
                                                                (doc.data.justification_response_state == 4) && 
                                                                <>
                                                                    <p>Estado: {statuses[doc.data.justification_response_state]}</p>
                                                                </>
                                                            }

                                    <p>Se ausenta el: {formatDate(doc.data.absence_date)}</p>

                                </div>
                                
                                <div className={style.squareFooter}>
                                    <p>Manejar</p>
                                    <Image src={'/manage_icon.svg'} height={20} width={20} alt='goTo icon'></Image>
                                </div>
                            </div>
                        :
                        (doc.type == 'omission' && showOmission) &&
                            <div className={style.docSquare} key={index} onClick={() => router.push(`/mipp/manage/${doc.type}/${doc.data.id}`)}>

                                <div className={style.docContent}>
                                    <h1 className={style.docH1}>{doc.data.user_id.first_name} {doc.data.user_id.last_name}</h1>
                                    <h2 className={style.docType}>{new Date(doc.date).toLocaleDateString('es-CR')}</h2>
                                    <h2 className={style.docType}>{doc.label}</h2>

                                    <p>Estado: {
                                        !doc.data.is_revised
                                        ?
                                            "Sin revisar"
                                        :
                                        "Revisado"
                                        
                                    }
                                    </p>

                                </div>
                                
                                <div className={style.squareFooter}>
                                    <p>Manejar</p>
                                    <Image src={'/manage_icon.svg'} height={20} width={20} alt='goTo icon'></Image>
                                </div>
                            </div>
                    ))
                }

            </div>
        </>
    )
}