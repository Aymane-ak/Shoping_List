import { useState } from "react"

function ListForm (props){


    const [name, setName] = useState('')


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

return <div> 

    <input className="ListName" placeholder="Nom de la liste" value={name} onChange={e=> setName(e.target.value)}/> 

    <button onClick={ListToAdd}> Créer </button>

</div>
}
export default ListForm ;