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
import { useDepiJoint } from "@/assets/context/DepiJointContexto";
import { estaDisponible, refactoriDate } from '../../../../assets/function/funcionesTurnos';

/**
 * Componente principal para agregar un turno.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Function} props.funcion - Función para manejar el estado externo (por ejemplo, cerrar un modal).
 * @param {boolean} props.elemento - Estado externo que controla la visibilidad o comportamiento del componente.
 * @returns {JSX.Element} - Componente de formulario para agregar un turno.
 */
export default function AddTurno() {
  return (
    <FormLateral
      title="Agregar Turno"
      descripcion="Formulario para guardar un turno para el paciente"
      formChild={<Formulario />}
      tituloAbrir="Nuevo Turno"
    />
  );

  /**
   * Componente interno que contiene el formulario para agregar un turno.
   * 
   * @returns {TSX.Element} - Formulario para agregar un turno.
   */
  function Formulario() {
    // Contexto y estado
    const { dia, turnosFiltador, addTurno } = useDepiJoint();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<TurnoAdd>();

    // Hooks personalizados
    const { paciente, buscaPaciente } = usePacienteAccion();
    const { calcularTiempoSesion, calcularPrecioSesion } = useContratacionAccion();

    // Estado local
    const [tiempo, setTiempo] = useState<number>(0);
    const [precioSesion, setPrecioSesion] = useState<string>("");

    /**
     * Efecto para calcular los datos del paciente cuando cambia el paciente o el día.
     */
    useEffect(() => {
      if (paciente) {
        setValue("dni", paciente.dni);
        calcularDatosPaciente(paciente.dni);
      }
    }, [paciente, dia]);

    /**
     * Función para calcular la duración y el precio de la sesión del paciente.
     * 
     * @param {string} dni - DNI del paciente.
     */
    const calcularDatosPaciente = async (dni: string) => {
      const tiempo = await calcularTiempoSesion(dni);
      const precio = await calcularPrecioSesion(dni);
      
      setTiempo(tiempo ?? 0);
      setPrecioSesion(precio?.toString() ?? "0");
    };

    /**
     * Función para manejar el envío del formulario.
     * 
     * @param {TurnoAdd} data - Datos del formulario.
     */
    const onSubmit: SubmitHandler<TurnoAdd> = async (data) => {
      
      const success = await addTurno(data);
    };

    return (
      <>
        {/* Buscador de paciente */}
        <InputSearch<PersonaSearch>
          funcion={buscaPaciente}
          inputName="dni"
          placeholder="Ingrese el DNI"
        />

        {/* Información del paciente */}
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
                <p className={`text-sm ${paciente.consentimiento.tiene ? 'text-green-600' : 'text-red-600'} capitalize`}>
                  Legajo {paciente.consentimiento.tiene ? <strong>completo</strong> : <strong>Sin consentimiento</strong>}
                </p>
              </div>
            </Card>
            <Card className="mb-2 p-2">
              <ListContrataciones dniPaciente={paciente.dni} />
            </Card>
          </>
        )}

        {/* Formulario para agregar un turno */}
        <Card className="p-2 my-2">
          <CardTitle>Nuevo Turno</CardTitle>
          <form id="formAddTurno" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("dni")} />

            {/* Campos del formulario */}
            <div className="grid grid-cols-2 gap-1">
              <div className="mb-5 col-span-1">
                <Label>Día</Label>
                <Input
                  type="date"
                  disabled={true}
                  value={refactoriDate(dia)}
                  {...register("dia", {
                    required: "Este campo es requerido",
                  })}
                />
                {errors.dia && <p role="alert" className="text-xs text-red-500">{errors.dia.message}</p>}
              </div>
              <div className="mb-5 col-span-1">
                <Label>Hora</Label>
                <Input
                  disabled={!paciente?.consentimiento.tiene}
                  type="time"
                  {...register("hora", {
                    required: "La hora es requerida",
                    validate: {
                      onchange: (value) => estaDisponible(value, tiempo, turnosFiltador) || "Horario Ocupado",
                    },
                  })}
                />
                {errors.hora && <p role="alert" className="text-xs text-red-500">{errors.hora.message}</p>}
              </div>
            </div>

            {/* Duración y precio de la sesión */}
            <div className="md:grid grid-cols-2 gap-2">
              <div className="mb-5">
                <Label>Duración</Label>
                <Input disabled={true} value={tiempo} />
              </div>
              <div className="mb-5">
                <Label>Precio x Sesion</Label>
                <Input disabled={true} value={precioSesion} />
              </div>
            </div>

            {/* Botón de envío */}
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
  }
}