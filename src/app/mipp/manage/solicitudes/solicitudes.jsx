'use client'
import Image from 'next/image';
import style from './solicitudes.module.css'
import {useState } from 'react';
import { formatDate } from '@/app/utils/formatDate';
import { useRouter } from 'next/navigation';
import { Chip } from '@heroui/react';

export default function SolicitudesHistory({absencesf_parameter, justificationsf_parameter}){
    const [data, setData] = useState(absencesf_parameter)
    const [data2, setData2] = useState(justificationsf_parameter)
    const [search, setSearch] = useState('')
    const [isSolicitudes, setIsSolicitudes] = useState(true);
    const reasons = ["", "Cita médica", "Convocatoria Asamblea", "Asuntos Personales"]

    const router = useRouter()

    const handleSearch = (e) => {
        const {value} = e.target;
        setSearch(value)
    }

    


    return (
        <>
            <div className={style.switchcontainer}>
                <span className={isSolicitudes ? style.activeLabel : style.inactiveLabel}>Solicitudes</span>
                <div className={style.switch} onClick={() => setIsSolicitudes(!isSolicitudes)}>
                    <span className={style.toggleCircle} style={{transform: isSolicitudes ? 'translateX(0)' : 'translateX(28px)'}}></span>
                </div>
                <span className={!isSolicitudes ? style.activeLabel : style.inactiveLabel}>Justificaciones</span>
            </div>

            {isSolicitudes ?
                <>
                    <div className={style.searchContainer}>
                        <label htmlFor="search">Buscar</label>
                        <input type="text" name="search" id="search" className={style.searchInput} placeholder='Buscar por nombre de funcionario' value={search} onChange={handleSearch}/>
                    </div>

                    <div className={style.headerContainer}>

                        <div className={style.dateHeader}>
                            <p>Fecha</p>
                            <Image src={"/order_by_icon.svg"} width={10} height={10} alt='' className={style.orderIcon} />
                        </div>

                        <div className={style.nameHeader}>
                            <p>Funcionario</p>
                            <Image src={"/order_by_icon.svg"} width={10} height={10} alt='' className={style.orderIcon} />
                        </div>

                        <div className={style.reasonHeader}>
                            <p>Motivo</p>
                            <Image src={"/order_by_icon.svg"} width={10} height={10} alt='' className={style.orderIcon} />
                        </div>

                        <div className={style.stateHeader}>
                            <p>Estado</p>
                            <Image src={"/order_by_icon.svg"} width={10} height={10} alt='' className={style.orderIcon} />
                        </div>


                        


                    </div>
                    
                    <div className={style.main}>
                        {(data?.length > 0)?
                            <>
                                {
                                    data.map((doc) => 
                                        doc.user_id.first_name.toLowerCase().startsWith(search.toLowerCase())
                                            &&(
                                                <div className={style.registerContainer} key={doc.id} onClick={() => router.push(`/mipp/manage/absence/${doc.id}`)} style={{cursor: 'pointer'}}>

                                                    <div className={style.date}>
                                                        <p className={style.dateText}>
                                                            {formatDate(doc.absence_date)}
                                                        </p>
                                                    </div>

                                                    <div className={style.name}>
                                                        <p>{doc.user_id.first_name}  {doc.user_id.last_name} {doc.user_id.second_last_name}</p>
                                                    </div>

                                                    <div className={style.reason}>
                                                        <div className={style.square} />
                                                        <p className={style.reasonText}>{reasons[doc.reason]}</p>
                                                    </div>

                                                    <div className={style.state}>
                                                        <Chip className={`${style.pendingText}`} color={doc.is_pending ? doc.is_revised ? 'secondary' :'warning' : 'success' }>{!doc.is_pending ? "Gestionado": doc.is_revised ? "Visto":"Pendiente"}</Chip>
                                                    </div>

                                                </div>
                                                ) 
                                            )
                                        
                                    }                            

                                    {
                                        (data.filter((doc) => doc.user_id.first_name.toLowerCase().startsWith(search.toLowerCase())).length == 0) &&
                                            <div className={style.notRegisterContainer}>
                                                <h3>No se encontraron registros con "{search}"</h3>
                                                <Image src={"/not_found.webp"} width={100} height={100} alt='not found image' />
                                            </div>
                                        
                                    }
                                </>
                        :(
                            <div className={style.notRegisterContainer}>
                                <h3>Nada que mostrar por aquí</h3>
                                <Image src={"/not_found.webp"} width={100} height={100} alt='not found image' />
                            </div>
                        )}
                    </div>
                </>
            :(
                <>
                    <div className={style.searchContainer}>
                        <label htmlFor="search">Buscar</label>
                        <input type="text" name="search" id="search" className={style.searchInput} placeholder='Buscar por nombre de funcionario' value={search} onChange={handleSearch}/>
                    </div>

                    <div className={style.headerContainer2}>
                        <div className={style.dateHeader_justi}>
                            <p>Ausente</p>
                            <Image src={"/order_by_icon.svg"} width={10} height={10} alt='' className={style.orderIcon} />
                        </div>

                        <div className={style.dateHeader2_justi}>
                            <p>Justifica</p>
                            <Image src={"/order_by_icon.svg"} width={10} height={10} alt='' className={style.orderIcon} />
                        </div>

                        <div className={style.reasonHeader_justi}>
                            <p>Motivo</p>
                            <Image src={"/order_by_icon.svg"} width={10} height={10} alt='' className={style.orderIcon} />
                        </div>

                        <div className={style.nameHeader_justi}>
                            <p>Funcionario</p>
                            <Image src={"/order_by_icon.svg"} width={10} height={10} alt='' className={style.orderIcon} />
                        </div>

                        <div className={style.stateHeader_justi}>
                            <p>Estado</p>
                            <Image src={"/order_by_icon.svg"} width={10} height={10} alt='' className={style.orderIcon} />
                        </div>
                        


                    </div>

                            <div className={style.main2}>
                            {(data2?.length > 0)?
                            <>
                                {
                                    data2.map((doc) => 
                                        doc.user_id.first_name.toLowerCase().startsWith(search.toLowerCase())
                                            &&(
                                                <div className={style.registerContainer2} key={doc.id} onClick={() => router.push(`/mipp/manage/justi/${doc.id}`)} style={{cursor: 'pointer'}}>
                                                    <div className={style.date_justi}>
                                                        <p className={style.dateText}>
                                                            {formatDate(doc.absence_date)}
                                                        </p>
                                                    </div>

                                                    <div className={style.date2_justi}>
                                                        <p className={style.dateText}>
                                                            {formatDate(doc.justification_date)}
                                                        </p>
                                                    </div>

                                                    <div className={style.reason_justi}>
                                                        <div className={style.square} />
                                                        <p className={style.reasonText}>{reasons[doc.justification_reason]}</p>
                                                    </div>

                                                    <div className={style.name_justi}>
                                                        <p>{doc.user_id.first_name}  {doc.user_id.last_name} {doc.user_id.second_last_name}</p>
                                                    </div>

                                                    <div className={style.state_justi}>
                                                        <Chip className={`${style.pendingText}`} color={doc.justification_response_state != 0 ? doc.is_revised ? 'secondary' :'success' : 'warning' }>
                                                            {doc.justification_response_state != 0 ? "Gestionado": doc.is_revised ? "Visto":"Pendiente"}
                                                            </Chip>
                                                    </div>

                                                </div>
                                                ) 
                                            )
                                        
                                    }                            

                                    {
                                        (data.filter((doc) => doc.user_id.first_name.toLowerCase().startsWith(search.toLowerCase())).length == 0) &&
                                            <div className={style.notRegisterContainer}>
                                                <h3>No se encontraron registros con "{search}"</h3>
                                                <Image src={"/not_found.webp"} width={100} height={100} alt='not found image' />
                                            </div>
                                        
                                    }
                                </>
                        :(
                            <div className={style.notRegisterContainer}>
                                <h3>Nada que mostrar por aquí</h3>
                                <Image src={"/not_found.webp"} width={100} height={100} alt='not found image' />
                            </div>
                        )}
                        </div>
                </>
            )}
        </>
    )
}