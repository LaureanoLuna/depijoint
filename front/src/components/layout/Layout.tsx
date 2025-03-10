'use client';

import { ThemeProvider } from "@/assets/context/ThemeContext";
import Enlace from "../ui/Enlace";
import Boton from "@/assets/components/Boton";
import { CheckCircledIcon, ExitIcon } from "@radix-ui/react-icons";
interface ReactElementProps {
    children: React.ReactElement;
}
export default function Layout(props?: ReactElementProps) {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="grid grid-cols-12 justify-start border rounded-lg " >
                <div className="col-span-3 border-r-2  min-h-[80vh] relative">
                    <h3 className="py-10">texto</h3>

                    <div className="flex flex-col gap-4 items-center" >
                        <Enlace icon={<CheckCircledIcon />} text={"turno"} url="/turnos" />
                        <Enlace icon={<CheckCircledIcon />} aria-label="" text={"pacientes"} url="/add" />
                        <Enlace icon={<CheckCircledIcon />} aria-label="" text={"insumos"} url="/#" />
                        <Enlace icon={<CheckCircledIcon />} aria-label="" text={"proveedores"} url="/#" />
                        <Enlace icon={<CheckCircledIcon />} aria-label="" text={"colaboradores"} url="/#" />
                        <Enlace icon={<CheckCircledIcon />} aria-label="" text={"facturacion"} url="/#" />
                    </div>
                    <Boton prop={
                        {
                            is_tooltip: false,
                            icono: <ExitIcon />,
                            tamaño: "default",
                            variante: "outline",
                            texto: "Cerrar Sesion",
                            estilo: "bottom-0 left-0 my-10 gap-2"
                        }} />

                </div>
                <div className="col-span-9 ">{props?.children}</div>

            </div>
        </ThemeProvider>
    )
}
