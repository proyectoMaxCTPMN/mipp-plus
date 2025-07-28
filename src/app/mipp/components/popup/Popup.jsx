'use client'

import { useState } from 'react'
import style from './popup.module.css'
import Image from 'next/image'




export function PopUpContainer(){
    const [open, setOpen] = useState(false)


    return (
        <>
        {open && (
            <div className={style.container}>
                <div className={style.popup}>
                    <div className={style.popupHeader}>
                        <Image src={"/close.svg"} width={30} height={30} alt='Logo de MIPP+' className={style.closeImg}/>
                    </div>      
                    <div className={style.popupContent}>

                    </div>      
                </div>
            </div>  
        )}
        
        </>
    )

}
