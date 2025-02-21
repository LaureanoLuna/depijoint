import InputForm from "@/assets/components/InputForm";
import Seleccion from "@/assets/components/Seleccion";
import { LIST_TIPO } from "@/assets/constant/LIST_TIPOZONA";
import { Zona } from "@/assets/interfaces/zona";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useZonaContext } from "./context/ZonaContext";

export default function Formulario() {
  const [tipo, setTipo] = useState<string | undefined>(undefined);
  const { addZona } = useZonaContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
    reset,
  } = useForm<Zona>();

  const onSubmit: SubmitHandler<Zona> = async () => {

    if (!tipo) return;
    setValue("tipoId", tipo);
    console.log(watch());
    
    addZona(watch());
    reset();

    //const success = await AddZona(data);
    //if (success) reset();
  };

  return (
    <Card className="mt-3 py-4 px-2">
      <form action="" onSubmit={handleSubmit(onSubmit)} className="px-2">
        <div className="flex items-center gap-1 uppercase ">
          <Seleccion
            opciones={LIST_TIPO.map((tipo) => tipo.tipo)}
            titulo="Tipo"
            name="tipozona"
            funccion={(w: any) => {
              setTipo(w);
            }}
          />
          {tipo && (
            <h2 className="tracking-widest italic w-full text-center">
              {LIST_TIPO.find((f) => f.tipo === tipo)?.descripcion}{" "}
            </h2>
          )}
        </div>
        <div className="md:grid grid-cols-3 gap-2">
          <InputForm
            label="Codigo"
            type="text"
            register={register}
            name="codigo"
            required={true}
            error={errors.codigo}
          />
          <InputForm
            label="Nombre"
            estilo="col-span-2"
            type="text"
            register={register}
            name="nombre"
            required={true}
            error={errors.nombre}
          />
        </div>
        <Controller
          name="descripcion"
          control={control}
          render={({ field }) => (
            <Label htmlFor="descripcionArticulo">
              Descripcion
              <Textarea id="descripcionArticulo" className="resize-none" {...field} />
            </Label>
          )}
        />
        <div className="flex justify-between items-center gap-2">
          <InputForm
            label="Precio"
            type="text"
            register={register}
            name="precio"
            required={true}
            error={errors.precio}
          />
          <InputForm
            label="Tiempo"
            type="text"
            register={register}
            name="tiempo"
            required={true}
            error={errors.tiempo}
          />
        </div>
        <div className="flex items-start justify-around">
          <Controller
            name="sexo"
            defaultValue="M"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Label htmlFor="contentCheckGeneroZona" className="my-2">
                Genero
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={"M"}
                  id="contentCheckGeneroZona"
                  className="p-2"
                  {...field}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="M" id="checkZonaGM" />
                    <Label htmlFor="checkZonaGM">Mujer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="H" id="checkZonaH" />
                    <Label htmlFor="checkZonaH">Hombre</Label>
                  </div>
                </RadioGroup>
                {errors.sexo && (
                  <p role="alert" className="text-xs text-red-500">
                    {errors.sexo.message}
                  </p>
                )}
              </Label>
            )}
          />
          <Controller
            name="tamaño"
            defaultValue="C"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Label htmlFor="contentCheckTamaZona" className="my-2">
                Tamaño
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={"C"}
                  id="contentCheckTamaZona"
                  className="p-2"
                  {...field}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="C" id="checkZonaTC" />
                    <Label htmlFor="checkZonaC">Chico</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="M" id="checkZonaTM" />
                    <Label htmlFor="checkZonaTM">Medio</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="G" id="checkZonaTG" />
                    <Label htmlFor="checkZonaTG">Grande</Label>
                  </div>
                </RadioGroup>
              </Label>
            )}
          />
        </div>
        <Button
          className="border p-2 rounded-md hover:bg-gray-500 hover:text-black hover:font-semibold w-full mt-5"
          type="submit"
        >
          Cargar
        </Button>
      </form>
    </Card>
  );
}
