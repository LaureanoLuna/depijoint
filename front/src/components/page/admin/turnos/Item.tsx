"use client";
import React, { useState } from "react";
import Turno from "./Turno";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CalendarIcon, PlusCircledIcon } from "@radix-ui/react-icons";

interface Paciente {
    name: string;
    dni: string;
}

interface TurnoData {
    id: string;
    paciente: Paciente;
    hora: string;
    duracion: string;
    estado: boolean;
}

const LIST_PAS: TurnoData[] = [
    { id: "1", paciente: { name: "Laureano Luna", dni: "38232325" }, hora: "09:30", duracion: "30", estado: false },
    { id: "2", paciente: { name: "Laureano Luna", dni: "38232325" }, hora: "19:30", duracion: "30", estado: false },
    { id: "3", paciente: { name: "Laureano Luna", dni: "38232325" }, hora: "08:30", duracion: "30", estado: false },
    { id: "4", paciente: { name: "Laureano Luna", dni: "38232325" }, hora: "19:30", duracion: "30", estado: false },
    { id: "5", paciente: { name: "Laureano Luna", dni: "38232325" }, hora: "19:30", duracion: "30", estado: false },
    { id: "6", paciente: { name: "Laureano Luna", dni: "38232325" }, hora: "19:30", duracion: "30", estado: false },
];

const Item: React.FC = () => {
    const [date, setDate] = useState<Date>(new Date());

    const refactoriDate = (): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

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
                    defaultValue={refactoriDate()}
                    style={
                        { fill: 'red' }
                    }
                    onChange={(e) => setDate(new Date(e.target.value))}
                />
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
                    <TableRow>
                        <TableHead className="text-center text-xl py-3">Paciente</TableHead>
                        <TableHead className="text-center text-xl py-3">Hora</TableHead>
                        <TableHead className="text-center text-xl py-3">Duracion</TableHead>
                        <TableHead className="text-center text-xl py-3">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {LIST_PAS.map((pass) => (
                        <Turno key={pass.id} prop={pass} />
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default Item;