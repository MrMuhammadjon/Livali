import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import React, { lazy, Suspense } from 'react';

import App from '../App'
import Home from '../page/Home'
const Login = lazy(() => import('../page/Login'));
const Order = lazy(() => import('../page/Order'));
const ErrorPage = lazy(() => import('../page/ErrorPage'));
const Welcome = lazy(() => import('../page/WelcomPage'));
const Profil = lazy(() => import('../page/Profile'));
const ProductDetalis = lazy(() => import('../page/ProductDetalis'));
const SearchPage = lazy(() => import('../page/SearchPage'));
const Favorites = lazy(() => import('../page/Favorites'));
const Register = lazy(() => import('../page/Register'));
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
        { index: true, element: <Home /> }, // Bosh sahifa uchun
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'search', element: <SearchPage /> },
        { path: 'favorites', element: <Favorites /> },
        { path: 'cart', element: <Order /> },
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
