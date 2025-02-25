import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

/* Acciones para las notificaciones */
const useNotificacionAccion = () => {
  const { toast } = useToast();

  const [notificacion, setNotificacion] = useState<string | null>(null);

  const getNotificacion = (
    mensaje: string,
    tipo: "default" | "destructive" | "sussess"
  ) => {
    toast({ description: mensaje, variant: tipo });
  };

  const mostrarNotificacion = (mensaje: string) => {
    setNotificacion(mensaje);
    setTimeout(() => {
      setNotificacion(null);
    }, 3000); // Oculta la notificación después de 3 segundos
  };

  return {
    notificacion,
    mostrarNotificacion,
    getNotificacion
  };
};

export default useNotificacionAccion;
