import { Outlet } from 'react-router-dom'
import './App.css'
//import Layout from './components/layout/Layout'
import SiderBar from './components/layout/sider-bar/SiderBar'


function App() {
  return (
    <>
      <SiderBar>
        <Outlet />
      </SiderBar>
    </>
  )
}

export default App
