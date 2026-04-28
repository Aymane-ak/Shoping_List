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
      <header className="bg-white shadow-sm p-4 ">
        <h1 className='text-2xl font-bold text-gray-800 mb-6 flex justify-center' > {title} </h1>
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
