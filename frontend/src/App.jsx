import { User } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { useLocation } from 'react-router'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Listspage from "./components/ListsPage"
import ProductsPage from "./components/ProductsPage"

function AppContent () {


  const location = useLocation()
  const isHome   = location.pathname === '/'
  const listName                    = location.state?.listName
  const title    = isHome ? '🛒 Mes listes' : `${'Liste : ' +  listName  || 'Ma Liste'}`

  return (
     <div className='min-h-screen bg-gray-50'>

      <Toaster />
      <header className="bg-white shadow-sm p-4">
        <div className='flex items-center justify-between'>           
          <h1 className='text-2xl font-bold text-gray-800' > {title} </h1>
          <User className='w-8 h-8 cursor-pointer text-grey-600'/> 
        </div>         
      </header>


      <main className='max-w-2xl mx-auto p-4'>
        <Routes> 
        <Route path ='/' element = {<Listspage/>}/> 
        <Route path ='/lists/:list_id' element = {<ProductsPage/>} />  
      </Routes> 
      
      </main>

     </div>

  )

}
function App() {

  
  return (
    
    <BrowserRouter> 
    
        <AppContent />
    </BrowserRouter>
  )
}
export default App
