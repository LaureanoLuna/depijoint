import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
  import './App.css'
import { LIST_COLABORADORES } from './assets/constant/LIST_COLABORADORES'
import { LIST_PACIENTE } from './assets/constant/LIST_PACIENTES'
import { LIST_TURNOS } from './assets/constant/LIST_TURNOS'
//import Layout from './components/layout/Layout'
import SiderBar from './components/layout/sider-bar/SiderBar'
import { LIST_CONTRATACIONES } from './assets/constant/LIST_CONTRATACIONES'


function App() {

  useEffect(() => {
    if (!localStorage.getItem('pacientes')) {
      localStorage.setItem('pacientes', JSON.stringify(LIST_PACIENTE));
    }
    if (!localStorage.getItem('colaboradores')) {
      localStorage.setItem('colaboradores', JSON.stringify(LIST_COLABORADORES));
    }
    if (!localStorage.getItem('turnos')) {
      localStorage.setItem('turnos', JSON.stringify(LIST_TURNOS));
    }
    if (!localStorage.getItem('contrataciones')) {
      localStorage.setItem('contrataciones', JSON.stringify(LIST_CONTRATACIONES));
    }
  }, []);
  

  
  return (
    <>
      <SiderBar>
        <Outlet />
      </SiderBar>
    </>
  )
}

export default App
