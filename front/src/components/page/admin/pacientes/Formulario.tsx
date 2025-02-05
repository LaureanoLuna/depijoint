import { useForm, SubmitHandler } from "react-hook-form";
import { Paciente } from "@/assets/interfaces/paciente";
import InputForm from "@/assets/components/InputForm";
import { Button } from "@/components/ui/button";
const Formulario = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Paciente>();

  const onSubmit: SubmitHandler<Paciente> = async (data) => {
    console.log(data);
  };

  return (
    <form id="formAddPaciente" onSubmit={handleSubmit(onSubmit)}>
      <InputForm
        label="Nombre"
        type="text"
        register={register}
        name="nombre"
        required={true}
        validation={(value) =>
          /^[a-zA-Z\s]+$/.test(value) || "Formato Incorrecto"
        }
        error={errors.nombre}
      />
      <InputForm
        label="Apellido"
        type="text"
        register={register}
        name="apellido"
        required={true}
        validation={(value) =>
          /^[a-zA-Z\s]+$/.test(value) || "Formato Incorrecto"
        }
        error={errors.apellido}
      />
      <InputForm
        label="DNI"
        type="text"
        register={register}
        name="dni"
        required={true}
        validation={(value) => /^[0-9]+$/.test(value) || "Formato Incorrecto"}
        error={errors.dni}
      />
      <InputForm
        label="Fecha de Nacimiento"
        type="date"
        register={register}
        name="fechaNac"
        required={true}
        error={errors.fechaNac}
      />
      <InputForm
        label="Teléfono"
        type="tel"
        register={register}
        name="telefono"
        required={true}
        validation={(value) => /^[0-9]+$/.test(value) || "Formato Incorrecto"}
        error={errors.telefono}
      />
      <InputForm
        label="Email"
        type="email"
        register={register}
        name="email"
        required={true}
        validation={(value) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Formato Incorrecto"
        }
        error={errors.email}
      />
      <InputForm
        label="Dirección"
        type="text"
        register={register}
        name="direccion"
        required={true}
        error={errors.direccion}
      />
      <InputForm
        label="Consentimiento"
        type="file"
        register={register}
        name="consentimiento"
        error={errors.consentimiento?.tiene}
      />
      <Button
        className="border p-2 rounded-md hover:bg-gray-500 hover:text-black hover:font-semibold w-full mt-5"
        type="submit"
      >
        Cargar
      </Button>
    </form>
  );
};

export default Formulario;
