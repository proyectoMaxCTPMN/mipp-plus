import Navbar from '../components/nav/Navbar'
import style from './account.module.css'
export default function Dashboard(){
    return(
        <>
        <div className={style.cardcontainer}>
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
                    <input type="text" id="name" name="name" placeholder="Ingrese su cédula"/>
                </div>
                <div className={style.emailcontainer}>
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input type="email" id="email" name="email" placeholder="Ingrese su correo electrónico" />
                </div>
                <div className={style.titlecontainer}>
                    <label htmlFor="title">Título:</label>
                    <select id="title" name="title" className={style.selectestilo} placeholder="Seleccione un título">
                        <option value="">Seleccione una opción</option>
                        <option value="opcion1">Título 1</option>
                        <option value="opcion2">Título 2</option>
                        <option value="opcion2">Administrativo</option>
                    </select>
                </div>
                <div className={style.positioncontainer}>
                    <label htmlFor="position">Cargo:</label>
                    <select name="position" id="position">
                        <option value="">Seleccione una opción</option>
                        <option value="opcion1">Cargo 1</option>
                        <option value="opcion2">Cargo 2</option>
                        <option value="opcion3">Cargo 3</option>
                    </select>
                </div>
            </form>
        </div>
        </>
    )
}