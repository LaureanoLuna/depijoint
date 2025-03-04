import InputForm from "@/assets/components/InputForm";
import Seleccion from "@/assets/components/Seleccion";
import { LIST_TIPO } from "@/assets/constant/LIST_TIPOZONA";
import { Zona } from "@/assets/interfaces/zona";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useZonaContext } from "./context/ZonaContext";
import useZonaAccion from "@/assets/hooks/useZonaAccion";
import { Input } from "@/components/ui/input";
import ModalCombo from "./modals/ModalCombo";
import {
  calcularPrecio,
  calcularTiempo,
} from "@/assets/function/funcionesZonas";
import { TipoZona } from "@/assets/interfaces/tipoZona";
export default function Formulario() {
  const [tipo, setTipo] = useState<string | undefined>(undefined);
  const [datos, setDatos] = useState<TipoZona[] | undefined>();
  const [precio, setPrecio] = useState<number>(0);
  const [tiempo, setTiempo] = useState<number>(0);
  const { getNuevoCodigo, getZonas, getTipoArticulo } = useZonaAccion();
  const { addZona } = useZonaContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
    reset,
  } = useForm<Zona>({ defaultValues: { codigo: tipo } });
  const onSubmit: SubmitHandler<Zona> = async () => {
    if (!tipo) return;
    setValue("tipo", tipo);
    if (tipo === "C") {
      setValue("precio", precio);
      setValue("tiempo", tiempo);
    }
    addZona(watch());
    reset();
  };
  const actualizarZonasSeleccionadas = (zonasElegidas: string[]) => {
    setValue("zonaPadreId", JSON.stringify(zonasElegidas));
  };

  const tiposArticulos = async () => {
    const tipoZona= await getTipoArticulo(); // funcion get de axios
    setDatos(tipoZona)
  };
  const calcularValores = async () => {
    if (tipo !== "C") return;
    const allZonas = await getZonas();
    const indexZonas = JSON.parse(watch("zonaPadreId") || "[]");
    const zonas = indexZonas
      .map((i: number) => allZonas.find((z) => z.zonaId === i))
      .filter(Boolean);
    if (zonas.length > 0) {
      setPrecio(calcularPrecio(zonas));
      setTiempo(calcularTiempo(zonas));
    }
  };
  useEffect(() => {
    calcularValores();
  }, [watch("zonaPadreId"), tipo]);
  useEffect(() => {
    tiposArticulos();
  }, []);
  return (
    <Card className="mt-3 py-4 px-2">
      <form onSubmit={handleSubmit(onSubmit)} className="px-2">
        <div className="flex items-center gap-1 uppercase ">
          <Seleccion
            opciones={datos?.map((tipo) => tipo.tipo) ?? []}
            titulo="Tipo"
            name="tipozona"
            funccion={setTipo}
          />
          {tipo && (
            <h2 className="tracking-widest italic w-full text-center">
              {datos?.find((f) => f.tipo === tipo)?.nombre}
            </h2>
          )}
        </div>
        <div className="md:grid grid-cols-3 gap-2">
          <div className="col-span-1 my-2">
            <Label>
              Codigo
              <Input
                type="text"
                value={tipo ? getNuevoCodigo(tipo) : ""}
                {...register("codigo", { required: true })}
              />
              {errors.codigo && (
                <p role="alert" className="text-xs text-red-500">
                  {errors.codigo.message}
                </p>
              )}
            </Label>
          </div>
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
              <Textarea
                id="descripcionArticulo"
                className="resize-none"
                {...field}
              />
            </Label>
          )}
        />
        {tipo === "C" ? (
          <>
            <ModalCombo agregarZonas={actualizarZonasSeleccionadas} />
            <div className="flex justify-between items-center gap-2">
              <div>
                <Label>Precio</Label>
                <Input
                  type="number"
                  value={precio}
                  onChange={(e) => setPrecio(Number(e.target.value))}
                />
              </div>
              <div>
                <Label>Duración</Label>
                <Input
                  type="number"
                  value={tiempo}
                  onChange={(e) => setTiempo(Number(e.target.value))}
                />
              </div>
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
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
