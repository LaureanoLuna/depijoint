import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ModalComponent({
  botonText,
  titulo,
  descripcion,
  children,
}: {
  children: React.ReactNode;
  titulo: string;
  descripcion: string;
  botonText: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">{botonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {/* Titulo del Modal */}
        <DialogHeader>
          <DialogTitle>{titulo}</DialogTitle>
          {/* Descripcion de Titulo del Modal */}
          <DialogDescription>{descripcion}</DialogDescription>
        </DialogHeader>
        {/* Cuerpo Hijo del Modal */}
        {children}
        {/* <DialogFooter>
          <Button type="submit">Guardar</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
