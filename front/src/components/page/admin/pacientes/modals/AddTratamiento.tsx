import ModalComponent from "@/assets/components/ModalComponent";
import useZonaAccion from "@/assets/hooks/useZonaAccion";
import { Tratamiento } from "@/assets/interfaces/contratacion";
import { Paciente } from "@/assets/interfaces/paciente";
import { Zona } from "@/assets/interfaces/zona";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import useTratamientoAccion from "@/assets/hooks/useTratamientoAccion";
import useContratacionAccion from "@/assets/hooks/useContratacionAccion";
import { DialogClose } from "@/components/ui/dialog";
export default function AddTratamiento({ paciente }: { paciente: Paciente }) {
  const { getZonas } = useZonaAccion();
  const { addTratamiento } = useTratamientoAccion();
  const { itemsTratamiento } = useContratacionAccion();
  const [zonasSeleccionadas, setZonasSeleccionadas] = useState<number[]>([]);
  const [zonasDisponibles, setZonasDisponibles] = useState<Zona[]>([]);
  const { handleSubmit } = useForm<Tratamiento>();
  // Función para obtener los ID de las zonas del tratamiento
  const idItems = async () => {
    const items = await itemsTratamiento(paciente.dni);
    return items.map((z) => z.zonaId) || [];
  };
  // Efecto para obtener zonas disponibles y zonas seleccionadas
  useEffect(() => {
    const fetchZonas = async () => {
      try {
        const zonas = await getZonas();
        setZonasDisponibles(zonas);
        setZonasSeleccionadas(await idItems());
      } catch (error) {
        console.error("Error al obtener zonas:", error);
      }
    };
    fetchZonas();
  }, [paciente]);
  // Filtrar zonas disponibles que no están deshabilitadas
  const zonasFiltradas = zonasDisponibles.filter((z) => !z.deshabilitado);
  // Función para manejar el envío del formulario
  const onSubmit: SubmitHandler<Tratamiento> = async () => {
    if (zonasSeleccionadas.length < 1) {
      alert("Necesita marcar una opción mínima");
      return;
    }
    const success = await addTratamiento(paciente.dni, zonasSeleccionadas);
    if (!success) {
      alert("No se cargó");
      return;
    }
    setZonasSeleccionadas(await idItems());
    alert("Se cargó exitosamente");
  };
  return (
    <ModalComponent
      botonText={<HiOutlineClipboardCopy />}
      titulo={`${paciente.nombre}, ${paciente.apellido}`}
      descripcion="Agregar un nuevo Tratamiento"
      key={paciente.dni}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {zonasFiltradas
          .sort((a, b) => a.codigo.localeCompare(b.codigo))
          .map((zona) => (
            <div className="flex items-center space-x-2 my-2" key={zona.zonaId}>
              <Checkbox
                id={zona.codigo}
                checked={zonasSeleccionadas.includes(zona.zonaId)}
                onCheckedChange={(checked) => {
                  setZonasSeleccionadas((prev) =>
                    checked
                      ? [...prev, zona.zonaId]
                      : prev.filter((id) => id !== zona.zonaId)
                  );
                }}
              />
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex gap-2"
                htmlFor={zona.codigo}
              >
                <span>{zona.tipo}</span>
                <span>{zona.codigo}</span>
                <span>{zona.nombre}</span>
                <span>
                  {zona.sexo}/{zona.tamaño}
                </span>
              </label>
            </div>
          ))}
        <DialogClose className="w-full" asChild>

          <Button
            className="border p-2 rounded-md hover:bg-gray-500 hover:text-black hover:font-semibold w-full mt-5"
            type="submit"
          >
            Cargar
          </Button>
        </DialogClose>

      </form>
    </ModalComponent>
  );
}