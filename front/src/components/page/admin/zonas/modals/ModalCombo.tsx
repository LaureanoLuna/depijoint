import Boton from "@/assets/components/Boton";
import ModalComponent from "@/assets/components/ModalComponent";
import useZonaAccion from "@/assets/hooks/useZonaAccion";
import { Zona } from "@/assets/interfaces/zona";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogClose } from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";

export default function ModalCombo({ agregarZonas, zonasSeleccionadas }: { agregarZonas: any, zonasSeleccionadas?:number[] }) {
  const [zonas, setZonas] = useState<number[] | undefined>(
    zonasSeleccionadas ? zonasSeleccionadas : []
  );
  const { getZonaPorTipo } = useZonaAccion();
  const [zonasDisponibles, setZonasDisponibles] = useState<Zona[] | undefined>(
    []
  );

  const handleAgregarZonas = () => {
    if ((zonas?.length ?? 0) < 2) {
      alert("tiene que seleccionar minimo 2 Zonas");
    }
    agregarZonas(zonas);
  };

  React.useEffect(() => {
    getZonaPorTipo().then(setZonasDisponibles);
  }, []);

  return (
    <div className="my-2">
      <ModalComponent
        botonText="Zonas"
        descripcion="Las Zonas para el Combo"
        titulo="Zonas Disponibles"
      >
        {zonasDisponibles?.map((x) => (
          <div className="flex items-center space-x-2" key={x.zonaId}>
            <Checkbox
              id={x.codigo}
              checked={zonas?.includes(x.zonaId) ?? false}
              onCheckedChange={(c) => {
                setZonas((prev) =>
                  c
                    ? [...(prev ?? []), x.zonaId]
                    : (prev ?? []).filter((zona) => zona !== x.zonaId)
                );
              }}
            />
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex gap-2"
              htmlFor={x.codigo}
            >
              <span>{x.tipo}</span>

              <span>{x.codigo}</span>

              <span>{x.nombre}</span>
              <span>{x.sexo}/{x.tamaño}</span>
            </label>
          </div>
        ))}
        {(zonas?.length ?? 0) >= 2 && (
          <DialogClose>
            <Boton
              prop={{
                is_tooltip: false,
                tamaño: "lg",
                variante: "secondary",
                texto: "Confirmar",
                tipo: "button",
                onClick: () => handleAgregarZonas(),
              }}
            />
          </DialogClose>
        )}
      </ModalComponent>
    </div>
  );
}
