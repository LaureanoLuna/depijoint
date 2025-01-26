import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CabeceraProps {
  titulo: string;
  descripcion: string;
  hijoMedio?: React.ReactNode; // Cambiado a React.ReactNode para permitir más tipos de hijos
  botonAcion?: React.ReactNode; // Cambiado a React.ReactNode para permitir más tipos de hijos
}

export default function Cabecera({
  titulo,
  descripcion,
  botonAcion,
  hijoMedio,
}: CabeceraProps) {
  return (
    <Card className="flex justify-between items-center px-5">
      <CardHeader>
        <CardTitle className="text-justify text-xl uppercase flex flex-col items-center gap-2">
          <span>{titulo}</span>
          <CardDescription className="tracking-widest text-center">
            {descripcion}
          </CardDescription>
        </CardTitle>
      </CardHeader>
      <CardHeader>        
        {hijoMedio}
      </CardHeader>
      <CardHeader>
      {botonAcion} {/* Simplificado el renderizado de children */}
      </CardHeader>
    </Card>
  );
}
