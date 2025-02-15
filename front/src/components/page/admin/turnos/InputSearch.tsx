import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm, FieldValues, Path } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

interface InputSearchProps<T extends FieldValues> {
  funcion?: (data: T) => Promise<void>;
  inputName: Path<T>; // Cambia a Path<T> para que sea dinámico y seguro
  placeholder: string;
}

export default function InputSearch<T extends FieldValues>({
  funcion,
  inputName,
  placeholder,
}: InputSearchProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>();

  const onSearch: SubmitHandler<T> = async (data) => {
    if (funcion) {
      await funcion(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSearch)}
      className="grid grid-cols-4 items-start gap-1 mt-5"
    >
      <div className="col-span-3">
        <Input
          className="col-span-3 relative"
          {...register(inputName, {
            required: "Este campo es requerido",
          })}
          type="text"
          placeholder={placeholder}
        />
        {errors[inputName] && (
          <span className="text-red-500 top-full left-0">
            {errors[inputName]?.message?.toString()}
          </span>
        )}
      </div>
      <Button
        className="w-full"
        type="submit"
        size={"icon"}
        variant={"outline"}
      >
        <FaSearch />
      </Button>
    </form>
  );
}