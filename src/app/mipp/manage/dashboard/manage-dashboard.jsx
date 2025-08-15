'use client'
import Image from 'next/image';
import style from './manage-dashboard.module.css'
import {useState } from 'react';





export default function ManageDashboard({allDocs_parameter}) {
    
    const [data, setData] = useState(allDocs_parameter)
    const [search, setSearch] = useState('')
    const [dataLength, setDataLength] = useState(-1)

    const handleSearch = (e) => {
        const {value} = e.target;
        setSearch(value)
    }
    const reasons = ["", "Cita médica", "Convocatoria Asamblea", "Asuntos Personales"]
    return (
        <>
            <div className={style.searchContainer}>
                <label htmlFor="search">Buscar</label>
                <input type="text" name="search" id="search" className={style.searchInput} placeholder='Buscar por nombre de personal' value={search} onChange={handleSearch}/>
            </div>

            <div className={style.filtersContainer}>

                <div className={style.checkBoxesFilter}>

                    <div className={style.checkBox}>
                        <input type="checkbox" name="absence" id="absence" className={style.checkBoxInput}/>
                        <label htmlFor="absences" className={style.checkBoxLabel}>Solicitudes</label>
                    </div>

                    <div className={style.checkBox} >
                        <input type="checkbox" name="justi" id="justi" className={style.checkBoxInput}/>
                        <label htmlFor="justi" className={style.checkBoxLabel}>Justificaciones</label>
                    </div>

                    <div className={style.checkBox}>
                        <input type="checkbox" name="omission" id="omission" className={style.checkBoxInput}/>
                        <label htmlFor="omission" className={style.checkBoxLabel}>Omisiones de Marca</label>
                    </div>

                    <div className={style.checkBox}>
                        <input type="checkbox" name="infra" id="infra" className={style.checkBoxInput}/>
                        <label htmlFor="infra" className={style.checkBoxLabel}>Reportes de Infraestructura</label>
                    </div>

                </div>

                <div className={style.orderByFilter}>
                    <label htmlFor="order_by" className={style.selectLabel}>Ordenar por:</label>
                    <select name="order_by" id="order_by" className={style.selectInput}>
                        <option value="type">Tipo de Documento</option>
                        <option value="date">Fecha</option>
                        <option value="alpha">Alfabeticamente</option>
                    </select>
                    
                </div>
            </div>


            <div className={style.main}>
                {data.map((doc, index) => (

                    (doc.type == 'absence') &&
                    <div className={style.docSquare} key={index}>

                        <div className={style.docContent}>
                            <h1 className={style.docH1}>{doc.data.user_id.first_name} {doc.data.user_id.last_name}</h1>
                            <h2 className={style.docType}>{doc.label}</h2>

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

                            <p>{new Date(doc.date).toLocaleDateString('es-CR')}</p>

                        </div>
                        
                        <div className={style.squareFooter}>
                            <p>Manejar</p>
                            <Image src={'/manage_icon.svg'} height={20} width={20} alt='goTo icon'></Image>
                        </div>
                    </div>
                ))}

            </div>
        </>
    )
}