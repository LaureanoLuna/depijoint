import { Asignado } from "../interfaces/asignado";
import { TurnoLista } from "../interfaces/turno";

export default function useAsignadoAccion() {
    const getTurnosAsignados = (colaboradorId: string): Asignado[] => {
        const asignados = localStorage.getItem("asignados");
        return !asignados
            ? []
            : JSON.parse(asignados).filter(
                (a: Asignado) => a.colaboradorId === colaboradorId
            );
    };

    const asignarTurno = (turno: TurnoLista): boolean => {
        let bool = false;

        try {
            if (!turno || !turno.colaboradorId) {
                throw new Error("Faltan datos: turno o colaboradorId");
            }

            const { id, colaboradorId, duracion, hora, nombre } = turno;
            const asignacion: Asignado = {
                id: "1", // Considera usar un ID único real
                turnoId: id,
                nombre: nombre,
                hora: hora,
                colaboradorId: colaboradorId,
                tiempo: duracion,
                estado: false,
                fechaAlta: new Date(),
                fechaBaja: null,
            };

            const local = JSON.parse(localStorage.getItem("asignados") || "[]");
            local.push(asignacion);
            localStorage.setItem("asignados", JSON.stringify(local));
            bool = true;
        } catch (error) {
            console.error("Error al asignar turno:", error);
            bool = false;
        }

        return bool;
    };

    return { asignarTurno, getTurnosAsignados };
}
