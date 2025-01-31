import { useState } from "react";
import { Contratacion } from "../interfaces/contratacion";

const useContratacionAccion = () => {
    const [contratacion, setContratacion] = useState<Contratacion | undefined>(
        undefined
    );

    const setContratacionAccion = (contratacion: Contratacion) => {
        setContratacion(contratacion);
    };

    const searchContratacion = (dni: string): void => {
        const contratacionLocalStorage: Contratacion[] = JSON.parse(
            localStorage.getItem("contrataciones") || "[]"
        );
        const contratacionFind = contratacionLocalStorage.find(
            (x) => x.pacienteDni === dni
        );

        if (contratacionFind) {
            setContratacion(contratacionFind);
        } else {
            setContratacion(undefined);
        }
    };

    return {
        contratacion,
        setContratacionAccion,
        searchContratacion,
    };
};

export default useContratacionAccion;