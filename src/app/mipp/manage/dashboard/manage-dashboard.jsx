'use client'
import Image from 'next/image';
import style from './soliHistory.module.css'
import {useState } from 'react';





export default function ManageDashboard({allDocs_parameter}) {
    
    const [data, setData] = useState(allDocs_parameter)
    const [search, setSearch] = useState('')
    const [dataLength, setDataLength] = useState(-1)

    const handleSearch = (e) => {
        const {value} = e.target;
        setSearch(value)
    }

    console.log(data)
    const reasons = ["", "Cita médica", "Convocatoria Asamblea", "Asuntos Personales"]
    return (
        <>
            <div className={style.searchContainer}>
                <label htmlFor="search">Buscar</label>
                <input type="text" name="search" id="search" className={style.searchInput} placeholder='Buscar por motivo' value={search} onChange={handleSearch}/>
            </div>


            <div className={style.main}>
                {data.absences.map((doc, index) => (
                    <div className={style.docSquare} key={index}>
                    </div>
                ))}

                {data.absences.map((doc, index) => (
                    <div className={style.docSquare} key={index}>
                    </div>
                ))}
                
                {data.absences.map((doc, index) => (
                    <div className={style.docSquare} key={index}>
                    </div>
                ))}

                {data.absences.map((doc, index) => (
                    <div className={style.docSquare} key={index}>
                    </div>
                ))}

                {data.absences.map((doc, index) => (
                    <div className={style.docSquare} key={index}>
                    </div>
                ))}
                
                {data.absences.map((doc, index) => (
                    <div className={style.docSquare} key={index}>
                    </div>
                ))}
            </div>
        </>
    )
}