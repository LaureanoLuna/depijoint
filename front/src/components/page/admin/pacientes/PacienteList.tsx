import TablaComponent from "@/assets/components/TablaComponent";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddPaciente from "./AddPaciente";
import { LIST_PACIENTE } from "@/assets/constant/LIST_PACIENTES";
import { Paciente } from "@/assets/interfaces/paciente";
import { TableCell, TableRow } from "@/components/ui/table";

export default function PacienteList() {
  return (
    <>
      <Card className="flex justify-between items-center px-5">
        <CardHeader>
          <CardTitle className="text-justify text-xl uppercase flex justify-center items-center gap-5">
            <span>
              Turnos
              <CardDescription className="tracking-widest">
                del dia
              </CardDescription>
            </span>
          </CardTitle>
        </CardHeader>

        <CardHeader>
          <AddPaciente />
        </CardHeader>
      </Card>
      <TablaComponent arrTitulos={['nombre','apellido','dni','telefono']}>
        {LIST_PACIENTE.map((paciente: Paciente) => (
          <TableRow className="text-md  hover:bg-green-500 " key={paciente.id}>
            <TableCell>
              <div className="font-medium">{paciente.nombre}</div>
            </TableCell>
            <TableCell>
              <div className="font-medium">{paciente.apellido}</div>
            </TableCell>
            <TableCell>
              <div className="font-medium">{paciente.dni}</div>
            </TableCell>
            <TableCell>
              <div className="font-medium">{paciente.telefono}</div>
            </TableCell>
            <TableCell>
              <div className="font-medium">{paciente.dni}</div>
            </TableCell>
          </TableRow>
        ))}
      </TablaComponent>
    </>
  );
}
