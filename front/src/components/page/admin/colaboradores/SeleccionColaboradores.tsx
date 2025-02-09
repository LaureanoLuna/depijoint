import { Colaborador } from "@/assets/interfaces/colaboradores";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SeleccionColaboradores({
  opciones,
  titulo,
  funccion,
  name,
  deshabilitado = false
}: {
  opciones: Colaborador[];
  titulo: string;
  funccion: any;
  name?: string;
  deshabilitado:boolean
}) {
  return (
    <Select onValueChange={funccion} name={name} disabled={deshabilitado}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder={titulo} />
      </SelectTrigger>
      <SelectContent>
        {opciones?.map((o, i) => (
          <SelectItem
            className="capitalize"
            key={i}
            value={o.colaboradorId.toString()}
          >
            {o.nombre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
