import style from './page.module.css'
import Image from 'next/image'

export default function Probando(){
    return(
        <div className={style.body}>

            {/* Popup de aviso */}
            <div className={style.contenedor_aviso}>
                <div className={style.minih_aviso}>
                    <h1>Aviso</h1>
                </div>
                <div className={style.aviso}>
                    <p>¿Está seguro de cerrar sesión?</p>
                    <div className={style.options_button}>
                        <button>Cancelar</button>
                        <button>Confirmar</button>
                    </div>
                </div>
            </div>
            

            {/* Popup de enviado */}
            <div className={style.contenedor_enviado}>
                <div className={style.minih_enviado}>
                    <Image src={"/menuIcons/X.svg"} width={30} height={30} alt='' className={style.X}/>
                </div>
                <div className={style.enviado}>
                    <Image src={"/menuIcons/happy_face.svg"} width={50} height={50} alt='' className={style.happy_face}/>
                    <p className={style.enviado}>¡Enviado con éxito!</p>
                    <div className={style.solicitude_button}>
                        <button>Ver solicitud</button>
                    </div>
                </div>
            </div>
            

            {/* Popup de personal */}
            <div className={style.contenedor_enviado}>
                <div className={style.minih_personal}>
                    <Image src={"/menuIcons/X.svg"} width={30} height={30} alt='' className={style.X}/>
                </div>
                <div className={style.personal}>
                    <Image src={"/menuIcons/info_icon.svg"} width={45} height={45} alt='' className={style.info_icon}/>
                    <p className={style.personal}>Los motivos personales se deben consultar con doña Laura personalmente.</p>
                    <div className={style.ok_button}>
                        <button>Aceptar</button>
                    </div>
                </div>
            </div>
            
            {/* Popup de pregunta */}

        </div>

        
    )
}