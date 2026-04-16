import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Listspage from "./components/ListsPage"
import ProductsPage from "./components/ProductsPage"

function App() {
  return (
    
    <BrowserRouter> 
      <h1>Ma liste de courses</h1>
      <Routes> 
        <Route path ='/' element = {<Listspage/>}/> 
        <Route path ='/lists/:list_id' element = {<ProductsPage/>}  />  
      </Routes>      
    </BrowserRouter>
    

  )
}
export default App
