import React from 'react'
import { AppContextProvider } from './Context/AppContext'
import { Outlet } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './page/Home'
import BarNavigate from './Components/BarNavigate'

const App = () => {
  return (
    <>
    <AppContextProvider>
      <Header/>
      <Outlet/>
      <BarNavigate/>
      <Footer/>
    </AppContextProvider>
    </>
  )
}

export default App
