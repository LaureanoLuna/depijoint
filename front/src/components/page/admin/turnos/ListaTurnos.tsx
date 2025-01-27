import { useState } from "react";
import Turno from "./Turno";
import useDateFilter from "@/assets/hooks/useDateFilter";
import AddTurno from "./AddTurno";
import { TurnoInterface } from "@/assets/interfaces/turno";
import { InputFecha } from "@/assets/components/InputFecha";
import Cabecera from "@/assets/components/Cabecera";
import TablaComponent from "@/assets/components/TablaComponent";

const ListaTurnos: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());

  const { filteredTurnos } = useDateFilter({ fecha: date });

  return (
    <>
      <Cabecera
        titulo="Prueba"
        descripcion="Desc"
        contenidoMedio={<InputFecha date={date} funcDate={setDate} />}
        botonAccion={<AddTurno />}
      />
        <TablaComponent     arrTitulos={['Paciente','Hola','Duracion','Acciones']}
        >
            {filteredTurnos.map((pass: TurnoInterface) => (
            <Turno key={pass.id} prop={pass} />
          ))}
        </TablaComponent>
    </>
  );
};

export default ListaTurnos;
