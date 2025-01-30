
import { PersonaSearch } from "@/assets/interfaces/persona";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

export default function InputSearch({
  funcion,
  inputName,
  placeholder,
}: {
  funcion?: (data: PersonaSearch) => Promise<void>;
  inputName: any;
  placeholder: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonaSearch>();

  const onSearchPaciente: SubmitHandler<PersonaSearch> = async (data) => {
    //console.log(data);
    if (funcion) {
      await funcion(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSearchPaciente)}
      className="grid grid-cols-4 items-center gap-1 mt-5"
    >
      <Input
        className="col-span-3"
        {...register(inputName, {
          required: "El DNI es requerido",
        })}
        type="text"
        placeholder={placeholder}
      />
      {errors.dni && <span className="text-red-500">{errors.dni.message}</span>}
      <Button className="w-full" type="submit" size={"icon"} variant={"outline"}>
        <FaSearch />
      </Button>
    </form>
  );
}