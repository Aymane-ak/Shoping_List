function ProductCard ({product, OnToggle, OnDelete, OnQuantityChange}){
    
return (
    <tr key = {product.id}>             
                    
                    <td>  {product.name}  </td>
                    <td>  <img src = {product.image_url} alt ={ product.name} width={50}/>  </td>
                    <td>  {product.brand}  </td>
                    <td>  {product.nutriscore}  </td>
                    <td>  {product.product_size}  </td>
                    <td>  

                        <input  type="checkbox" checked = {product.bought}  onChange={() => OnToggle(product)}/>                      
                        {/* <button onClick={() => changeToggleProduct(product)}>
                        {product.bought ? '✅ Acheté' : '⬜ Non acheté'}
                        </button> */}
                        
                    </td>
                    <td>  
                        <select  onChange={ (e)=> OnQuantityChange(product,e.target.value)}> 
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>         
                        </select>
                    </td>
                    <td> <button onClick={ () => OnDelete(product.id)}> Supprimer </button> </td>               
                </tr>
)
}

export default ProductCard