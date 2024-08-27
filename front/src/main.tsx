import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './components/page/auth/Login.tsx'
import Item from './components/page/admin/turnos/ListaTurnos.tsx'
import Add from './components/page/admin/turnos/AddTurno.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/turnos",
        element: <Item />
      },
      { path: "/addTurno", element: <Add /> }
    ]
  },
  { path: "/login", element: <Login /> }

])

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
