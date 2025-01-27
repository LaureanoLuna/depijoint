import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './components/page/auth/Login.tsx'
import ListaTurnos from './components/page/admin/turnos/ListaTurnos.tsx'
import ListaPacientes from './components/page/admin/pacientes/ListaPacientes.tsx';
import ListaAsignados from './components/page/admin/asignados/ListaAsignados.tsx';
import ListaColaboradores from './components/page/admin/colaboradores/ListaColaboradores.tsx';

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
        element:<ListaPacientes />
      },
      {
        path:"/asignados",
        element: <ListaAsignados />
      },
      {
        path:"/colaboradores",
        element:<ListaColaboradores />
      },
      {
        path:"/zonas",
        element:""
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
