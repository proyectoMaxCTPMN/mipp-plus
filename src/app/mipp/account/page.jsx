'use client'
import Navbar from '../components/nav/Navbar'
import style from './account.module.css'
import {useState } from 'react';

const positionOptions = {
    opcion1: [
        { value: 'Secretaria', label: 'Secretaría' },
        { value: 'Guarda', label: 'Guarda de seguridad' },
        { value: 'Conserje', label: 'Conserje' },
        { value: 'Cocinera', label: 'Cocinero/Cocinera'},
        { value: 'Mantenimiento', label: 'Personal de mantenimiento' },
        { value: 'Otros', label: 'Otro' }
    ],
    opcion2: [
        { value: 'Academico', label: 'Docente Académico' },
        { value: 'Técnico', label: 'Docente Técnico' }
    ],
    opcion3: [
        { value: 'cargoD', label: 'e' }
    ],
    default: [
        { value: '', label: 'Seleccione una opción' }
    ]
};

export default function Dashboard(){
    const [selectedTitle, setSelectedTitle] = useState(''); {/*Detectar titulo elegido en el formulario*/}
    const [modalidad, setModalidad] = useState(''); {/*Completado automatico de modalidad de pago*/}
    const [showPasswordForm, setShowPasswordForm] = useState(true); {/*Cambiar ventana*/}
    const [showCurrent, setShowCurrent] = useState(false); {/*Mostrar texto o no en la contrase;a*/}
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleTitleChange = (e) => {
        const value = e.target.value;
        setSelectedTitle(value);

        switch(value){
            case "opcion1":
                setModalidad("Horas");
                break;
            case "opcion2":
                setModalidad("Lecciones");
                break;
            default:
                setModalidad("");
        }
    };
    
    const cargos = positionOptions[selectedTitle] || positionOptions.default;
    return(
        <>
        <div className={style.cardcontainer}>
            
            {!showPasswordForm ? (
                <>
                <h1>Mi perfil</h1>
                <form>
                <div className={style.nameformcontainer}>
                    <div className={style.namecontainer}>
                        <label htmlFor="name">Nombre:</label>
                        <input type="text" id="name" name="name" placeholder="Ingrese su nombre" />
                    </div>
                    <div className={style.namecontainer}>
                        <label htmlFor="firstlastname">Primer Apellido:</label>
                        <input type="text" id="firstlastname" name="firstlastname" placeholder="Ingrese su primer apellido" />
                    </div>
                    <div className={style.namecontainer}>
                        <label htmlFor="secondlastname">Segundo Apellido:</label>
                        <input type="text" id="secondlastname" name="secondlastname" placeholder="Ingrese su segundo apellido" />
                    </div>
                </div>
                <div className={style.idcontainer}>
                    <label htmlFor="id">Cédula:</label>
                    <input type="text" id="id" name="id" placeholder="Ingrese su cédula"/>
                </div>
                <div className={style.emailcontainer}>
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input type="email" id="email" name="email" placeholder="Ingrese su correo electrónico" />
                </div>
                <div className={style.titlecontainer}>
                    <label htmlFor="title">Título:</label>
                    <select id="title" name="title" className={style.selectestilo} value={selectedTitle} onChange={handleTitleChange}>
                        <option value="">Seleccione una opción</option>
                        <option value="opcion1">Título 1</option>
                        <option value="opcion2">Título 2 - Docente</option>
                        <option value="opcion3">Título 2 - Administrativo</option>
                    </select>
                </div>
                <div className={style.positioncontainer}>
                    <label htmlFor="position">Cargo:</label>
                    <select name="position" id="position">
                        <option value="">Seleccione una opción</option>
                        {cargos.map((cargo) => (
                            <option key={cargo.value} value ={cargo.value}>{cargo.label}</option>
                        ))}
                    </select>
                </div>
                {selectedTitle === "opcion2" &&(
                    <div className={style.conditioncontainer}>
                    <label>Condición:</label>
                    <div className={style.conditioninputscontainer}>
                        <div className={style.conditioninput}>
                            <input type="radio" name="condicion" id="Propietario" value="Propietario"/>
                            <label htmlFor="Propietario">Propietario</label>
                        </div>
                        <div className={style.conditioninput}>
                            <input type="radio" name="condicion" id="Interino" value="Interino"/>
                            <label htmlFor="Interino">Interino</label>
                        </div>
                    </div>
                </div>
                )}
                <div className={style.methodcontainer}>
                    <label>Trabaja por:</label>
                    <div className={style.methodinputscontainer}>
                        <div className={style.methodinput}>
                            <input type="radio" name="modalidad" id="Lecciones" value="Lecciones" checked={modalidad === "Lecciones"} onChange={() => setModalidad("Lecciones")}/>
                            <label htmlFor="Lecciones">Lecciones</label>
                        </div>
                        <div className={style.methodinput}>
                            <input type="radio" name="modalidad" id="Horas" value="Horas" checked={modalidad === "Horas"} onChange={() => setModalidad("Horas")}/>
                            <label htmlFor="Horas">Horas</label>
                        </div>
                    </div>
                </div>
                <div className={style.buttonscontainer}>
                    <button type = "button" onClick={() => setShowPasswordForm(true)}>Cambiar Contraseña</button>
                    <button type="submit">Guardar cambios</button>
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
                            <input id='currentPassword' name='currentPassword' type={showCurrent ? "text" : "password"}/> {/* "v": estado booleano actual */}
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
                            <input id='confirmPassword' name='confirmPassword' type={showConfirm ? "text" : "password"}/> {/* "v": estado booleano actual */}
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
        </>
    )
}