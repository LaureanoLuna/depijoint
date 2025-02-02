import { estaDisponible } from "../function/funcionesTurnos";
import { TurnoInterface } from "../interfaces/turno";
import { Zona } from "../interfaces/zona";
import useContratacionAccion from "./useContratacionAccion";
import usePacienteAccion from "./usePacienteAccion";

/**
 * Hook personalizado para manejar acciones relacionadas con turnos.
 */
const useTurnoAccion = () => {
    const { getContratacion } = useContratacionAccion();
    const { getPaciente } = usePacienteAccion();

    /**
     * Obtiene todos los turnos almacenados en el localStorage.
     * @returns Un arreglo de objetos TurnoInterface.
     */
    const getTurnos = (): TurnoInterface[] => {
        const turnosJson = localStorage.getItem("turnos") || "[]";
        return JSON.parse(turnosJson);
    };

    /**
     * Almacena un nuevo turno en el localStorage.
     * @param turno - El objeto TurnoInterface que se desea almacenar.
     * @returns true si se almacenó con éxito, false en caso contrario.
     */
    const setTurnos = (turno: TurnoInterface): boolean => {
        try {
            const turnos = getTurnos();
            turnos.push(turno);
            localStorage.setItem("turnos", JSON.stringify(turnos));
            return true;
        } catch (error) {
            console.error("Error al guardar los turnos:", error);
            return false;
        }
    };

    const validaTurno = (turno: TurnoInterface) => {
        const turnos = getTurnos().filter((t) => t.dia === turno.dia);
        return estaDisponible(turno.hora, Number.parseInt(turno.duracion), turnos);
    }

    /**
     * Agrega un nuevo turno después de validar la contratación y el paciente.
     * @param data - Datos necesarios para crear el nuevo turno.
     * @returns Una promesa que resuelve a true si se agregó el turno, false en caso de error.
     */
    const agregarTurno = async (data: any): Promise<boolean> => {
        try {
            const contratacion = await getContratacion(data.dni);
            if (!contratacion) {
                throw new Error("No existe la contratación");
            }

            const paciente = await getPaciente(contratacion.pacienteDni);
            if (!paciente) {
                throw new Error("No se encontró el paciente");
            }

            const tiempo = contratacion.zonas.reduce((total, zona: Zona) => total + zona.tiempo, 0);
            const costo = contratacion.zonas.reduce((total, zona: Zona) => total + zona.precio, 0);

            const turnoNuevo: TurnoInterface = {
                id: "21", // Considerar generar un ID único dinámicamente
                dia: data.dia,
                hora: data.hora,
                duracion: tiempo.toFixed(), // Considerar hacer que la duración sea dinámica
                tiempo: tiempo ?? 0,
                paciente: paciente,
                monto: costo ?? 0,
                estado: false,
            };

            if (!validaTurno(turnoNuevo)) return false;
            return setTurnos(turnoNuevo);
        } catch (error) {
            console.error("Error al agregar el turno:", error);
            return false; // Retornar false en caso de error
        }
    };

    return {
        agregarTurno,
    };
};

export default useTurnoAccion;