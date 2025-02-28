import InputForm from "@/assets/components/InputForm";
import ModalComponent from "@/assets/components/ModalComponent";
import { Zona } from "@/assets/interfaces/zona";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { useZonaContext } from "../context/ZonaContext";
import ModalCombo from "./ModalCombo";
import useZonaAccion from "@/assets/hooks/useZonaAccion";
import { calcularPrecio, calcularTiempo } from "@/assets/function/funcionesZonas";
// Hook personalizado para manejar la lógica del formulario
const useZonaForm = (zona: Zona) => {
    const { register, formState: { errors }, watch, setValue, control, handleSubmit } = useForm<Zona>({
        defaultValues: { ...zona }
    });
    return { register, errors, watch, setValue, control, handleSubmit };
};
/**
 * Componente ModalDetalles
 * Este componente muestra un modal que permite editar los detalles de una zona.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Zona} props.zona - Objeto que contiene la información de la zona a editar.
 * 
 * @returns {JSX.Element} - El componente ModalDetalles.
 */
export default function ModalDetalles({ zona }: { zona: Zona }) {
    const { handleEstadoZona, updateZona } = useZonaContext();
    const { getZonas } = useZonaAccion();
    const { register, errors, watch, setValue, control, handleSubmit } = useZonaForm(zona);
    const actualizarZonasSeleccionadas = async (zonasElegidas: string[]) => {
        const allZonas = await getZonas();
        const zonas = zonasElegidas
            .map((i: string) => allZonas.find((z) => z.zonaId === parseInt(i)))
            .filter(Boolean);
        if (zonas.length > 0 ) {
            const validZonas = zonas.filter((zona): zona is Zona => zona !== undefined);
            setValue("precio", calcularPrecio(validZonas));
            setValue("tiempo", calcularTiempo(validZonas));
        }
        setValue("zonaPadreId", JSON.stringify(zonasElegidas));
    };
    const onSubmit: SubmitHandler<Zona> = async () => {
        updateZona(watch());
    };
    return (
        <ModalComponent
            botonText={<FaEye />}
            titulo={zona.nombre}
            descripcion={zona.descripcion}
            key={zona.codigo}
            estilo="w-full"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
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
                        label="Código"
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
                {zona.tipo==="C" && <ModalCombo 
                    agregarZonas={actualizarZonasSeleccionadas} 
                    zonasSeleccionadas={JSON.parse(zona.zonaPadreId || "[]")} 
                />}
                <div className="grid grid-cols-2 gap-2">
                    <InputForm
                        label="Precio"
                        name="precio"
                        register={register}
                        type="text"
                        error={errors.precio}
                    />
                    <InputForm
                        label="Duración"
                        name="tiempo"
                        register={register}
                        type="text"
                        error={errors.tiempo}
                    />
                </div>
                <Controller
                    name="descripcion"
                    control={control}
                    render={({ field }) => (
                        <Label>
                            Descripción
                            <Textarea
                                id="descripcionArticuloEdit"
                                className="resize-none"
                                {...field}
                            />
                        </Label>
                    )}
                />
                <Button
                    type="submit"
                    className="border p-2 rounded-md hover:bg-gray-500 hover:text-black hover:font-semibold w-full mt-5"
                >
                    Actualizar
                </Button>
            </form>
            {zona.deshabilitado ? (
                <Button
                    type="button"
                    variant={"confirm"}
                    className="border p-2 rounded-md hover:bg-green-500 hover:text-white hover:font-semibold w-full"
                    onClick={() => handleEstadoZona(zona.zonaId, "habilita")}
                >
                    Habilitar
                </Button>
            ) : (
                <Button
                    type="button"
                    variant={"delete"}
                    className="border p-2 rounded-md hover:bg-red-500 hover:text-white hover:font-semibold w-full"
                    onClick={() => handleEstadoZona(zona.zonaId, "deshabilita")}
                >
                    Deshabilitar
                </Button>
            )}
        </ModalComponent>
    );
}