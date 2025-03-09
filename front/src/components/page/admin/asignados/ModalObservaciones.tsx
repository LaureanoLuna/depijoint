import ModalComponent from "@/assets/components/ModalComponent";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useTurnoAccion from "@/assets/hooks/useTurnoAccion";
import { Turno } from "@/assets/interfaces/turno";
import { formatearFecha } from "@/assets/function/funcionesTurnos";
import { FaCheck } from "react-icons/fa";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Zona } from "@/assets/interfaces/zona";
import useContratacionAccion from "@/assets/hooks/useContratacionAccion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
interface ModalObservacionesProps {
  dni: string;
}
export default function ModalObservaciones({ dni }: ModalObservacionesProps) {
  // Estado para almacenar los turnos y zonas de tratamiento
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const { getTurnosPaciente } = useTurnoAccion();
  const { itemsTratamiento } = useContratacionAccion();
  const [zonasTratamiento, setZonasTratamiento] = useState<Zona[]>([]);
  const [zonas, setZonas] = useState<number[]>([]);
  const [zonasTratadas, setZonasTratadas] = useState<{ zonasId: number, value: string }[]>([]);
  const [observacion, setObservacion] = useState<string>("");
  // Función para obtener las observaciones de un paciente
  const getObservaciones = (dniPaciente: string) => {
    const t = getTurnosPaciente(dniPaciente);
    if (t) setTurnos(t);
  };
  // Función para obtener las zonas de tratamiento
  const getZonas = async () => {
    const zonasZ = await itemsTratamiento(dni);
    setZonasTratamiento(zonasZ);
  };
  // Maneja el envío de zonas tratadas y observaciones
  const handleEnvioZonasTratadas = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ zonasTratadas, observacion });
  };
  // Efecto para cargar turnos y zonas al montar el componente
  useEffect(() => {
    getObservaciones(dni);
    getZonas();
  }, [dni]);
  return (
    <ModalComponent
      botonText={<FaCheck />}
      descripcion="Aquí están las observaciones de turnos anteriores"
      titulo="Observaciones"
      key={dni}
      children={
        <>
          <Card>
            <CardHeader className="px-2 py-1">
              Zonas a tratarse:
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEnvioZonasTratadas}>
                {zonasTratamiento.map((x) => (
                  <div className="flex items-center justify-between space-x-2 my-1" key={x.zonaId}>
                    <div className="flex items-center space-x-2 my-1">
                      <Checkbox
                        id={x.codigo}
                        checked={zonas.includes(x.zonaId)}
                        onCheckedChange={(c) => {
                          setZonas((prev) =>
                            c
                              ? [...prev, x.zonaId]
                              : prev.filter((zona) => zona !== x.zonaId)
                          );
                        }}
                      />
                      <label
                        className="text-sm font-medium leading-none flex gap-2"
                        htmlFor={x.codigo}
                      >
                        <span>{x.tipo}</span>
                        <span>{x.codigo}</span>
                        <span>{x.nombre}</span>
                      </label>
                    </div>
                    <Input
                      type="text"
                      className="w-16"
                      disabled={!zonas.includes(x.zonaId)}
                      onChange={(e) => {
                        const value = e.target.value;
                        setZonasTratadas((prev) => {
                          const updated = prev.filter(item => item.zonasId !== x.zonaId);
                          updated.push({ zonasId: x.zonaId, value });
                          return updated;
                        });
                      }}
                    />
                  </div>
                ))}
                <Label htmlFor="observacionesTurno">
                  Observación
                  <Textarea
                    id="observacionesTurno"
                    className="resize-none"
                    value={observacion}
                    onChange={(e) => setObservacion(e.target.value)}
                  />
                </Label>
                <Button
                  type="submit"
                  className="border p-2 rounded-md hover:bg-gray-500 hover:text-black hover:font-semibold w-full mt-5"
                >
                  Cargar
                </Button>
              </form>
            </CardContent>
          </Card>
          <Accordion type="single" collapsible className="w-full">
            {turnos.map((turno) => (
              <AccordionItem value={turno.id} key={turno.id}>
                <AccordionTrigger>Turno: {formatearFecha(turno.dia)}</AccordionTrigger>
                <AccordionContent>
                  <p>{turno.observaciones}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </>
      }
    />
  );
}