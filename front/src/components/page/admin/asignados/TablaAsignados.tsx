import Cabecera from "@/assets/components/Cabecera";
import useAsignadoAccion from "@/assets/hooks/useAsignadoAccion";
import useLoginAccion from "@/assets/hooks/useLoginAccion";
import { Asignado } from "@/assets/interfaces/asignado";
import { Usuario } from "@/assets/interfaces/usuario";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ModalObservaciones from "./ModalObservaciones";
import { InputFecha } from "@/assets/components/InputFecha";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export default function TablaAsignados() {
  const [dia, setDia] = useState<Date>(new Date());
  const [user, setUser] = useState<Usuario | undefined>(undefined);
  const { getTurnosAsignados, quitarAsignacion } = useAsignadoAccion();
  const { isLogin } = useLoginAccion();
  const navegar = useNavigate();
  useEffect(() => {
    const usuario = isLogin();
    if (!usuario) {
      navegar("/login");
    } else {
      setUser(usuario);
    }
  }, []);
  const turnosAsignados = getTurnosAsignados(user?.id ?? "", dia);
  return (
    <>
      <Cabecera
        titulo="Asignados"
        descripcion="Turnos asignados"
        contenidoMedio={<InputFecha date={dia} funcDate={setDia} />}
        botonAccion={<h1>Filtro</h1>}
      />
      {turnosAsignados.map((asignado: Asignado) => (
        <Card key={asignado.turnoId} className="grid grid-cols-3 items-center justify-around p-2 my-2">
          <div>
            <h2 className="font-semibold tracking-wide">Nombre: {asignado.nombre}</h2>
            <h3 className="font-medium text-sm">DNI: {asignado.dni}</h3>
          </div>
          <p>{`Turno Nº ${asignado.turnoNumero ?? 1}`}</p>
          <div className="grid grid-cols-2 gap-2 items-center">
            <ModalObservaciones dni={asignado.dni} dia={dia}  />
            <Button
              size="lg"
              variant="delete"
              onClick={() => quitarAsignacion(asignado.turnoId)}
            >
              <FaTimes />
            </Button>
          </div>
        </Card>
      ))}
    </>
  );
}