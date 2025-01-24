import { TurnoAdd } from "@/assets/interfaces/turno";
import { useForm, SubmitHandler } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormLateral } from "@/assets/components/FormLateral";
import { Paciente } from "@/assets/interfaces/paciente";

const PACIENTES_LIST: Paciente[] = [
  {
    id: 1,
    nombre: "Laureano",
    dni: "38232325",
    apellido: "luna",
    consentimiento: { tiene: false },
    direccion: "Nahuel 696",
    email: "Laureano@gmail.com",
    fechaNac: new Date("19940622"),
    telefono: "123456789",
  },
  {
    id: 2,
    nombre: "Antonella",
    dni: "36841599",
    apellido: "luna",
    consentimiento: { tiene: false },
    direccion: "Nahuel 696",
    email: "Laureano@gmail.com",
    fechaNac: new Date("19940622"),
    telefono: "123456789",
  },
  {
    id: 3,
    nombre: "Oscar",
    dni: "13599001",
    apellido: "luna",
    consentimiento: { tiene: false },
    direccion: "Nahuel 696",
    email: "Laureano@gmail.com",
    fechaNac: new Date("19940622"),
    telefono: "123456789",
  },
  {
    id: 4,
    nombre: "Tachi",
    dni: "16852699",
    apellido: "luna",
    consentimiento: { tiene: false },
    direccion: "Nahuel 696",
    email: "Laureano@gmail.com",
    fechaNac: new Date("19940622"),
    telefono: "123456789",
  },
];

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

  const onSubmit: SubmitHandler<TurnoAdd> = (data) => console.log(data);

  const Formulario = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="p-10">
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

        <div className="mb-5">
          <Label>Paciente</Label>
          <select
            {...register("paciente", { required: true })}
            className="w-full py-1.5 px-1 border-[1px] rounded-sm bg-transparent border-gray-800"
          >
            {PACIENTES_LIST.map((paciente) => {
              return (
                <option className="" key={paciente.id} value={paciente.dni}>
                  {paciente.nombre}
                </option>
              );
            })}
          </select>
          {errors.paciente && <p role="alert">El paciente es requerido</p>}
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
