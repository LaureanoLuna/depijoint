import { FormLateral } from "@/assets/components/FormLateral";
import { Paciente } from "@/assets/interfaces/paciente";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";

export default function AddPaciente() {
  return (
    <FormLateral
      title="Alta Paciente"
      descripcion="Formulario para agendar un nuevo paciente"
      tituloAbrir="Agendar Paciente"
      formChild={<Formulario />}
    />
  );

  function Formulario() {
    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm<Paciente>();

    return (
      <form id="formAddPaciente">
        <div>
          <Label>
            Nombre
            <Input
              type={"text"}
              {...register("nombre", {
                required: "Dato Requerido",
                validate: {
                  onchange: (value) =>
                    new RegExp(/[a-zA-Z]/).test(value) || "Formato Incorrecto",
                },
              })}
            />
            {errors.nombre && (
              <p role="alert" className="text-xs text-red-500">
                {errors.nombre.message}
              </p>
            )}
          </Label>
        </div>
        <div>
          <Label>
            Apellido
            <Input
              type={"text"}
              {...register("apellido", {
                required: "Dato Requerido",
                validate: (value) =>
                  new RegExp(/[a-zA-Z]/).test(value) || "Formato Incorrecto",
              })}
            />
            {errors.apellido && (
              <p role={"alert"} className="text-xs text-red-500">
                {errors.apellido.message}
              </p>
            )}
          </Label>
        </div>
        <Input type={"text"} {...register("dni")} />
        <Input type={"text"} {...register("telefono")} />
        <Input type={"text"} {...register("email")} />
        <Input type={"text"} {...register("fechaNac")} />
        <Input type={"text"} {...register("direccion")} />
      </form>
    );
  }
}
