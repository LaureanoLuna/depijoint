import InputForm from "@/assets/components/InputForm";
import Seleccion from "@/assets/components/Seleccion";
import { LIST_TIPO } from "@/assets/constant/LIST_TIPOZONA";
import { useDepiJoint } from "@/assets/context/DepiJointContexto";
import { TipoZona } from "@/assets/interfaces/tipoZona";
import { Zona } from "@/assets/interfaces/zona";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Formulario() {
  const [tipo, setTipo] = useState<string | undefined>(undefined);
  const {} = useDepiJoint();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Zona>();

  const onSubmit: SubmitHandler<Zona> = async (data) => {
    const success = await AddZona(data);
    if (success) reset();
  };

  return (
    <Card className="mt-3 py-4 px-2">
      <form action="" onSubmit={handleSubmit(onSubmit)} className="px-2">
        <div className="flex items-center gap-4 uppercase ">
          <Seleccion
            opciones={LIST_TIPO.map((tipo) => tipo.tipo)}
            titulo="Tipo"
            name="tipozona"
            funccion={(w: any) => {
              setTipo(w);
            }}
          />
          {tipo && (
            <span className="tracking-widest italic">
              {LIST_TIPO.find((f) => f.tipo === tipo)?.descripcion}{" "}
            </span>
          )}
        </div>
        <InputForm
          label="Codigo"
          type="text"
          register={register}
          name="codigo"
          required = {true}
          error={errors.codigo}
        />
        <InputForm
          label="Nombre"
          type="text"
          register={register}
          name="nombre"
          required = {true}
          error={errors.nombre}
        />
        <InputForm
          label="Descripcion"
          type="text"
          register={register}
          name="descripcion"
          required = {true}
          error={errors.descripcion}
        />
        <InputForm
          label="Precio"
          type="money"
          register={register}
          name="precio"
          required = {true}
          error={errors.precio}
        />
        <InputForm
          label="Tiempo"
          type="text"
          register={register}
          name="codigo"
          required = {true}
          error={errors.tiempo}
        />
        <InputForm
          label="Genero"
          type="radio"
          register={register}
          name="genero"
          required = {true}
          error={errors.sexo}
        />
        <InputForm
          label="Genero"
          type="radio"
          register={register}
          name="genero"
          required = {true}
          error={errors.sexo}
        />
      </form>
    </Card>
  );
}
