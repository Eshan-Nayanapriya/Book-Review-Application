import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className='flex-grow'>
        <Outlet />
      </main>
      <Footer />
      <Toaster/>
      </div>
    </>
  )
}

export default App
