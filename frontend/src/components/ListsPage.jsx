import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import ListForm from "./ListForm";


function ListsPage() {
  const [lists, setLists]        = useState([]);
  const [showForm , setshowForm] = useState(false);
  const navigate                 = useNavigate()

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

  return (<div>  {    
        lists.map( list => (
          
           <div key = {list.id} onClick={() => navigate (`/lists/${list.id}`, {state : {listName : list.name} })}>
              {/* {list.id} */}
              {list.name}
              {/* {list.created_at}          */}
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

export default ListsPage