import { Colaborador } from "../interfaces/colaboradores";
import { LoginUsuario, Usuario } from "../interfaces/usuario";
import useColaboradorAccion from "./useColaboradorAccion";

const useLoginAccion = () => {
    const { getColaboradores } = useColaboradorAccion();

    const iniciaSesion = (data: LoginUsuario): boolean => {
        if (!localStorage.getItem("logueado")) {
            const usuario: Usuario = { ...data, fechaAlta: new Date(), token: "12345678", id: "1" }
            localStorage.setItem("logueado", JSON.stringify(data));
        }
        return true;
    };

    const loguear = async (data: LoginUsuario): Promise<boolean> => {
        let bool = false;


        try {
            const colaborador = await getColaboradores().find((c: Colaborador) => {
                return c.usuario === data.usuario && c.clave === data.clave;
            });

            if (!colaborador) {
                throw new Error("Usuario Invalido");
            }

            bool = iniciaSesion(data);
            return bool;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    return {
        loguear
    }
};

export default useLoginAccion;
