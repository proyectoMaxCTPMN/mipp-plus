'use client'
import Image from 'next/image'
import style from './login.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';


export default function Login(){
    const router = useRouter()
    const [viewPsw, setViewPsw] = useState(false)
    const [loginData, setLoginData] = useState({
        id: '',
        password:'',
        is_remember: false,
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleLoginChange = (event) => {
        
        const { name, value, type, checked } = event.target;
        setLoginData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        const response = await fetch(`/api/loginAuth`, {
            method: "POST",
            body: JSON.stringify({id: loginData.id, password: loginData.password, is_remember: loginData.is_remember})
        })

        const data = await response.json()

        console.log(response)

        if (response.ok) {
            console.log(data)
            router.push(data.redirectUrl)
        }else{
            setIsLoading(false)
            toast.error("Usuario o contraseña incorrectos...")
        }
    }

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
        await handleSubmit()
        }
    }



    return(
        <div className={style.container} onKeyDown={async (e) => await handleKeyDown(e)}>
            
            <main className={style.loginBox}>
                <Image src={"/logo/logo-extended.svg"} width={30} height={30} alt='Logo de MIPP+' className={style.logo}/>
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
                        autoComplete='username'
                    />

                    <div className={style.passwordInput}>
                        <input 
                            type={viewPsw ? "text" : "password"} 
                            name='password'
                            className={style.formPsw} 
                            placeholder='Contraseña'
                            onChange={handleLoginChange}
                            value={loginData.password}
                            autoComplete='current-password'
                        />

                        <Image 
                            src={ viewPsw ? "/eye-closed.svg" : "/eye-open.svg"} 
                            width={30} 
                            height={30} 
                            alt='Logo de MIPP+' 
                            className={style.eye}
                            onClick={() => setViewPsw(!viewPsw)}
                        />
                    </div>

                </div>

                <div className={style.bottom}>
                    <div className={style.checkbox}>
                        <input type="checkbox" name="is_remember" id="is_remember" className={style.checkboxInput} onChange={handleLoginChange} value={loginData.is_remember}/>
                        <label htmlFor="remember" className={style.checkboxLabel}>Recuérdeme</label>
                    </div>

                    <p>¿Olvidó su contraseña?</p>
                </div>

                <button type="button" className={style.loginButton} onClick={handleSubmit}>
                    {isLoading ? "Cargando..." : "Iniciar sesión"}
                </button>
            </main>
            <p className={style.footerText}>"Lo pequeño es algo más que un paso en el camino. Es un destino en sí mismo"</p>
            

        </div>
    )
}