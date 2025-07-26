'use client'
import Image from 'next/image'
import style from './login.module.css'
import { useState } from 'react'
import { useRouter } from 'next/navigation'


export default function Login(){
    const router = useRouter()
    const [loginData, setLoginData] = useState({
        id: '',
        password:'',
    })

    const handleLoginChange = (event) => {
        const {name, value} = event.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async () => {
        const response = await fetch(`/api/loginAuth`, {
            method: "POST",
            body: JSON.stringify({id: loginData.id, password: loginData.password})
        })

        const data = await response.json()

        if (response.ok) {
            router.push(data.redirectUrl)
        }else{
            //Hacer algo para cuando no hizo bien la contraseña
        }
    }



    return(
        <div className={style.container}>
            <main className={style.loginBox}>
                <Image src={"/logo-extended.svg"} width={30} height={30} alt='Logo de MIPP+' className={style.logo}/>
                <div className={style.header}>
                    <h1 className={style.headerH1}>¡Un gusto volver a verle</h1>
                    <p className={style.headerP}>Por favor, rellene los espacios de abajo</p>
                </div>

                <div className={style.form}>
                    <input
                        name='id'
                        type="text" 
                        className={style.formId} 
                        placeholder='Identificación' 
                        onChange={handleLoginChange}
                        value={loginData.username}
                    />
                    <input 
                        type="password" 
                        name='password'
                        className={style.formPsw} 
                        placeholder='Contraseña'
                        onChange={handleLoginChange}
                        value={loginData.password}
                    />
                </div>

                <div className={style.bottom}>
                    <div className={style.checkbox}>
                        <input type="checkbox" name="remember" id="remember" className={style.checkboxInput} />
                        <label htmlFor="remember" className={style.checkboxLabel}>Recuérdeme</label>
                    </div>

                    <p>¿Olvido su contraseña?</p>
                </div>

                <button type="button" className={style.loginButton} onClick={handleSubmit}>Iniciar Sesión</button>
            </main>
            <p className={style.footerText}>"Lo pequeño es algo más que un aso en el camino. Es un destino en sí mismo"</p>
            
        </div>
    )
}