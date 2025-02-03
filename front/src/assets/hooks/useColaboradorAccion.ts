import { Colaborador } from "../interfaces/colaboradores"


const useColaboradorAccion = () => {

    const getColaboradores = () => {
        const colaboradores:Colaborador[] = JSON.parse(localStorage.getItem('colaboradores') || "[]")
        return colaboradores;
    }
    return { getColaboradores }
}

export default useColaboradorAccion;