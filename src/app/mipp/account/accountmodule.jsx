'use client'
import { toast } from 'react-toastify';
import style from './account.module.css'
import {useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Card, CardBody,

} from "@heroui/card";


export default function Accountpage({userId_parameter, allInfo_parameter, titles_parameter, positions_parameter}){


    return(
        <div className={style.container}>
            <Card className={style.headerContainer}>
                <CardBody>
                    <p>hola</p>
                </CardBody>
            </Card>

            <Card className={style.bodyContainer}>
                
            </Card>

        </div>
    )
}

/*

export default function Accountpage({userId_parameter, allInfo_parameter, titles_parameter, positions_parameter}){
    const router = useRouter()
    const [selectedTitle, setSelectedTitle] = useState(allInfo_parameter.title_id); 
    const [showPasswordForm, setShowPasswordForm] = useState(false); 
    const [showCurrent, setShowCurrent] = useState(false); 
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [formData, setFormData] = useState(allInfo_parameter);

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    const ChangeOwnership = (value) => {
        setFormData(prev => ({
            ...prev,
            has_ownership: value
        }));
    }

    const handleTitleChange = (e) => {
        const value = e.target.value;
        setSelectedTitle(value);
        handleInputChange(e)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/updateAccount`, {
            method: "POST",
            body: JSON.stringify({userID: userId_parameter, formData: formData})
        })

        const data = await response.json()

        if (response.ok) {
            toast.success("Datos actualizados exitosamente...!")
            router.refresh()
        }else{
            toast.error("Hubo un error al actualizar los datos")
            console.error(data)
            
        }
    }

    return(
        <div className={style.body}>
        <div className={style.cardcontainer}>
            
            {!showPasswordForm ? (
                <>
                <h1>Mi perfil</h1>
                <form className={style.accountform} onSubmit={handleSubmit}>
                <div className={style.nameformcontainer}>
                    <div className={style.namecontainer}>
                        <label htmlFor="name">Nombre:</label>
                        <input type="text" id="name" name="first_name" placeholder="Ingrese su nombre" value={formData.first_name} onChange={handleInputChange}/>
                    </div>
                    <div className={style.namecontainer}>
                        <label htmlFor="firstlastname">Primer Apellido:</label>
                        <input type="text" id="firstlastname" name="last_name" placeholder="Ingrese su primer apellido" value={formData.last_name} onChange={handleInputChange} />
                    </div>
                    <div className={style.namecontainer}>
                        <label htmlFor="secondlastname">Segundo Apellido:</label>
                        <input type="text" id="secondlastname" name="second_last_name" placeholder="Ingrese su segundo apellido" value={formData.second_last_name} onChange={handleInputChange} />
                    </div>
                </div>
                <div className={style.idcontainer}>
                    <label htmlFor="id">Cédula:</label>
                    <input type="text" id="id" name="id" placeholder="Ingrese su cédula" defaultValue={userId_parameter} disabled/>
                </div>
                <div className={style.emailcontainer}>
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input type="email" id="email" name="email" placeholder="Ingrese su correo electrónico" value={formData.email} onChange={handleInputChange}/>
                </div>
                <div className={style.titlecontainer}>
                    <label htmlFor="title">Título:</label>
                    <select id="title" name="title_id" className={style.selectestilo} value={selectedTitle} onChange={handleTitleChange}>
                        <option value="">Seleccione una opción</option>
                        {titles_parameter && titles_parameter.map((title) => (
                            
                            <option key={title.id} value={title.id}>{title.title}</option>
                        ))}
                    </select>
                </div>
                <div className={style.positioncontainer}>
                    <label htmlFor="position">Cargo:</label>
                    <select name="position_id" id="position" value={formData.position_id} onChange={handleInputChange} disabled={!selectedTitle}>
                        <option value="">Seleccione una opción</option>

                        {positions_parameter && positions_parameter.map((position) => (
                            (position.id != 1 && position.title_id == selectedTitle) && (
                                <option key={position.id} value ={position.id}>{position.position}</option>
                            ) 
                        ))}

                    </select>
                </div>
                {selectedTitle == 2 &&(
                    <div className={style.conditioncontainer}>
                    <label>Condición:</label>
                    <div className={style.conditioninputscontainer}>
                        <div className={style.conditioninput}>
                            <input type="radio" name="has_ownership" id="Propietario" onChange={()=> ChangeOwnership(true)} defaultChecked={allInfo_parameter.has_ownership == true}/>
                            <label htmlFor="Propietario">Propietario</label>
                        </div>
                        <div className={style.conditioninput}>
                            <input type="radio" name="has_ownership" id="Interino" onChange={()=> ChangeOwnership(false)} defaultChecked={allInfo_parameter.has_ownership == false}/>
                            <label htmlFor="Interino">Interino</label>
                        </div>
                    </div>
                </div>
                )}
                <div className={style.methodcontainer}>
                    <label>Actualmente trabaja por:<span>{allInfo_parameter.paid_in_lessons ? 'Lecciones': 'Horas'}</span></label>
                </div>
                <div className={style.buttonscontainer}>
                    <button type = "button" onClick={() => setShowPasswordForm(true)}>Cambiar Contraseña</button>
                    <button type="submit" >Guardar cambios</button>
                </div>
            </form>
            </>
            ):(
                <>
                <button type='button' onClick={() => setShowPasswordForm(false)} className={style.changepasswordbutton}>
                    <img src="/arrow-go-back-icon-original.svg" alt="Icono Volver"/>
                </button>
                <h1>Mi perfil</h1>
                <h2 className={style.changepasswordtitle}>Cambio de Contraseña</h2>
                <form>
                    <div className={style.currentpasscontainer}>
                        <label htmlFor='currentPassword'>Contraseña Actual</label>
                        <div className={style.passwordinputcontainer}>
                            <input id='currentPassword' name='currentPassword' type={showCurrent ? "text" : "password"}/>
                            <span className={style.passwordicon} style={{cursor: "pointer"}} onClick={() => setShowCurrent(v => !v)}> 
                                <img src={showCurrent ? "/eye-icon-original.svg" : "/eye-off-icon-original.svg"} alt={showCurrent ? "Ocultar" : "Mostrar"}/>
                            </span>
                        </div>
                    </div>
                    <div className={style.newpasscontainer}>
                        <label htmlFor='newPassword'>Nueva Contraseña</label>
                        <div className={style.passwordinputcontainer}>
                            <input id='newPassword' name='newPassword' type={showNew ? "text" : "password"}/>
                            <span className={style.passwordicon} style={{cursor: "pointer"}} onClick={() => setShowNew(v => !v)}>
                                <img src={showNew ? "/eye-icon-original.svg" : "/eye-off-icon-original.svg"} alt={showNew ? "Ocultar" : "Mostrar"} />
                            </span>
                        </div>
                        <div className={style.newpasstext}>
                            <p>La contraseña debe contener:</p>
                            <ul className={style.passrules}>
                                <li>Mínimo 10 caracteres</li>
                                <li>Al menos una letra mayúscula (A-Z)</li>
                                <li>Al menos una letra minúscula (a-z)</li>
                                <li>Debe incluir al menos un número (0-9)</li>
                                <li>Al menos un carácter especial: !@#$%^&*()-_=+</li>
                            </ul>
                        </div>
                    </div>
                    <div className={style.confirmpasscontainer}>
                        <label htmlFor='confirmPassword'>Confirmar Contraseña</label>
                        <div className={style.passwordinputcontainer}>
                            <input id='confirmPassword' name='confirmPassword' type={showConfirm ? "text" : "password"}/>
                            <span className={style.passwordicon} style={{cursor: "pointer"}} onClick={() => setShowConfirm(v => !v)}> 
                                <img src={showConfirm ? "/eye-icon-original.svg" : "/eye-off-icon-original.svg"} alt={showConfirm ? "Ocultar" : "Mostrar"}/>
                            </span>
                        </div>
                    </div>
                    <button type="submit" className={style.submitpass}>Guardar Cambios</button>
                </form>
                </>
            )}
        </div>
        </div>
    )
}

*/