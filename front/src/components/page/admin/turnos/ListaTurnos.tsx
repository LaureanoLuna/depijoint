import { useState } from "react";
import Turno from "./Turno";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDateFilter from "@/assets/hooks/useDateFilter";
import AddTurno from "./AddTurno";
import { TurnoInterface } from "@/assets/interfaces/turno";
import { InputFecha } from "@/assets/components/InputFecha";
import Cabecera from "@/assets/components/Cabecera";

const ListaTurnos: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());

  const { filteredTurnos } = useDateFilter({ fecha: date });

  return (
    <>
      <Cabecera
        titulo="Prueba"
        descripcion="Desc"
        hijoMedio={<InputFecha date={date} funcDate={setDate} />}
        botonAcion={<AddTurno />}
      />

      <Table className="w-full text-center overflow-visible">
        <TableCaption>Turnos de los pacientes</TableCaption>
        <TableHeader className="w-full text-center">
          <TableRow>
            <TableHead className="text-center text-xl py-3">Paciente</TableHead>
            <TableHead className="text-center text-xl py-3">Hora</TableHead>
            <TableHead className="text-center text-xl py-3">Duracion</TableHead>
            <TableHead className="text-center text-xl py-3">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTurnos.map((pass: TurnoInterface) => (
            <Turno key={pass.id} prop={pass} />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ListaTurnos;
