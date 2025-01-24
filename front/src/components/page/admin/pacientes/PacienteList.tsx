import TablaComponent from "@/assets/components/TablaComponent";
import { FaWhatsapp } from "react-icons/fa";
import { BsPatchPlus } from "react-icons/bs";
import { FaWpforms } from "react-icons/fa";
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
import Boton from "@/assets/components/Boton";
import { Badge } from "@/components/ui/badge";

/**
 * Componente que muestra una lista de pacientes con opciones para agregar nuevos pacientes
 * y realizar acciones sobre ellos.
 */
export default function PacienteList() {
  return (
    <>
      {/* Encabezado de la tarjeta con el título y el botón para agregar pacientes */}
      <Card className="flex justify-between items-center px-5">
        <CardHeader>
          <CardTitle className="text-justify text-xl uppercase flex justify-center items-center gap-5">
            <span>
              Turnos
              <CardDescription className="tracking-widest">
                del día
              </CardDescription>
            </span>
          </CardTitle>
        </CardHeader>
        <CardHeader>
          <AddPaciente />
        </CardHeader>
      </Card>

      {/* Componente de tabla que muestra la lista de pacientes */}
      <TablaComponent
        arrTitulos={["", "Nombre", "Apellido", "DNI"]}
      >
        {LIST_PACIENTE.map((paciente: Paciente) => (
          <TableRow className="text-md hover:bg-green-500" key={paciente.id}>
            {/* Columna para el consentimiento */}
            <TableCell>
              {paciente.consentimiento.tiene ? (
                <Boton
                  prop={{
                    is_tooltip: true,
                    text_tooltip: "ver consentimiento",
                    icono: <FaWpforms size={"20px"} />,
                    tamaño: "icon",
                    variante: "ghost",
                    texto: "",
                    estilo: "hover:border hover:border-green-900 uppercase",
                    onClick: () => {
                      alert(paciente.telefono); // Muestra el teléfono del paciente
                    },
                  }}
                />
              ) : (
                <Badge
                  variant="destructive"
                  className="text-center"
                >
                  Alerta
                </Badge>
              )}
            </TableCell>

            {/* Columna para el nombre del paciente */}
            <TableCell>
              <div className="font-medium">{paciente.nombre}</div>
            </TableCell>

            {/* Columna para el apellido del paciente */}
            <TableCell>
              <div className="font-medium">{paciente.apellido}</div>
            </TableCell>

            {/* Columna para el DNI del paciente */}
            <TableCell>
              <div className="font-medium">{paciente.dni}</div>
            </TableCell>

            {/* Columna para los botones de acción */}
            <TableCell>
              <Boton
                prop={{
                  is_tooltip: false,
                  icono: <FaWhatsapp size={"20px"} />,
                  tamaño: "icon",
                  variante: "ghost",
                  texto: "",
                  estilo: "hover:border hover:border-green-900",
                  onClick: () => {
                    alert(paciente.telefono); // Muestra el teléfono del paciente
                  },
                }}
              />
              <Boton
                prop={{
                  is_tooltip: false,
                  icono: <BsPatchPlus size={"20px"} />,
                  tamaño: "icon",
                  variante: "ghost",
                  texto: "",
                  estilo: "hover:border hover:border-green-900",
                  onClick: () => {
                    alert(paciente.telefono); // Muestra el teléfono del paciente
                  },
                }}
              />
            </TableCell>
          </TableRow>
        ))}
      </TablaComponent>
    </>
  );
}