import Image from 'next/image'
import style from './login.module.css'

export default function Login(){

    return(
        <div className={style.container}>
            <main className={style.loginBox}>
                <Image src={"/logo-extended.svg"} width={30} height={30} alt='Logo de MIPP+' className={style.logo}/>
                <div className={style.header}>
                    <h1 className={style.headerH1}>¡Un gusto volver a verle</h1>
                    <p className={style.headerP}>Por favor, rellene los espacios de abajo</p>
                </div>

                <div className={style.form}>
                    <input type="text" className={style.formId} placeholder='Identificación' />
                    <input type="password" className={style.formPsw} placeholder='Contraseña'/>
                </div>

                <div className={style.bottom}>
                    <div className={style.checkbox}>
                        <input type="checkbox" name="remember" id="remember" className={style.checkboxInput} />
                        <label htmlFor="remember" className={style.checkboxLabel}>Recuérdeme</label>
                    </div>

                    <p>¿Olvido su contraseña?</p>
                </div>

                <button type="button" className={style.loginButton}>Iniciar Sesión</button>
            </main>
            <p className={style.footerText}>"Lo pequeño es algo más que un aso en el camino. Es un destino en sí mismo"</p>
            
        </div>
    )
}