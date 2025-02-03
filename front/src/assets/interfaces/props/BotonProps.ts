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

const botonesDropdown: BotonProps[] = [
    {
      variante: "confirm",
      tamaño: "sm",
      estilo: "w-full",
      texto: "confirmar",
      is_tooltip: false,
    },
    {
      variante: "alert",
      estilo: "w-full",
      tamaño: "sm",
      texto: "editar",
      is_tooltip: false,
    },
    {
      variante: "delete",
      estilo: "w-full",
      tamaño: "sm",
      texto: "cancelar",
      is_tooltip: false,
    },
  ];