'use client'
import Image from 'next/image';
import style from './soliHistory.module.css'
import { useState } from 'react';
import Link from 'next/link';
import { formatDate } from '@/app/utils/formatDate';



export default function SolicitudeHistory({Reports_parameter}){
    const [data, setData] = useState(Reports_parameter)
    const [search, setSearch] = useState('')

    const handleSearch = (e) => {
        const {value} = e.target;
        setSearch(value)
    }


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
                    <p>Detalle</p>
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

                                    doc.report_detail.toLowerCase().startsWith(search.toLowerCase())
                                    &&(
                                        <div className={style.registerContainer} key={doc.id}>

                                            <div className={style.date}>
                                                <p className={style.dateText}>
                                                    {new Date(doc.report_date).toLocaleDateString('es-CR')}
                                                </p>
                                            </div>

                                            <div className={style.reason}>
                                                <div className={style.square} />
                                                <p className={style.reasonText}>{doc.report_detail}</p>
                                            </div>

                                            <div className={style.state}>
                                                <p className={style.pendingText}>{doc.is_managed ? 'Manejado' : 'Sin Manejar'}</p>
                                            </div>

                                            <div className={style.timeLeft}>
                                                <p>{doc.is_revised ? 'Revisado' : 'Por revisar'}</p>
                                            </div>
                                            
                                            <div className={style.goTo}>
                                                <Link href={`/mipp/manage/infra/${doc.id}`}>
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
                                (data.filter((doc) => doc.report_detail.toLowerCase().startsWith(search.toLowerCase())).length == 0) &&
                               
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