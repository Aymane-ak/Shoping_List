import { useState } from "react"

function ListForm (props){


    const [name, setName] = useState('')
    const  styleInput = "border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"


    const ListToAdd = async () => {

        const res = await fetch (`${import.meta.env.VITE_API_URL}/lists`, { 
            method  : 'POST',
            body    : JSON.stringify({name}),
            headers : {'Content-Type': 'application/json'}
    
    })
        const data = await res.json()
        setName ('')
        props.onAdd(data)
}

return (

    <div> 
        <div className="mt-4 flex gap-2">
            
            <input className={styleInput} placeholder="Nom de la liste" value={name} onChange={e=> setName(e.target.value)}/> 
            <button onClick={ListToAdd} className="shadow-xl bg-blue-500 rounded-full"> Créer </button>

        </div>
    </div>
    )
}
export default ListForm ;