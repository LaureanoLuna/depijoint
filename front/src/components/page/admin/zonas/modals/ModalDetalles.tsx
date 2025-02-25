import InputForm from "@/assets/components/InputForm";
import ModalComponent from "@/assets/components/ModalComponent";
import { Zona } from "@/assets/interfaces/zona";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useForm, Controller } from "react-hook-form";
import { FaEye } from "react-icons/fa";

export default function ModalDetalles({ zona }: { zona: Zona }) {
    const {
        tipo,
        codigo,
        nombre,
        descripcion,
        precio,
        sexo,
        tamaño,
        tiempo,
        zonaId,
        deshabilitado,
        zonaPadreId,
    } = zona;
    const {
        register,
        formState: { errors },
        control
    } = useForm<Zona>({
        defaultValues: {
            tipo,
            codigo,
            nombre,
            descripcion,
            precio,
            sexo,
            tamaño,
            tiempo,
            zonaId,
            deshabilitado,
            zonaPadreId,
        },
    });
    return (
        <ModalComponent
            botonText={<FaEye />}
            titulo={zona.nombre}
            descripcion={zona.descripcion}
            key={zona.codigo}
            estilo="w-fit "
        >
            <form>
                <div className="grid grid-cols-4 gap-2">
                    <InputForm
                        estilo="col-span-1"
                        label="Tipo"
                        name="tipo"
                        register={register}
                        type="text"
                        error={errors.tipo}
                        deshabilitado={true}
                    />
                    <InputForm
                        estilo="col-span-1"
                        label="Codigo"
                        name="codigo"
                        register={register}
                        type="text"
                        error={errors.codigo}
                        deshabilitado={true}
                    />
                    <InputForm
                        estilo="col-span-2"
                        label="Nombre"
                        name="nombre"
                        register={register}
                        type="text"
                        error={errors.nombre}
                    />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <InputForm
                        label="Precio"
                        name="precio"
                        register={register}
                        type="text"
                        error={errors.precio}
                    />
                    <InputForm
                        label="Duracion"
                        name="tiempo"
                        register={register}
                        type="text"
                        error={errors.tiempo}
                    />
                </div>
                {tipo === "C" && JSON.parse(zonaPadreId || "[]").map((z:string) => {
                    return (<h1>
                        {z}
                    </h1>
                    )
                })}
                <Controller
                    name="descripcion"
                    control={control}
                    render={({ field }) => (
                        <Label >
                            Descripcion
                            <Textarea
                                id="descripcionArticuloEdit"
                                className="resize-none"
                                {...field}
                            />
                        </Label>
                    )}
                />
                <Button type="submit" className="border p-2 rounded-md hover:bg-gray-500 hover:text-black hover:font-semibold w-full mt-5">
                    Actualizar
                </Button>
            </form>
        </ModalComponent>
    );
}
