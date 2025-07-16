
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

//PAGES
import Home from "./pages/Home/Home"
import About from "./pages/About/About"
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'


function App() {


  return (
    <div>
      <BrowserRouter>
      <NavBar/>
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />


          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>

  )
}

export default App
