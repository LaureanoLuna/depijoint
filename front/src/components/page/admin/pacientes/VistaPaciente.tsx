import usePacienteAccion from "@/assets/hooks/usePacienteAccion";
import { Paciente } from "@/assets/interfaces/paciente";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import { FaMap, FaWhatsapp } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

export default function VistaPaciente() {
  const { getPaciente, getContratacionesPaciente } = usePacienteAccion();
  const [paciente, setPaciente] = useState<Paciente>();
  const { pacienteId } = useParams();

  useEffect(() => {
    if (!pacienteId) return;
    const p = getPaciente(pacienteId);
    setPaciente(p);
  }, [pacienteId]);

  return (
    <div className="grid grid-rows-2 gap-3">
      <Card>
        <CardHeader className="">
          <Avatar className="flex justify-center ">
            <AvatarImage
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVOrsbCWorzjyEOx9tW2HTo6cZhSRZkFzN1g&s"
              alt="Avatar de DepiJoit"
              className="rounded-full w-1/4 md:w-1/6"
            />
            <AvatarFallback>DepiJoint</AvatarFallback>
          </Avatar>
          <CardDescription>
            <div className="text-xl font-medium italic">
              {paciente?.nombre},{paciente?.apellido}
            </div>
            <div>DNI: {paciente?.dni}</div>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <Link
            to={`https://wa.me/54${paciente?.telefono}`}
            target="_blank"
            className="flex items-center gap-2 font-semibold tracking-widest px-5 hover:underline hover:cursor-pointernp"
          >
            <FaWhatsapp size={"2em"} color="green" />
            +54 {paciente?.telefono}
          </Link>
          <Link
            to={`mailto:${paciente?.email}`}
            className="flex items-center gap-2 font-semibold tracking-widest px-5 hover:underline hover:cursor-pointernp"
          >
            <FaMap size={"2em"} />
            {paciente?.email}
          </Link>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 gap-2">
        <Card>
          <CardHeader>
            { return getContratacionesPaciente(paciente?.dni).map((c)=>{})}
          </CardHeader>

        </Card>
        <Card>
          <CardHeader>
            hola
          </CardHeader>

        </Card>
      </div>
    </div>
  );
}
