import { useEffect, useState } from "react";
import { useParams } from "react-router";
import SearchBar from "./SearchBar";

function ProductsPage (){

const {list_id}                   = useParams();
const [products, setProducts]     = useState([]);
const [showSearch, setshowSearch] = useState(false);


useEffect(()=> { 
    const fetchProduct = async () => {
        const res  = await fetch(`${import.meta.env.VITE_API_URL}/lists/${list_id}/list_products`)
        const data = await res.json()
        setProducts(data)
    }

    fetchProduct()
}, [])


const addProducts = async (product)  => {

    const res = await fetch (`${import.meta.env.VITE_API_URL}/lists/${list_id}/list_products` , 
        {   method : 'POST',
            body   : JSON.stringify( {

                    barcode      : product.barcode,
                    name         : product.name,
                    image_url    : product.image_url,
                    brand        : product.brand,
                    calories     : product.calories,
                    product_size : product.product_size,
                    nutriscore   : product.nutriscore,
                    quantity     : 1,
                    bought       : false
            }),
            headers : {'Content-Type' : 'application/json'}      
        })
    const data = await res.json()  
    if(!res.ok){
        alert(data.error)
        return
    }
    setProducts(prev => [...prev, data]) // voir les produits sans recharger la page 
    setshowSearch(false)
}

const deleteProduct = async  (productId) => {
    const res  = await fetch (`${import.meta.env.VITE_API_URL}/lists/${list_id}/list_products/${productId}`, {method : 'DELETE'})
    const data = await res.json()
    if(!res.ok)  {
        alert(data.error)
        return 
    }
    setProducts (prev => prev.filter(p=> p.id !== productId))
    
}

const  changeToggleProduct = async (product)=> {
    const res = await fetch (`${import.meta.env.VITE_API_URL}/lists/${list_id}/list_products/${product.id}`, 
        { method : 'PUT',
          body : JSON.stringify({
            bought   : !product.bought,
            quantity : product.quantity
        }
        ),
        headers: { 'Content-Type': 'application/json' }
        })
    const data  = await res.json();
    if(!res.ok){
        alert(data.error)
        return;
    }    
    setProducts(prev => prev.map(p => 
            // p.id === product.id ? {...p, bought: !p.bought} : p
            p.id === data.id ? data : p
    ))     
}

return (
    <div> 
        
        <button onClick={() => {setshowSearch(true)}}> Ajouter un Produit </button>
        {showSearch && <SearchBar listId = {list_id} onAdd = {addProducts} /> }
    
    <table border={2} style={{padding : "3em", margin : "3em"}}>  
        <thead>
            <tr>
              <td>Name</td>
              <td>Image</td>
              <td>Marque</td>
              <td>Nutriscore</td>
              <td>TAILLE</td>
              <td>Achete</td>
              <td>Quantite</td>
            </tr>
        </thead>

        <tbody>        
        { products.map( product => (
            <tr key = {product.id}>             
                    
                    <td>  {product.name}  </td>
                    <td>  <img src = {product.image_url} alt ={ product.name} />  </td>
                    <td>  {product.brand}  </td>
                    <td>  {product.nutriscore}  </td>
                    <td>  {product.product_size}  </td>
                    <td>  

                        <input type="checkbox" checked = {product.bought}  onChange={() => changeToggleProduct(product)}/>                      
                        
                    </td>
                    <td>  
                        <select> 
                            <option > 1 </option>
                            <option> 2</option>
                            <option> 3</option>
                            <option> 4 </option>
                            <option> 5 </option>
                            <option> 6 </option>
                            {/* value={product.quantity} */}
                            

                        </select>
                        {product.quantity}  </td>
                    <td> <button onClick={ () => deleteProduct(product.id)}> Supprimer </button> </td>               
                </tr>
        ))
        }
        </tbody>
    </table>
    </div>
    
    )
    }

export default ProductsPage



