'use client'
import Image from 'next/image'
import style from './login.module.css'
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify';


export default function NewUser({ positionsInfo_parameter, titlesInfo_parameter }) {
    const router = useRouter()
    const params = useSearchParams()
    const userId_parameter = params.get('id');
    const [viewPsw, setViewPsw] = useState(false)
    const [viewPsw2, setViewPsw2] = useState(false)
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        second_last_name: '',
        email: '',
        phone: '',
        has_ownership: '',
        position: '',
        title:'',
        password:'',
        confirm_password: '',
        is_remember: false,
    })
    const [isLoading, setIsLoading] = useState(false)
    const [positionsInfo, setPositionsInfo] = useState(positionsInfo_parameter);
    const [titlesInfo, setTitlesInfo] = useState(titlesInfo_parameter);


    const handleInputChange = (event) => {
        
        const { name, value, type, checked } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        const response = await fetch(`/api/save_newUser`, {
            method: "POST",
            body: JSON.stringify({userID: userId_parameter, formData: formData})
        })

        const data = await response.json()

        if (response.ok) {
            setIsLoading(false)
            toast.success("Usuario creado exitosamente...!")
            router.push('/mipp/dashboard')
        }else{
            console.log(data)
            setIsLoading(false)
            toast.error("No se pudo crear el usuario, verifique los datos ingresados")
        }
    }

    return(
        <div className={style.container}>
            <main className={style.loginBox}>
                <div className={style.header}>
                    <h1 className={style.headerH1}>Nuevo usuario</h1>
                    <p className={style.headerP}>Por favor, rellene los espacios de abajo</p>
                </div>

                <div className={style.form}>

                    <input
                        name='first_name'
                        type="text" 
                        className={style.formInput} 
                        placeholder='Primer Nombre' 
                        onChange={handleInputChange}
                        value={formData.first_name}
                    />

                    <input
                        name='last_name'
                        type="text" 
                        className={style.formInput} 
                        placeholder='Primer Apellido' 
                        onChange={handleInputChange}
                        value={formData.last_name}
                    />

                    <input
                        name='second_last_name'
                        type="text" 
                        className={style.formInput} 
                        placeholder='Segundo Apellido (opcional)' 
                        onChange={handleInputChange}
                        value={formData.second_last_name}
                    />

                    <input
                        name='email'
                        type="email" 
                        className={style.formInput} 
                        placeholder='Correo Electrónico' 
                        onChange={handleInputChange}
                        value={formData.email}
                    />

                    <input
                        name='phone'
                        type="text" 
                        className={style.formInput} 
                        placeholder='Número de Teléfono' 
                        onChange={handleInputChange}
                        value={formData.phone}
                    />

                    <div className={style.ownershipContainer}>

                        <div className={style.radioContainer}>
                            <label htmlFor="has_ownership">Interino </label>
                            <input
                                name='has_ownership'
                                type="radio" 
                                className={style.formRadio} 
                                onChange={() => setFormData(prev => ({ ...prev, has_ownership: false }))}
                            />
                        </div>

                        <div className={style.radioContainer}>
                            <label htmlFor="has_ownership">Propiedad </label>
                            <input
                                name='has_ownership'
                                type="radio" 
                                className={style.formRadio} 
                                onChange={() => setFormData(prev => ({ ...prev, has_ownership: false }))}
                            />
                        </div>

                    </div>


                    <select id="title" name="title" className={style.formSelect} value={formData.title} onChange={handleInputChange}>
                        <option value="">Seleccione un título</option>
                        {titlesInfo && titlesInfo.map((title) => (
                            
                            <option key={title.id} value={title.id}>{title.title}</option>
                        ))}
                    </select>

                    <select
                        name='position'
                        className={style.formSelect}
                        onChange={handleInputChange}
                        value={formData.position}
                        disabled={!formData.title}
                    >
                        <option value="" >Seleccione una posición</option>
                        {positionsInfo.map((position) => (
                            (position.position !== "ROOT" && position.title_id == formData.title) &&

                            <option key={position.id} value={position.id}>
                                {position.position}
                            </option>
                        ))}
                    </select>

                    <div className={style.passwordInput}>
                        <input 
                            type={viewPsw ? "text" : "password"} 
                            name='password'
                            className={style.formPsw} 
                            placeholder='Contraseña'
                            onChange={handleInputChange}
                            value={formData.password}
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

                    <div className={style.passwordInput}>
                        <input 
                            type={viewPsw2 ? "text" : "password"} 
                            name='confirm_password'
                            className={style.formPsw} 
                            placeholder='Confirmar Contraseña'
                            onChange={handleInputChange}
                            value={formData.confirm_password}
                        />

                        <Image 
                            src={ viewPsw2 ? "/eye-closed.svg" : "/eye-open.svg"} 
                            width={30} 
                            height={30} 
                            alt='Logo de MIPP+' 
                            className={style.eye}
                            onClick={() => setViewPsw2(!viewPsw2)}
                        />
                    </div>
                </div>


                <button type="button" className={style.loginButton} onClick={handleSubmit}>
                    <p className={style.buttonText}>{isLoading ? "Cargando..." : "Guardar Usuario"}</p>
                </button>
            </main>
            
            

        </div>
    )
}