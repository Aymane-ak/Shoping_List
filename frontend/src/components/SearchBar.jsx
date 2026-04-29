import { useState } from 'react';
import toast from 'react-hot-toast';

function SearchBar(props) {
    const [results, setResults] = useState([])
    const [query, setQuery]     = useState('')

    const  getProducts = async () => {
        if (query.trim() === '') {
            toast.error("Veuillez entrer un produit")
            return 
        }
        try {

            const response = await fetch (`${import.meta.env.VITE_API_URL}/products?name=${query}`)
            if(!response.ok){
                toast.error("Erreur lors de la recherche");
                return
            } 

            const data    = await response.json() 
            if(data.error){
                toast.error(data.error);
                return 
            } 
            setResults(data) 
        }
        catch (error){
            toast.error("Impossible de contacter le serveur");
            console.error(error);
        }
    }  
        return (    
        <div> 
            <div className='mb-4 flex items-center gap-2'> 
                <input className = "border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none  focus:ring-2 focus:ring-blue-500" value={query} onChange={e=> setQuery(e.target.value)} placeholder=' Chercher un produit ...'/>                  
                <button  className = "cursor-pointer hover:text-blue-500" onClick={getProducts}> Search </button>

            </div>          
                        {results.map ( result => (

                            <div key={result.barcode} onClick={() => props.onAdd(result)} className='flex items-center gap-3 p-3  hover: bg-grey cursor-pointer border-b'> 

                                <img src={result.image_url} alt ={ result.name} className='w-12 h-12 object-contain'/>
                                <div> 
                                    <p className='font-medium'> {result.name}  </p>
                                    <p className='text-sm tex-grey-500'> {result.product_size} • {result.calories} kcal </p>
                                    <p> Nutriscore : {result.nutriscore}  </p>
                                </div>                                                                          
                            </div>
                    ))
                    }      
        </div>)
}
export default SearchBar;