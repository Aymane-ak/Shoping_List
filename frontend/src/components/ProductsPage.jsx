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
                    barcode  : product.barcode,
                    quantity : 1
            }),
            headers : {'Content-Type' : 'application/json'}      
        })
    // const newProduct = await res.json()  
    const text = await res.text()
    console.log(text)
    // setProducts(prev => [...prev, newProduct])
}




return (
    <div> 
        
        <button onClick={() => {setshowSearch(true)}}> Ajouter un Produit </button>
        {showSearch && <SearchBar listId = {list_id} onAdd = {addProducts}/> }
    
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
                    <td>  {product.image_url}  </td>
                    <td>  {product.brand}  </td>
                    <td>  {product.nutriscore}  </td>
                    <td>  {product.product_size}  </td>
                    <td>  {product.bought}  </td>
                    <td>  {product.quantity}  </td>                    
                </tr>
        ))
        }
        </tbody>
    </table>
    </div>
    
    )
    }

export default ProductsPage



