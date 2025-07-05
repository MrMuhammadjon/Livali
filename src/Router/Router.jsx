import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import App from '../App'
import Home from '../page/Home'
import Login from '../page/Login'
import Order from '../page/Order'
import ErrorPage from '../page/ErrorPage'
import Welcome from '../page/WelcomPage'
import Profil from '../page/Profile'
import ProductDetalis from '../page/ProductDetalis'
import ProtectedRoute from '../Components/ProtectedRoute'
import { useAppContext } from '../Context/AppContext'



export default function Router() {
  const hasVisited = localStorage.getItem('hasVisited') === 'true'

  if (!hasVisited) {
    localStorage.setItem('hasVisited', 'true')
  }

  const router = createBrowserRouter([

    {
      path: '/',
      element: hasVisited ? <App /> : <Welcome />,
      errorElement: <ErrorPage />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'products/:id', element: <ProductDetalis /> },
        {
          path: 'profile',
          element: (
            <ProtectedRoute>
              <Profil />
            </ProtectedRoute>
          )
        },
        {
          path: 'order',
          element: (
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          )
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}
