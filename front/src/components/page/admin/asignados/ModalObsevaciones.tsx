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

export default function ModalObsevaciones({ id }: { id: string }) {
  const [turnos, setTurnos] = useState<Turno[] | undefined>(undefined);
  const { getTurnosPaciente } = useTurnoAccion();
  

  const getObservaciones = (id: string) => {
    const t = getTurnosPaciente(id);
    if (!t) return;
    setTurnos(t);
  };

  useEffect(() => {
    getObservaciones(id);
  }, []);

  return (
    <ModalComponent
      botonText="Observaciones"
      descripcion="Aca estan las observaciones de turnos anteriores"
      titulo="Observaciones"
      key={id}
      children={
        <Accordion type="single" collapsible className="w-full">
          {turnos?.map((turno) => {
            return (
              <AccordionItem value={turno.id} key={turno.id}>
                <AccordionTrigger>Turno: {formatearFecha(turno.dia)}</AccordionTrigger>
                <AccordionContent>
                    <p>{turno.observaciones}</p>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      }
    />
  );
}
