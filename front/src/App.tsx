import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import { LIST_COLABORADORES } from "./assets/constant/LIST_COLABORADORES";
import { LIST_PACIENTE } from "./assets/constant/LIST_PACIENTES";
import { LIST_TURNOS } from "./assets/constant/LIST_TURNOS";
//import Layout from './components/layout/Layout'
import SiderBar from "./components/layout/sider-bar/SiderBar";
import { LIST_CONTRATACIONES } from "./assets/constant/LIST_CONTRATACIONES";
import { DepiJointProvider } from "./assets/context/DepiJointContexto";
import { Toaster } from "./components/ui/toaster";
import { LIST_ZONAS } from "./assets/constant/LIST_ZONAS";


function App() {
  const navegacion = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("pacientes")) {
      localStorage.setItem("pacientes", JSON.stringify(LIST_PACIENTE));
    }
    if (!localStorage.getItem("colaboradores")) {
      localStorage.setItem("colaboradores", JSON.stringify(LIST_COLABORADORES));
    }
    if (!localStorage.getItem("turnos")) {
      localStorage.setItem("turnos", JSON.stringify(LIST_TURNOS));
    }
    if (!localStorage.getItem("zonas")) {
      localStorage.setItem("zonas", JSON.stringify(LIST_ZONAS));
    }
    if (!localStorage.getItem("tratamientos")) {
      localStorage.setItem(
        "tratamientos",
        JSON.stringify(LIST_CONTRATACIONES)
      );
    }
    if (!sessionStorage.getItem("logueado")) {
      navegacion("/login");
    }
  }, []);

  return (
    <div>
      <DepiJointProvider>
        <SiderBar>
          <Outlet />
        </SiderBar>
        <Toaster />
      </DepiJointProvider>
    </div>
  );
}

export default App;
