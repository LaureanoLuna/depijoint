import { useNavigate } from "react-router-dom";
import { Colaborador } from "../interfaces/colaboradores";
import { LoginUsuario, Usuario } from "../interfaces/usuario";
import useColaboradorAccion from "./useColaboradorAccion";

const useLoginAccion = () => {
    const { getColaboradores } = useColaboradorAccion();

    const getUsuario = (): Usuario | null => {
        const usuario = localStorage.getItem('logueado');
        return usuario ? JSON.parse(usuario) : null;
    }

    const isLogin = () => {
        const usuario = getUsuario();
        if (!usuario) {
            return undefined;
        }
        return usuario;
    }

    const iniciaSesion = (data: Colaborador): boolean => {
        const { usuario, colaboradorId, dni, nombre, clave } = data;

        if (!localStorage.getItem("logueado")) {
            const user: Usuario = {
                clave: clave,
                usuario: usuario,
                nombre: nombre,
                fechaAlta: new Date(),
                token: dni,
                id: colaboradorId.toString(),
            };
            localStorage.setItem("logueado", JSON.stringify(user));
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

            bool = iniciaSesion(colaborador);
            return bool;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    const cerrarSesion = async () => {
        if (localStorage.getItem('logueado')) {
            localStorage.removeItem('logueado');
            return true
        }
        return false;
    }

    return {
        loguear,
        getUsuario,
        isLogin,
        cerrarSesion
    };
};

export default useLoginAccion;
