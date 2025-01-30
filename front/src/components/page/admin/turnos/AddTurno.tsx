import { TurnoAdd } from "@/assets/interfaces/turno";
import { useForm, SubmitHandler } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormLateral } from "@/assets/components/FormLateral";

import { PersonaSearch } from "@/assets/interfaces/persona";
import InputSearch from "./InputSearch";
import usePacienteAccion from "@/hooks/usePacienteAccion";

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
  } = useForm<TurnoAdd, PersonaSearch>({
    defaultValues: {
      duracion: "",
      dia: refactoriDate(new Date()),
    },
  });

  const { paciente, buscaPaciente } = usePacienteAccion();

  const onSubmit: SubmitHandler<TurnoAdd> = (data) => console.log(data);

  const Formulario = () => {
    return (
      <>
        <InputSearch
          funcion={buscaPaciente}
          inputName="dni"
          placeholder="Ingrese el DNI"
        />
        <form onSubmit={handleSubmit(onSubmit)} className="p-5">
          <div className="grid grid-rows-2 mb-2">
            <span className="row-span-1">{paciente?.nombre} </span>
            <span className="row-span-1 text-sm ml-2 text-slate-600">DNI: {paciente?.dni}</span>
            <span className="">{paciente?.consentimiento.tiene} </span>
          </div>
          <input type="text" name="dni" id="dniPacienteSearch" value={paciente?.dni} hidden />
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
      </>
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
