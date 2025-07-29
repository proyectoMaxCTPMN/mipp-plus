import Image from 'next/image'
import style from './unauthorized.module.css'

export default async function Page(){


    return (
        <div style={{width: "100dvw", height:"100dvh", display:"flex", placeContent:"center", placeItems:"center", flexDirection: "column"}}>
            <Image src={"/unauthorized.gif"} style={{width: "20dvw", height: "20dvh", objectFit: "contain"}} width={30} height={30} alt='Logo de MIPP+'/>
            <h1 className={style.text}>No puedes acceder a este contenido</h1>
        </div>
    )
}