import { useState } from 'react';

function SearchBar(props) {


const [query, setQuery]     = useState('') 
const [results, setResults] = useState([])

const  getProducts = async () => {
    
    const product = await fetch (`${import.meta.env.VITE_API_URL}/products?name=${query}`)
    const data    = await product.json()
    setResults(data) 
}
    return (    
    <div> 
        <input value={query} onChange={e=> setQuery(e.target.value)} placeholder=' Chercher un produit ...'/>      

        <button onClick={getProducts}> Search </button>
        
                    {results.map ( result => (

                        <div key={result.barcode} onClick={() => props.onAdd(result)}> 

                            {result.name}
                            {result.image_url}
                            {result.product_size}
                            {result.brand}
                            {result.nutriscore}
                            {result.calories}
                        </div>
                ))
                }      
    </div>)
}

export default SearchBar;