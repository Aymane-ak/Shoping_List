import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListForm from "./ListForm";


export default function ListsPage() {
  const [lists, setLists]        = useState([]);
  const [showForm , setshowForm] = useState(false);
  const navigate = useNavigate()

  const addList = (newList) => {
    setLists([...lists,newList])
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
    }

  return (<div>  {    
        lists.map( list => (
          
           <div key = {list.id} onClick={() => navigate (`/lists/${list.id}`)}>
              {list.id}
              {list.name}
              {list.created_at}         
              {/* <button onClick = { () => deletedList(list.id)}  > Supprimmer la liste </button> */}
              <button onClick = { (e) => {
                e.stopPropagation();
                deletedList(list.id);
                
                }}  > Supprimmer la liste </button>                           
           </div>          
        )        
      )     
    }  
    <button onClick = { () => setshowForm(true)} style={{backgroundColor : "red" }}> Ajouter une liste </button>
    {showForm && <ListForm onAdd = {addList}> </ListForm>} 

  </div>)
}
