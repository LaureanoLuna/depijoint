import { ReactElement } from "react";

export interface BotonProps {
    icono?: ReactElement;
    is_tooltip: boolean;
    text_tooltip?: string;
    texto?: string;
    tamaño: "icon" | "lg" | "sm" | "default";
    variante: "ghost" | "secondary" | "destructive" | "outline" | "link" | "confirm" | "alert" | "delete";
    estilo?: string;
    onClick?: () => void;
}