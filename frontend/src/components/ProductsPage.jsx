import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { useNavigate, useParams } from "react-router";
import ProductCard from './ProductCard';
import SearchBar from "./SearchBar";

import { ArrowBigLeft, Search, ShoppingCart } from 'lucide-react';

function ProductsPage (){

    const {list_id}                   = useParams();
    const [products, setProducts]     = useState([]);
    const [showSearch, setshowSearch] = useState(false);
    const navigate                    = useNavigate()

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
                
        )) 
        toast.success(`Quantité du produit ${product.name} changée : ${Number(newQuantity)}`)    
        }  
        
        const sortedProducts = [...products].sort((a,b)=> 
        a.bought  === b.bought ? 0 : a.bought ? 1 :-1 )

    return (
        <div> 
        
            
            <div className="mt-4 flex items-center justify-between gap-2 mb-4">       
                <ArrowBigLeft  className="w-7 h-7 cursor-pointer hover:text-blue-500"  onClick={() => navigate('/') } />

                <Search className='w-6 h-6 cursor-pointer hover:text-blue-500' onClick={() => {setshowSearch(true)}}/>
            </div>      
                { showSearch && <SearchBar listId = {list_id} onAdd = {addProducts} /> }
                { Array.isArray(sortedProducts) && sortedProducts.map( product => (
                    <ProductCard 
                    
                        key              = {product.id}
                        product          = {product}
                        OnToggle         = {changeToggleProduct}
                        OnDelete         = {deleteProduct}
                        OnQuantityChange = {changeQuantityProduct}                     
                    />                  
                ))
            }

            {products.length === 0 && (
    <div className="text-center py-12 text-gray-400">
        <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-30"/>
        <p className="text-lg">Aucun produit pour l'instant dans cette liste </p>
        <p className="text-sm">Appuie sur + pour ajouter un produit !</p>
    </div>
    )}
        </div>    
        )
}
export default ProductsPage



