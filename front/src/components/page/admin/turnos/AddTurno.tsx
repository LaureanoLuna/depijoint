import { TurnoAdd } from "@/assets/interfaces/turno";
import { useForm, SubmitHandler } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormLateral } from "@/assets/components/FormLateral";
import { PersonaSearch } from "@/assets/interfaces/persona";
import InputSearch from "./InputSearch";
import usePacienteAccion from "@/assets/hooks/usePacienteAccion";
import { useEffect } from "react";

/**
 * Componente para agregar un turno.
 * @returns Componente AddTurno.
 */
export default function AddTurno() {
  /**
   * Función para formatear la fecha ingresada por el usuario.
   * @param date - Fecha a formatear.
   * @returns Fecha en formato 'YYYY-MM-DD'.
   */
  const refactoriDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses son 0-indexados
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TurnoAdd, PersonaSearch>({
    defaultValues: {
      duracion: "",
      dia: refactoriDate(new Date()),
    },
  });

  const { paciente, buscaPaciente } = usePacienteAccion();

  /**
   * Maneja el envío del formulario.
   * @param data - Datos del formulario.
   */
  const onSubmit: SubmitHandler<TurnoAdd> = (data) => {
    console.log(data, paciente?.dni);
  };

  /**
   * Componente interno para el formulario.
   * @returns Formulario para agregar un turno.
   */
  const Formulario = () => {
    useEffect(() => {
      if (paciente) {
        setValue("dni", paciente.dni);
      }
    }, [paciente, setValue]);

    return (
      <>
        <InputSearch<PersonaSearch>
          funcion={buscaPaciente}
          inputName="dni"
          placeholder="Ingrese el DNI"
        />
        <form onSubmit={handleSubmit(onSubmit)} className="p-5">
          <div className="grid grid-rows-2 mb-2">
            <span className="row-span-1">{paciente?.nombre}</span>
            <span className="row-span-1 text-sm ml-2 text-slate-600">
              DNI: {paciente?.dni}
            </span>
            <span>{paciente?.consentimiento.tiene}</span>
          </div>
          <input
            type="hidden"
            id="dniPacienteSearch"
            {...register("dni")}
          />
          <div className="mb-5">
            <Label>Día</Label>
            <Input
              type="date"
              {...register("dia", {
                required: "Este campo es requerido",
                validate: {
                  isFutureDate: (value) =>
                    new Date(value) >= new Date() || "No se pueden fechas ya pasadas",
                },
              })}
            />
            {errors.dia && <p role="alert" className="text-red-500">{errors.dia.message}</p>}
          </div>
          <div className="mb-5">
            <Label>Hora</Label>
            <Input
              type="time"
              {...register("hora", { required: "La hora es requerida" })}
            />
            {errors.hora && <p role="alert" className="text-red-500">{errors.hora.message}</p>}
          </div>
          <div className="mb-5">
            <Label>Duración</Label>
            <Input
              {...register("duracion", { required: "Es un dato requerido y mínimo son 10 min", min: 10 })}
            />
            {errors.duracion && (
              <p role="alert" className="text-red-500">{errors.duracion.message}</p>
            )}
          </div>
          <button
            className="border p-2 rounded-md hover:bg-gray-500 hover:text-black hover:font-semibold w-full mt-5"
            type="submit"
          >
            Cargar
          </button>
        </form>
      </>
    );
  };

  return (
    <FormLateral
      title="Agregar Turno"
      descripcion="Formulario para guardar un turno para el paciente"
      formChild={<Formulario />}
      tituloAbrir="Nuevo Turno"
    />
  );
}