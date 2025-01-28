import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CabeceraProps {
  titulo: string;
  descripcion: string;
  contenidoMedio?: React.ReactNode; // Cambiado a React.ReactNode para permitir más tipos de hijos
  botonAccion?: React.ReactNode; // Cambiado a React.ReactNode para permitir más tipos de hijos
}

export default function Cabecera({
  titulo,
  descripcion,
  botonAccion,
  contenidoMedio,
}: CabeceraProps) {
  return (
    <Card className="grid grid-cols-2 gap-2 md:flex flex-col-reverse md:flex-row justify-between items-center">
      <CardHeader className="hidden md:block">
        <CardTitle className="text-start text-xl uppercase md:flex flex-col items-start gap-2">
          <span>{titulo}</span>
          <CardDescription className="tracking-widest text-center ">
            {descripcion}
          </CardDescription>
        </CardTitle>
      </CardHeader>
      <CardHeader >        
        {contenidoMedio}
      </CardHeader>
      <CardHeader>
      {botonAccion} {/* Simplificado el renderizado de children */}
      </CardHeader>
    </Card>
  );
}
