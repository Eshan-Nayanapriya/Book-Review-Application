import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar'
import Footer from './components/Footer'

function App() {

  return (
    <>
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
    </>
  )
}

export default App
