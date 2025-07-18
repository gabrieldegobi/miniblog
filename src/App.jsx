
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

//PAGES
import Home from "./pages/Home/Home"
import About from "./pages/About/About"
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'



import { AuthProvider } from './context/AuthContext'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useAuthentication } from './hooks/useAuthentication'






function App() {

  //pegando o usuário
  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication()


  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{

      setUser(user)

    })
  },[auth])

  //para que dê tempo de a api buscar o usuário
  const loadingUser = user === undefined
  if (loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      <AuthProvider value={{user}}>
        <BrowserRouter>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>

  )
}

export default App
