import Turno from "./Turno"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { CalendarIcon, PlusCircledIcon } from "@radix-ui/react-icons"

const LIST_PAS = [{
    id: "1",
    paciente: { name: "Laureano Luna", dni: "38232325" },
    hora: "09:30",
    duracion: "30",
    estado: false,
}, {
    id: "2",
    paciente: { name: "Laureano Luna", dni: "38232325" },
    hora: "19:30",
    duracion: "30",
    estado: false,
}, {
    id: "3",
    paciente: { name: "Laureano Luna", dni: "38232325" },
    hora: "08:30",
    duracion: "30",
    estado: false,
},{
    id: "4",
    paciente: { name: "Laureano Luna", dni: "38232325" },
    hora: "19:30",
    duracion: "30",
    estado: false,
},{
    id: "5",
    paciente: { name: "Laureano Luna", dni: "38232325" },
    hora: "19:30",
    duracion: "30",
    estado: false,
},{
    id: "6",
    paciente: { name: "Laureano Luna", dni: "38232325" },
    hora: "19:30",
    duracion: "30",
    estado: false,
},]
export default function Item() {
    return <>
        <Card className="flex justify-between items-center px-5">
            <CardHeader className="">
                <CardTitle className="text-justify text-xl uppercase flex justify-center items-center gap-5">
                    <CalendarIcon className="" />
                    <span>
                        Turnos
                        <CardDescription className="tracking-widest">
                             del dia  07/08/2024
                        </CardDescription>
                    </span>
                </CardTitle>
            </CardHeader>
            <CardHeader>
                <Button variant={"outline"} className="flex gap-2 uppercase">
                    <PlusCircledIcon />
                    nuevo
                </Button>
            </CardHeader>
        </Card>
        <Table className="w-full text-center overflow-visible">
            <TableCaption>Turnos de los pacientes</TableCaption>
            <TableHeader className="w-full text-center">
                <TableRow className="">
                    <TableHead className="text-center text-xl py-3">Paciente</TableHead>
                    <TableHead className="text-center text-xl py-3">Hora</TableHead>
                    <TableHead className="text-center text-xl py-3">Duracion</TableHead>
                    <TableHead className="text-center text-xl py-3">Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {LIST_PAS.map((pass) => <Turno key={pass.id} prop={pass} />)}
            </TableBody>
        </Table>
    </>
}
