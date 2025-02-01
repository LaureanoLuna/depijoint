import Cabecera from "@/assets/components/Cabecera"
import { CabeceraColumna } from "@/assets/components/dataTable/CabeceraColumna"
import { PacienteSelect } from "@/assets/interfaces/paciente"
import { ColumnDef } from "@tanstack/react-table"
import AddPaciente from "./AddPaciente"
import { Tabla } from "@/assets/components/dataTable/Tabla"
import usePacienteAccion from "@/assets/hooks/usePacienteAccion"

export const Columna: ColumnDef<PacienteSelect>[] = [
    {
        accessorKey: "nombre",
        header: ({ column }) => <CabeceraColumna column={column} title="Nom" />
    },
    {
        accessorKey: "apellido",
        header: ({ column }) => <CabeceraColumna column={column} title="Apellido" />
    },
    {
        accessorKey: "dni",
        header: ({ column }) => <CabeceraColumna column={column} title="DNI" />
    },
    /*     {
            id:'actions',
            cell:({row})=>{
                const paciente = row.original;
                return
            }
        } */
]

export default function TablaPacientes() {
    const { getPacientes } = usePacienteAccion()
    return (
        <>
            <Cabecera
                titulo="Pacientes" descripcion="ABM de Pacientes" botonAccion={<AddPaciente />} />
            <Tabla columns={Columna} data={getPacientes()} opcionesFilto={['Nombre', 'Apellido', 'DNI']} />
        </>
    )
}
