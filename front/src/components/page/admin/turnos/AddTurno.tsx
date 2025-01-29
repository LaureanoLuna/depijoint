import React from "react";
import { TurnoAdd } from "@/assets/interfaces/turno";
import { useForm, SubmitHandler } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormLateral } from "@/assets/components/FormLateral";
import { LIST_PACIENTE } from "@/assets/constant/LIST_PACIENTES";
import { SeleccionComponente } from "@/assets/components/SeleccionComponente";
import { listaPacienteReducida } from "@/assets/function/formatearListaTurnos";
import { FormAdd } from "./FormAdd";
import { PacienteSelect } from "@/assets/interfaces/paciente";
import Seleccion from "@/assets/components/Seleccion";
import { Select } from "@/components/ui/select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";

export default function AddTurno() {
  /* Funcion para la refactirizacion de la fecha ingresada por el usuario */
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
  } = useForm<TurnoAdd>({
    defaultValues: {
      duracion: "",
      dia: refactoriDate(new Date()),
    },
  });

  const listaPacientes = listaPacienteReducida(LIST_PACIENTE);

  const [filtroPacientes, setFiltroPaciente] =
    React.useState<PacienteSelect[]>(listaPacientes);

  const handleFiltroPaciente = (
    lista: PacienteSelect[],
    input: string
  ): void => {
    const filtroPacientes = lista.filter(
      (l) =>
        l.apellido.includes(input) ||
        l.dni.includes(input) ||
        l.nombre.includes(input)
    );
    setFiltroPaciente(filtroPacientes);
  };

  const [inputFiltro, setinputFiltro] = React.useState<String>("");

  const onSubmit: SubmitHandler<TurnoAdd> = (data) => console.log(data);

  const Formulario = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="p-10">
        <div className="mb-5">
          <Input type={"text"} value={inputFiltro} onKeyDown={handleFiltroPaciente} />
          <Select onValueChange={(e) => console.log(e)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder={"Pruba"} />
            </SelectTrigger>
            <SelectContent>
              {filtroPacientes?.map((o, i) => (
                <SelectItem className="capitalize" key={i} value={o.dni}>
                  {o.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-5">
          <Label>Dia</Label>
          <Input
            {...register("dia", {
              required: true,
              min: refactoriDate(new Date()),
            })}
            type="date"
          />
          {errors.dia && <p role="alert">No se pueden fechas ya pasadas</p>}
        </div>
        <div className="mb-5">
          <Label>Hora</Label>
          <Input
            {...register("hora", { required: true, min: "08:00" })}
            type="time"
          />
          {errors.hora && <p role="alert">La hora es requerida</p>}
        </div>
        <div className="mb-5">
          <Label>Duracion</Label>
          <Input {...register("duracion", { required: true, min: 10 })} />
          {errors.duracion && (
            <p role="alert">Es un dato requerido y minimo son 10 min</p>
          )}
        </div>

        <input
          className=" border p-2 rounded-md hover:bg-gray-500 hover:text-black hover:font-semibold w-full mt-5"
          value={"cargar"}
          type="submit"
          onClick={() => {
            setValue("estado", false);
          }}
        />
      </form>
    );
  };

  return (
    <>
      <FormLateral
        title="Agregar Tunro"
        descripcion="Formulario para guardar un turno para el paciente"
        formChild={<Formulario />}
        tituloAbrir="Nuevo Turno"
      />
    </>
  );
}
