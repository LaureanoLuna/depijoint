'use client';

import { ThemeProvider } from "@/assets/context/ThemeContext";
import { Button } from "../ui/button";
import Enlace from "../ui/Enlace";
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

                        <Enlace text={"turno"} url="/turnos" />

                        <Enlace aria-label="" text={"pacientes"} url="/turnos" />


                        <Enlace aria-label="" text={"insumos"} url="/#" />


                        <Enlace aria-label="" text={"proveedores"} url="/#" />

                        <Enlace aria-label="" text={"colaboradores"} url="/#" />

                        <Enlace aria-label="" text={"facturacion"} url="/#" />



                    </div>
                    <Button className=" bottom-0 left-0 my-10" size={"lg"}>
                        log Out
                    </Button>
                </div>
                <div className="col-span-9 ">{props?.children}</div>
                
            </div>
        </ThemeProvider>
    )
}
