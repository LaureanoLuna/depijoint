import ModalComponent from "@/assets/components/ModalComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

export default function AddPaciente() {
  const [isSecondStepVisible, setSecondStepVisible] = useState(false);

  const handleSig = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del botón
    setSecondStepVisible(true);
  };

  const handleAnt = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del botón
    setSecondStepVisible(false);
  };

  return (
    <ModalComponent
      titulo="Agregar Paciente"
      descripcion="Aquí podrás agregar un nuevo paciente al sistema"
      botonText="Agregar"
    >
      <form
        id="formIngresoPaciente"
        action="#"
        method="post"
        className="flex flex-col gap-2"
      >
        {/* Primer paso */}
        <div className={!isSecondStepVisible ? "" : "hidden"}>
          <Label htmlFor="nombre">Nombre Completo</Label>
          <Input id="nombre" type="text" name="nombre" required />
          <Label htmlFor="apellido">Apellido</Label>
          <Input id="apellido" type="text" name="apellido" required />
          <Label htmlFor="dni">DNI</Label>
          <Input id="dni" type="text" name="dni" required />
          <Button className="w-full my-3" onClick={handleSig}>
            Siguiente
          </Button>
        </div>

        {/* Segundo paso */}
        <div className={isSecondStepVisible ? "" : "hidden"}>
          <Label htmlFor="telefono">Teléfono</Label>
          <Input id="telefono" type="tel" name="telefono" required />
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="text" name="email" required />
          <Label htmlFor="direccion">Dirección</Label>
          <Input id="direccion" type="text" name="direccion" required />
          <Label htmlFor="consentimiento">Consentimiento</Label>
          <Input
            id="consentimiento"
            name="consentimiento"
            type="file"
            className="bg-gray-200 text-gray-900"
          />
          <div className="py-3 grid sm:grid-cols-2 gap-1">
            <Button variant={"secondary"} type="reset">
              Cancelar
            </Button>
            <Button variant={"outline"} type="submit">
              Guardar
            </Button>
          </div>
          <Button
            className={` uppercase ${isSecondStepVisible ? "" : "hidden"}`}
            type="button"
            variant={"link"}
            size={"sm"}
            onClick={handleAnt}
          >
            atras
          </Button>
        </div>
      </form>
    </ModalComponent>
  );
}
