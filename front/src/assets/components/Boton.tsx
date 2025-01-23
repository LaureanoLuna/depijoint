import { ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Props {
    icono?: ReactElement;
    is_tooltip: boolean; // Cambié a boolean en lugar de false
    text_tooltip?: string; // Cambié String a string
    texto?: string; // Cambié String a string
    tamaño: 'icon' | 'lg' | 'sm' | 'default';
    variante: 'ghost' | 'secondary' | 'destructive' | 'outline' | 'link';
    estilo: string; // Cambié String a string
    onClick?: () => void;
}

export default function Boton({ prop }: { prop: Props }) {
    const buttonElement = (
        <Button
            onClick={prop.onClick}
            variant={prop.variante}
            size={prop.tamaño}
            className={`hover:cursor-pointer mx-1 ${prop.estilo} border-4 border-transparent`}
        >
            {prop.icono} {prop.texto}
        </Button>
    );

    return prop.is_tooltip ? (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>{buttonElement}</TooltipTrigger>
                <TooltipContent>
                    {prop.text_tooltip}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    ) : (
        buttonElement
    );
}
