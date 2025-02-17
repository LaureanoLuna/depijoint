import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './components/page/auth/Login';
import ListaAsignados from './components/page/admin/asignados/ListaAsignados';
import ListaColaboradores from './components/page/admin/colaboradores/ListaColaboradores';
import ListaZonas from './components/page/admin/zonas/ListaZonas';
import TablaTurnos from './components/page/admin/turnos/TablaTurnos';
import TablaPacientes from './components/page/admin/pacientes/TablaPacientes';
import VistaPaciente from './components/page/admin/pacientes/VistaPaciente';
import ErrorPage from './components/page/ErrorPage'; // Asegúrate de importar tu componente de error

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />, // Mueve el errorElement aquí
    children: [
      {
        path: "turnos",
        element: <TablaTurnos />
      },
      {
        path: "pacientes",
        element: <TablaPacientes />,
      },
      {
        path: "pacientes/:pacienteId", // Corrige la ruta para que sea relativa a "pacientes"
        element: <VistaPaciente />
      },
      {
        path: "asignados",
        element: <ListaAsignados />
      },
      {
        path: "colaboradores",
        element: <ListaColaboradores />
      },
      {
        path: "zonas",
        element: <ListaZonas />
      }
    ]
  },
  { path: "/login", element: <Login /> }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);