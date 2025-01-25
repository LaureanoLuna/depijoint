import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";

export default function TablaComponent({
    children,
    arrTitulos
}: {
    children: React.ReactNode;
    arrTitulos: string[]; // Cambiado a string[]
}) {
    useEffect(() => {
        console.log(arrTitulos);
    }, [arrTitulos]); // Agregado arrTitulos como dependencia

    return (
        <Table className="w-full text-center overflow-visible">
            <TableCaption>Listado de los pacientes</TableCaption>
            <TableHeader className="w-full text-center">
                <TableRow>
                    {arrTitulos.map((titulo: string) => (
                        <TableHead key={titulo} className="text-center text-xl py-3">
                            {titulo} {/* Cambiado "hola" por "titulo" */}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>{children}</TableBody>
        </Table>
    );
}