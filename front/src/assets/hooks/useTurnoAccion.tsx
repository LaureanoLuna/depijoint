import { Contratacion } from "../interfaces/contratacion";
import { Turno, TurnoInterface } from "../interfaces/turno";
import useContratacionAccion from "./useContratacionAccion";
import usePacienteAccion from "./usePacienteAccion";

const useTurnoAccion = () => {
    const { getContratacion, calcularTiempoSesion, calcularPrecioSesion } = useContratacionAccion();
    const { getPaciente } = usePacienteAccion();

    const getTurnos = async (): Promise<TurnoInterface[]> => {
        const storedTurnos = localStorage.getItem("turnos");
        return storedTurnos ? JSON.parse(storedTurnos) : [];
    };

    const setTurnos = (turnos: TurnoInterface[]) => {
        localStorage.setItem('turnos', JSON.stringify(turnos));
    };

    const createTurno = async (turnoData: any, contratacion: Contratacion, paciente: any, tiempo: number, precio: number): Promise<Turno> => {
        return {
            id: ((await getTurnos()).length + 1).toString(),
            contratacion_id: contratacion.contratacionId,
            duracion: tiempo.toString(),
            precio: precio,
            dia: turnoData.dia,
            hora: turnoData.hora,
            estado: false,
            paciente_dni: turnoData.dni,
            paciente_nombre: `${paciente.nombre}, ${paciente.apellido}`,
            paciente: paciente,
            fecha_creacion: new Date(),
        };
    };

    const addTurno = async (turnoData: any): Promise<boolean> => {
        
        const turnos: TurnoInterface[] = await getTurnos();
        const contratacion = await getContratacion(turnoData.dni);
        if (!contratacion) return false;
        
        const paciente = await getPaciente(turnoData.dni);
        console.log(paciente);
        if (!paciente) return false;

        const precio = await calcularPrecioSesion(turnoData.dni);
        const tiempo = await calcularTiempoSesion(turnoData.dni);

        const nuevoTurno = await createTurno(turnoData, contratacion, paciente, tiempo ?? 0, precio ?? 0);
        turnos.push(nuevoTurno);
        setTurnos(turnos);
        return true;
    };

    return { getTurnos, addTurno };
};

export default useTurnoAccion;