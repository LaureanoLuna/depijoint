import { ReactElement } from "react";

export interface BotonProps {
    icono?: ReactElement;
    tipo?:"text"|"submit" | "reset" | "button" | undefined;
    is_tooltip: boolean;
    text_tooltip?: string;
    texto?: string;
    tamaño: "icon" | "lg" | "sm" | "default";
    variante: "ghost" | "secondary" | "destructive" | "outline" | "link" | "confirm" | "alert" | "delete";
    estilo?: string;
    onClick?: () => void;
}

