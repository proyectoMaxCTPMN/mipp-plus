'use client'

import Image from "next/image"
import style from './formTemplate.module.css'
import { Tooltip } from "@heroui/react"


export default function FormTemplate({title = null, fullName_parameter, children, onMagnifyClick = null, showName = true, onCloseClick, class_name = '', onDownloadClick = null}){
    return(
        <div className={class_name != '' ? class_name : style.form_container}>
            {
                title && <p className={style.titleofformulary}>{title}</p>
            }
            
            

            <div className={style.formulary_upperinformationcontainer}>
                {
                    showName && <div className={style.cardname}>{fullName_parameter}</div>
                }

                <div className={style.buttonsContainer}>
                    {
                        onMagnifyClick && 
                        <Tooltip content="Ver Detalles" showArrow={true}>
                                <div className={style.previewcard} onClick={onMagnifyClick}><Image src={"/Search.svg"} width={20} height={20} alt='magnifying-glass-icon' className={style.searchicon}></Image></div>
                        </Tooltip>
                    }

                    {
                        onDownloadClick && 
                        <Tooltip content="Descargar Información" showArrow={true}>
                                <div className={style.downloadBtn} onClick={onDownloadClick}><Image src={"/download.svg"} width={20} height={20} alt='Download' className={style.download_icon}/></div>
                        </Tooltip>
                        
                    }



                </div>

                {
                    onCloseClick && 
                    <Tooltip content="Cerrar Ventana" showArrow={true}>
                        <div className={style.popUpExit} onClick={onCloseClick}><Image src={"/close.svg"} width={20} height={20} alt='Close_icon' className={style.Exit_icon}/></div>
                    </Tooltip>
                }

            </div>

            <div className={style.cardcontainer}>
                <Image src={"/Card-header.svg"} width={20} height={20} alt='Form-header' className={style.cardheaderimg}/>
                {children}
            </div>
        </div>
    )
}