'use client'
import { toast } from 'react-toastify';
import style from './account.module.css'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Accountpage(){
    const [id, setId] = useState("");
    const router = useRouter()
    const [loading, setLoading] = useState(false);

    const handleId = (event) => {
        const { value} = event.target;
        setId(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        const response = await fetch(`/api/save_account`, {
            method: "POST",
            body: JSON.stringify({userID: id})
        })

        const data = await response.json()

        if (response.ok) {
            toast.success("Usuario Agregado Exitosamente...!")
            setLoading(false);
            router.refresh()
        }else{
            toast.error("Hubo un error al Ingresar el usuario")
            setLoading(false);
            console.error(data)
            
        }
    }

    return(
        <div className={style.body}>
            <div className={style.cardcontainer}>
                <h1>Añadir cuenta</h1>
                <form className={style.accountform} onSubmit={handleSubmit}>
                    <div className={style.idcontainer}>
                        <label htmlFor="id">Identificación:</label>
                        <input type="text" id="id" name="id" placeholder="Ingrese la identificación" value={id} onChange={handleId}/>
                    </div>

                    <div className={style.buttonscontainer}>
                        <button type="submit" disabled={loading} >{loading ? "Añadiendo Usuario..." : "Añadir"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}