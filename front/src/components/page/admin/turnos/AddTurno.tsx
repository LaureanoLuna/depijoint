import { TurnoAdd } from "@/assets/interfaces/turno";
import { useForm, SubmitHandler } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormLateral } from "@/assets/components/FormLateral";
import { PersonaSearch } from "@/assets/interfaces/persona";
import InputSearch from "./InputSearch";
import usePacienteAccion from "@/assets/hooks/usePacienteAccion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import ListContrataciones from "./ListContrataciones";
import useContratacionAccion from "@/assets/hooks/useContratacionAccion";
import useTurnoAccion from "@/assets/hooks/useTurnoAccion";
import { useDepiJoint } from "@/assets/context/DepiJointContexto";

import { estaDisponible } from '../../../../assets/function/funcionesTurnos';

/**
 * Componente para agregar un turno.
 * @returns Componente AddTurno.
 */
export default function AddTurno({
  funcion,
  elemento,
}: {
  funcion: any;
  elemento: boolean;
}) {
  const { dia, setDia, turnosFiltador } = useDepiJoint();
  /**
   * Función para formatear la fecha ingresada por el usuario.
   * @param date - Fecha a formatear.
   * @returns Fecha en formato 'YYYY-MM-DD'.
   */
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
    watch,
    formState: { errors },
  } = useForm<TurnoAdd>({
    defaultValues: {
      duracion: "",
      dia: refactoriDate(dia),
    },
  });

  const { paciente, buscaPaciente } = usePacienteAccion();
  const { calcularTiempoSesion, calcularPrecioSesion } =
    useContratacionAccion();
  const { agregarTurno } = useTurnoAccion();
  const [tiempo, setTiempo] = useState<number>(0);
  const [precioSesion, setPrecioSesion] = useState<string>("");
  const [reset, setReset] = useState<boolean>(false);

  /**
   * Maneja el envío del formulario.
   * @param data - Datos del formulario.
   */
  const onSubmit: SubmitHandler<TurnoAdd> = async (data) => {
    (await agregarTurno(data)) ? funcion(!elemento) : console.log("no dio");
  };

  /**
   * Componente interno para el formulario.
   * @returns Formulario para agregar un turno.
   */
  const Formulario = () => {
    useEffect(() => {
      let y = 0;
      let x = "0";
      const fetchData = async () => {
        if (paciente) {
          setValue("dni", paciente.dni);
          y = (await calcularTiempoSesion(paciente.dni)) ?? 0;
          x = ((await calcularPrecioSesion(paciente.dni)) ?? "0").toString();

          setTiempo(y);
          setPrecioSesion(x);
        }
      };
      fetchData();
    }, [paciente, setValue, reset, dia]);

    return (
      <>
        <InputSearch<PersonaSearch>
          funcion={buscaPaciente}
          inputName="dni"
          placeholder="Ingrese el DNI"
        />

        {paciente && (
          <>
            <Card className="my-2 p-2">
              <CardTitle className="text-center">
                {paciente.nombre}, {paciente.apellido}
                <CardDescription className="text-center text-sm ml-2 text-slate-600">
                  <small>DNI:</small> {paciente.dni}
                </CardDescription>
              </CardTitle>
              <div className="text-center">
                {paciente.consentimiento.tiene ? (
                  <p className="text-sm text-green-600 capitalize">
                    Legajo <strong>completo</strong>
                  </p>
                ) : (
                  <p className="text-sm text-red-600 capitalize">
                    Legajo Sin <strong>consentimiento</strong>
                  </p>
                )}
              </div>
            </Card>
            <Card className="mb-2 p-2">
              <ListContrataciones dniPaciente={paciente.dni} />
            </Card>
          </>
        )}

        <Card className="p-2 my-2">
          <CardTitle>Nuevo Turno</CardTitle>
          <form id="formAddTurno" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("dni")} />

            <div className="grid grid-cols-2 gap-1">
              <div className="mb-5 col-span-1">
                <Label>Día</Label>
                <Input
                  disabled={!paciente?.consentimiento.tiene}
                  type="date"
                  {...register("dia", {
                    required: "Este campo es requerido",
                    validate: {
                      isFutureDate: (value) =>
                        new Date(value) > new Date() ||
                        "No se pueden fechas ya pasadas",
                    },
                  })}
                />
                {errors.dia && (
                  <p role="alert" className="text-red-500">
                    {errors.dia.message}
                  </p>
                )}
              </div>
              <div className="mb-5 col-span-1">
                <Label>Hora</Label>
                <Input
                  disabled={!paciente?.consentimiento.tiene}
                  type="time"
                  {...register("hora", {
                    required: "La hora es requerida",
                    validate: {
                      onchange: (e) => {
                        return estaDisponible(e,tiempo,turnosFiltador) || "Horario Ocupado"
                      },
                    },
                  })}
                />
                {errors.hora && (
                  <p role="alert" className="text-red-500">
                    {errors.hora.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="mb-5">
                <Label>Duración</Label>
                <Input disabled={true} defaultValue={tiempo} />
                {errors.duracion && (
                  <p role="alert" className="text-red-500">
                    {errors.duracion.message}
                  </p>
                )}
              </div>
              <div className="mb-5">
                <Label>Precio x Sesion</Label>
                <Input disabled={true} defaultValue={precioSesion} />
                {errors.duracion && (
                  <p role="alert" className="text-red-500">
                    {errors.duracion.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              disabled={!paciente?.consentimiento.tiene}
              className="border p-2 rounded-md hover:bg-gray-500 hover:text-black hover:font-semibold w-full mt-5"
              type="submit"
            >
              Cargar
            </Button>
          </form>
        </Card>
      </>
    );
  };

  return (
    <FormLateral
      title="Agregar Turno"
      descripcion="Formulario para guardar un turno para el paciente"
      formChild={<Formulario />}
      tituloAbrir="Nuevo Turno"
    />
  );
}
