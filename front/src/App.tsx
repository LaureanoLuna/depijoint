import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
  import './App.css'
import { LIST_COLABORADORES } from './assets/constant/LIST_COLABORADORES'
import { LIST_PACIENTE } from './assets/constant/LIST_PACIENTES'
import { LIST_TURNOS } from './assets/constant/LIST_TURNOS'
//import Layout from './components/layout/Layout'
import SiderBar from './components/layout/sider-bar/SiderBar'


function App() {

  useEffect(() => {
    localStorage.setItem('pacientes',JSON.stringify(LIST_PACIENTE));
    localStorage.setItem('colaboradores',JSON.stringify(LIST_COLABORADORES));
    localStorage.setItem('turnos',JSON.stringify(LIST_TURNOS));
  }, [])
  

  
  return (
    <>
      <SiderBar>
        <Outlet />
      </SiderBar>
    </>
  )
}

export default App
