import { ReactElement, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BotonProps {
  icono?: ReactElement;
  is_tooltip: boolean;
  text_tooltip?: string;
  texto?: string;
  tamaño: "icon" | "lg" | "sm" | "default";
  variante: "ghost" | "secondary" | "destructive" | "outline" | "link" | "confirm" | "alert" | "delete";
  estilo?: string;
  onClick?: () => void;
}

const Boton = forwardRef<HTMLButtonElement, { prop: BotonProps }>(
  ({ prop }, ref) => {
    const buttonElement = (
      <Button
        ref={ref} // Pasar la ref al Button
        asChild
        onClick={prop.onClick}
        variant={prop.variante}
        size={prop.tamaño}
        className={`hover:cursor-pointer mx-1 ${prop.estilo} border-4 border-transparent`}
      >
        <div>
          {prop.icono} {prop?.texto}
        </div>
      </Button>
    );

    return prop.is_tooltip ? (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{buttonElement}</TooltipTrigger>
          <TooltipContent>{prop.text_tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : (
      buttonElement
    );
  }
);

export default Boton;