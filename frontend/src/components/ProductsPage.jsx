import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { useLocation, useNavigate, useParams } from "react-router";
import ProductCard from './ProductCard';
import SearchBar from "./SearchBar";

function ProductsPage (){

const {list_id}                   = useParams();
const [products, setProducts]     = useState([]);
const [showSearch, setshowSearch] = useState(false);
const navigate                    = useNavigate()
const location                    = useLocation()
const listName                    = location.state?.listName

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
        toast.error(data.error)
        return
    }
    const refresh = await fetch   (`${import.meta.env.VITE_API_URL}/lists/${list_id}/list_products`)
    const refreshedData = await refresh.json()
    setProducts(refreshedData)
    // setProducts(prev => [...prev, data]) // voir les produits sans recharger la page 
    setshowSearch(false)
    toast.success(`Produit ${product.name}  ajouté à la liste !`)
}

const deleteProduct = async  (productId) => {
    const res  = await fetch (`${import.meta.env.VITE_API_URL}/lists/${list_id}/list_products/${productId}`, {method : 'DELETE'})
    const data = await res.json()
    if(!res.ok)  {
        toast.error(data.error)
        return 
    }
    setProducts (prev => prev.filter(p=> p.id !== productId))
    toast.success('Produit supprimé !')
    
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
        toast.error(data.error)
        return;
    }    
    setProducts(prev => prev.map(p => 
            p.id === product.id ? {...p, bought: !p.bought} : p
            // p.id === data.id ? data : p
    )) 
    toast.success(product.bought ? 'Marqué non acheté' : 'Marqué acheté !')    
}

const changeQuantityProduct = async  (product, newQuantity) => {
    const res = await fetch (`${import.meta.env.VITE_API_URL}/lists/${list_id}/list_products/${product.id}`, 
        {
            method : 'PUT',
            body   : JSON.stringify({
                bought   : product.bought,
                quantity : Number(newQuantity)
            }
            ),
            headers: { 'Content-Type': 'application/json' }
        }
    )

    const data = await res.json()
    if(!res.ok){
        toast.error(data.error)
        return
    }
    setProducts(prev => prev.map(p => 
            p.id === product.id ? {...p, quantity: Number(newQuantity)} : p
            // p.id === data.id ? data : p
    )) 
    toast.success(`Quantité du produit ${product.name} changéz : ${Number(newQuantity)}`)

}

return (
    <div> 
        <h2> {listName}</h2>
        <button onClick={() => navigate('/') }> Retour </button>
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
            <ProductCard 
                key              = {product.id}
                product          = {product}
                OnToggle         = {changeToggleProduct}
                OnDelete         = {deleteProduct}
                OnQuantityChange = {changeQuantityProduct}                     
            />                  
        ))
        }
        </tbody>
    </table>
    </div>
    
    )
    }

export default ProductsPage



