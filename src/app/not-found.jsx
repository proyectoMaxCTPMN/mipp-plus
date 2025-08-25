'use client'
import Link from 'next/link';
import style from './not-found.module.css'
import Image from 'next/image';
import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';



export default function NotFound() {
    useEffect(() => {
        console.error('No se pudo encontrar la página')
        Sentry.captureMessage("No se pudo encontrar la página", "error");

    }, [])
    return (
    <div className={style.container}>
        <Image src={"/not_found.webp"} width={200} height={200} alt='not-found img' className={style.notFoundImg}/>
        <h2 className={style.notFoundH1}>No se encontró la pagina</h2>
        <Link href="/" className={style.notFoundLink}>Volver al inicio</Link>
    </div>
    );
}