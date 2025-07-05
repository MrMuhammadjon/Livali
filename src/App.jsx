import React from 'react'
import { AppContextProvider } from './Context/AppContext'
import { Outlet } from 'react-router-dom'
import Header from './сomponents/Header'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
    <AppContextProvider>
      <Header/>
      <Outlet/>
      <Footer/>
    </AppContextProvider>
    </>
  )
}

export default App
