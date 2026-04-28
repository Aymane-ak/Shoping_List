import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import ListForm from "./ListForm";


function ListsPage() {
  const [lists, setLists]           = useState([]);
  const [showForm , setShowForm]    = useState(false);
  const navigate                    = useNavigate()
  const handleOpenForm              = () => setShowForm(true);
  const [selectedId, setSelectedId] = useState(null)
  const carStyle                    = "bg-green-100 rounded-lg shadow-sm p-4 mb-3 flex justify-between items-center cursor-pointer hover:shadow-md transition-shadow"
  const buttonStyle                 = "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow-xl m-5"

  const addList = (newList) => {
    setLists([...lists,newList])
    toast.success('Liste créée !')
  }


  useEffect(() => {
    const fetchLists = async () => {
      const res  = await fetch(`${import.meta.env.VITE_API_URL}/lists`)
      const data = await res.json()
      console.log(data) 
      setLists(data)
    }
    fetchLists()
  }, []);
   
  const deletedList = async (id) => {
    await fetch (`${import.meta.env.VITE_API_URL}/lists/${id}` , {method : 'DELETE'})
    setLists(lists.filter(list => list.id !== id ))  
    toast.success('Liste supprimée !')
  }

//   const deleteToggle = (selectedId) => {
    
//     if ( selectedId !=  null ){
//       setSelectedId === true       
//   }
// }
  return (
  <div className="max-w-md mx-auto p-4">  
  
    { lists.map( list => (
          
          
      <div key = {list.id} onClick={() => navigate (`/lists/${list.id}`, {state : {listName : list.name} })} className={carStyle}>
        
        {list.name}
        
            
        <input type="radio" onClick={(e) => {e.stopPropagation();setSelectedId(list.id)}} checked={selectedId === list.id} onChange={() => setSelectedId(list.id)} />  

                        
      </div>          
        )        
      )         
    }

    {selectedId && <button onClick = { () => deletedList(selectedId)} className={buttonStyle}  > Supprimer la liste </button> } 
    
    <div className="flex justify-center">
    <button onClick = {handleOpenForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-xl m-5"> Ajouter une liste </button>      
    </div>  
    {showForm && <ListForm onAdd = {addList}> </ListForm>} 

  </div>)
}

export default ListsPage