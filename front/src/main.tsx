import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './components/page/auth/Login.tsx'
import ListaTurnos from './components/page/admin/turnos/ListaTurnos.tsx'
import PacienteList from './components/page/admin/pacientes/PacienteList.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/turnos",
        element: <ListaTurnos />
      },
      {
        path:"/pacientes",
        element:<PacienteList />
      },
      {
        path:"/asignados",
        element: <h1>hola</h1>
      }
    ]
  },
  { path: "/login", element: <Login /> },
  {
    errorElement:"nada",
  }

])

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
