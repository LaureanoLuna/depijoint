import { TableCell, TableRow } from "@/components/ui/table"


interface Turno {
    id: string
    paciente: {
        name: string
        dni: string
    }
    hora: string
    duracion: string
    estado: boolean
}

export default function Turno({ prop }: { prop: Turno }) {
    return (
        <TableRow  className="text-md  hover:bg-green-500 ">
            <TableCell>
                <div className="font-medium">{prop.paciente.name}</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                    {prop.paciente.dni}
                </div>
            </TableCell>
            <TableCell className="py-2">
                {prop.hora} hs
            </TableCell>
            <TableCell className="py-2">
                {prop.duracion} min
            </TableCell>
            <TableCell className="py-2">
                Butons
            </TableCell>
        </TableRow>
    )
}
