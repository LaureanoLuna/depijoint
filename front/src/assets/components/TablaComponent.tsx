import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function TablaComponent({
    children,
    arrTitulos
}: {
    children: React.ReactNode;
    arrTitulos: string[]; // Cambiado a string[]
}) {


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