'use client'
import style from './dashboard.module.css'
import Image from 'next/image'


export default function RecentHistory(){
    return(
        <div className={style.cardsContainer}>
            <div className={style.soliCard}>
                <div className={style.soliContent}>

                </div>

                <div className={style.soliFooter}>
                    <p className={style.footerText}>Nuevo Permiso de Salida</p>
                    <Image src={"/plus.svg"} width={30} height={30} alt='plus' className={style.plus}/>
                </div>
            </div>

            <div className={style.justiCard}>
                <div className={style.justiContent}>

                </div>
                
                <div className={style.justiFooter}>
                    <p className={style.footerText}>Nueva Justificación</p>
                    <Image src={"/plus.svg"} width={30} height={30} alt='plus' className={style.plus}/>
                </div>
            </div>

            <div className={style.reportCard}>
                <div className={style.reportContent}>

                </div>
                
                <div className={style.reportFooter}>
                    <p className={style.footerText}>Nuevo Reporte</p>
                    <Image src={"/plus.svg"} width={30} height={30} alt='plus' className={style.plus}/>
                </div>
            </div>
        </div>

    )
}