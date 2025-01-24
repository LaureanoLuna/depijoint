import Boton from "@/assets/components/Boton"
import { TurnoData } from "@/assets/interfaces/turno"
import { TableCell, TableRow } from "@/components/ui/table"
import { CheckIcon, Cross1Icon, Pencil1Icon } from "@radix-ui/react-icons"


export default function Turno({ prop }: { prop: TurnoData }) {

    function prueba(): void {
        alert("es una prueba")
    }


    return prop.estado ?
        (<TableRow className="text-md  hover:bg-green-500 " key={prop.id}>
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
                <Boton prop={{ is_tooltip: true, text_tooltip: "Confirmar", icono: <CheckIcon className="h-6 w-6" />, tamaño: "icon", variante: "ghost", estilo: "hover:border-green-600" }} />
                <Boton prop={{ is_tooltip: true, text_tooltip: "Editar ", icono: <Pencil1Icon className="h-5 w-5" />, tamaño: "icon", variante: "ghost", estilo: "hover:border-yellow-600" }} />
                <Boton prop={{ is_tooltip: true, text_tooltip: "Cancelar ", icono: <Cross1Icon className="h-5 w-5" />, tamaño: "icon", variante: "destructive", estilo: "hover:border-red-600" }} />
            </TableCell>
        </TableRow>) : (
           console.log("hola")
           
        )
}
