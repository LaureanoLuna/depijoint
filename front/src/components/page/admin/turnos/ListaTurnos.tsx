"use client";
import React, { useState } from "react";
import Turno from "./Turno";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import Boton from "@/assets/components/Boton";
import useDateFilter from "@/assets/hooks/useDateFilter";

const ListaTurnos: React.FC = () => {
    const [date, setDate] = useState<Date>(new Date());

    const { filteredTurnos, refactoriDate } = useDateFilter({ fecha: date })

    return (
        <>
            <Card className="flex justify-between items-center px-5">
                <CardHeader>
                    <CardTitle className="text-justify text-xl uppercase flex justify-center items-center gap-5">
                        <CalendarIcon />
                        <span>
                            Turnos
                            <CardDescription className="tracking-widest">
                                del dia
                            </CardDescription>
                        </span>
                    </CardTitle>
                </CardHeader>
                <input
                    type="date"
                    className="bg-transparent border-2 px-3 py-1 text-white rounded-md w-1/4 text-center text-lg font-semibold"
                    defaultValue={refactoriDate(date)}
                    onChange={(e) => setDate(new Date(`${e.target.value}T00:00:00`))}
                />
                <CardHeader>
                    <Boton prop={{ is_tooltip: false, icono: <PlusCircledIcon />, texto: "Nuevo", tamaño: "default", variante: "outline", estilo: "flex gap-2" }} />
                </CardHeader>
            </Card>
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
                    {filteredTurnos.map((pass) => (
                        <Turno key={pass.id} prop={pass} />
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default ListaTurnos;