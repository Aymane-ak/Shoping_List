import { useState } from "react";
import toast from 'react-hot-toast';

function ListForm (props){
    const [name, setName] = useState('')
    const  styleInput     = "border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    const ListToAdd = async () => {

        if (name.trim() === '') {
            toast.error("Veuillez entrer un nom pour votre liste")
            return 
        }
        try {
            const res = await fetch (`${import.meta.env.VITE_API_URL}/lists`, { 

                    method  : 'POST',
                    body    : JSON.stringify({name}),
                    headers : {'Content-Type': 'application/json'}    
    })
            if (!res.ok){
                toast.error("Erreur lors de la création de la liste");
                return
            }
            const data = await res.json()
            if(data.error) {
                toast.error(data.error)
                return 
            }
            setName ('')
            props.onAdd(data)            
        }

        catch (error){
                toast.error("Impossible de contacter le serveur");
                console.error(error);
        }
    }  

return (

    <div> 
        <div className="mt-4 flex gap-2">            
            <input className={styleInput} placeholder="Nom de la liste" value={name} onChange={e=> setName(e.target.value)}/> 
            <button onClick={ListToAdd} className = "hover:text-green-300"> Créer </button>
        </div>
    </div>
    )
}
export default ListForm ;