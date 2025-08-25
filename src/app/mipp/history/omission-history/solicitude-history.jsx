'use client'
import Image from 'next/image';
import style from './soliHistory.module.css'
import { useState } from 'react';
import Link from 'next/link';
import { formatDate } from '@/app/utils/formatDate';



export default function SolicitudeHistory({Omissions_parameter}){
    const [data, setData] = useState(Omissions_parameter)
    const [search, setSearch] = useState('')

    const handleSearch = (e) => {
        const {value} = e.target;
        setSearch(value)
    }

    const typeofomission = ["","Entrada","Salida","Todo el día","Salida Anticipada"]


    return (
        <>
            <div className={style.searchContainer}>
                <label htmlFor="search">Buscar</label>
                <input type="text" name="search" id="search" className={style.searchInput} placeholder='Buscar por motivo' value={search} onChange={handleSearch}/>
            </div>

            <div className={style.headerContainer}>

                <div className={style.dateHeader}>
                    <p>Fecha</p>
                    <Image src={"/order_by_icon.svg"} width={10} height={10} alt='' className={style.orderIcon} />
                </div>

                <div className={style.reasonHeader}>
                    <p>Tipo</p>
                    <Image src={"/order_by_icon.svg"} width={10} height={10} alt='' className={style.orderIcon} />
                </div>

                
                <div className={style.stateHeader}>
                    <p>Estado</p>
                    <Image src={"/order_by_icon.svg"} width={10} height={10} alt='' className={style.orderIcon} />
                </div>

                <div className={style.timeLeftHeader}>
                    <p>Revisado</p>
                    <Image src={"/order_by_icon.svg"} width={10} height={10} alt='' className={style.orderIcon} />
                </div>

                <div className={style.goToHeader}>
                    <p>Ir a</p>
                </div>
            </div>

            <div className={style.main}>
                {
                    (data?.length > 0)
                    ?
                        <>
                            {
                                data.map((doc) => 

                                    typeofomission[doc.omission_type].toLowerCase().startsWith(search.toLowerCase())
                                    &&(
                                        <div className={style.registerContainer} key={doc.id}>

                                            <div className={style.date}>
                                                <p className={style.dateText}>
                                                    {formatDate(doc.omission_date)}
                                                </p>
                                            </div>

                                            <div className={style.reason}>
                                                <div className={style.square} />
                                                <p className={style.reasonText}>{typeofomission[doc.omission_type]}</p>
                                            </div>

                                            <div className={style.state}>
                                                <p className={style.pendingText}>{doc.omission_state}</p>
                                            </div>

                                            <div className={style.timeLeft}>
                                                <p>{doc.is_revised ? 'Revisado' : 'Por revisar'}</p>
                                            </div>
                                            
                                            <div className={style.goTo}>
                                                <Link href={`/mipp/history/omission-detail/${doc.id}`}>
                                                <div className={style.infoContainer}>
                                                    <Image src={"/goToInfo.svg"} width={20} height={20} alt='go to icon' />
                                                    <p className={style.goToInfoText}>Info</p>
                                                </div>
                                                </Link>
                                            </div>

                                        </div>
                                        ) 
                                    )
                                
                            }                            

                            {
                                (data.filter((doc) => typeofomission[doc.omission_type].toLowerCase().startsWith(search.toLowerCase())).length == 0) &&
                               
                                    <div className={style.notRegisterContainer}>
                                        <h3>No se encontraron registros con "{search}"</h3>
                                        <Image src={"/not_found.webp"} width={100} height={100} alt='not found image' />
                                    </div>
                                
                            }
                        </>
                    :
                    <div className={style.notRegisterContainer}>
                        <h3>Nada que mostrar por aquí</h3>
                        <Image src={"/not_found.webp"} width={100} height={100} alt='not found image' />
                    </div>
                }
            </div>
        </>
    )
}