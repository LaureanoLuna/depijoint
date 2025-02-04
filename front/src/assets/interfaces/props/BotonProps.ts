import { ReactElement } from "react";

export interface BotonProps<T = any> {
    icono?: ReactElement;
    tipo?: "text" | "submit" | "reset" | "button" | undefined;
    is_tooltip: boolean;
    text_tooltip?: string;
    texto?: string;
    tamaño: "icon" | "lg" | "sm" | "default";
    variante: "ghost" | "secondary" | "destructive" | "outline" | "link" | "confirm" | "alert" | "delete";
    estilo?: string;
    onClick?: (data: T) => void; // Usamos T aquí
}

