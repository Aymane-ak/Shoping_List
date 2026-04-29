import { Plus, ShoppingCart, Trash2 } from 'lucide-react';
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
  const carStyle                    = "mt-4 bg-green-100 font-semibold rounded-lg shadow-sm p-4 mb-3 flex justify-between items-center cursor-pointer hover:shadow-md transition-shadow"

  const addList = (newList) => {
    setLists([...lists,newList])
    setShowForm(false)
    toast.success('Liste créée !')
  }

  useEffect(() => {
    const fetchLists = async () => {
      const res  = await fetch(`${import.meta.env.VITE_API_URL}/lists`)
      const data = await res.json()
      setLists(data)
    }
    fetchLists()
  }, []);
   
  const deletedList = async (id) => {
    await fetch (`${import.meta.env.VITE_API_URL}/lists/${id}` , {method : 'DELETE'})
    setLists(lists.filter(list => list.id !== id ))
    setSelectedId(null)  
    toast.success('Liste supprimée !')
  }
  
  return (
  <div className="max-w-md mx-auto p-4">      
   <div className='flex items-center justify-between mb-3'> 
      <h2 className="text-lg font-semibold text-gray-700">Mes listes</h2>
      <Plus className='w-7 h-7 cursor-pointer text-blue-500 hover:text-green-500' onClick = {handleOpenForm}/>
   </div> 

    { lists.map( list => (         
          
      <div key = {list.id} onClick={() => navigate (`/lists/${list.id}`, {state : {listName : list.name} })} className={carStyle}>        
        {list.name}  
            
        <input type="radio" onClick={(e) => {e.stopPropagation();setSelectedId(list.id)}} checked={selectedId === list.id} onChange={() => setSelectedId(list.id)} />                          
      </div>          
        )        
      )         
    }  

    {lists.length === 0 && (
    <div className="text-center py-12 text-gray-400">
      <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-30"/>
      <p className="text-lg">Aucune liste pour l'instant</p>
      <p className="text-sm">Appuie sur + pour créer ta première liste !</p>
    </div>
  )} 

    <div className="flex justify-center">
    {selectedId &&  <Trash2 className = "mt-4 cursor-pointer hover:text-red-500" onClick = { () => deletedList(selectedId)} />  }
    </div>  
    {showForm && <ListForm onAdd = {addList}> </ListForm>} 
  </div>)
}

export default ListsPage