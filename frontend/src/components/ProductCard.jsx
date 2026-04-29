
import { Trash } from 'lucide-react'
function ProductCard ({product, OnToggle, OnDelete, OnQuantityChange}){
    
return (
    <div className="bg-white rounded-lg  hover:shadow-xl shadow-sm p-4 mb-3 flex items-center gap-3">                   
                            
        <img src = {product.image_url} alt ={ product.name} width={50} className="w-16 h-16 object-contain rounded"/> 
        <div className="flex-1"> 
            <p className="font-semibold text-gray-800" > {product.name} </p>
            <p className="text-sm text-gray-500">{product.brand} • {product.calories}  kcal</p>
            <p className="text-sm text-gray-500">  {product.product_size} </p>
            <p className="text-sm text-gray-500">  NUTRISCORE :  {product.nutriscore} </p> 
        </div>

        <select  onChange={ (e)=> OnQuantityChange(product,e.target.value)} className="border rounded px-2 py-1 text-sm"> 
            {[1,2,3,4,5,6].map(n => <option key={n} value={n}> {n} </option> )} 
        </select>

        <button
            onClick={() => OnToggle(product)}
            className={`w-14 h-7 rounded-full transition-colors ${product.bought ? 'bg-green-500' : 'bg-gray-300'}`}>

        <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform mx-1 ${product.bought ? 'translate-x-7' : 'translate-x-0'}`}/>           
        </button>
        <Trash className="hover:text-red-700" onClick={ () => OnDelete(product.id)}/>       
    </div>    
)
}
export default ProductCard