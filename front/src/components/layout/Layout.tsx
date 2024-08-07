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
            <div className="flex justify-start border rounded-lg " >
                <div className="  w-1/4 min-h-[80vh] relative">
                    <h3 className="py-10">texto</h3>

                    <div className="flex flex-col gap-4 items-center" >

                        <Enlace text={"turno"} url="/login" />

                        <Enlace aria-label="" text={"pacientes"} url="/turnos" />


                        <Enlace aria-label="" text={"insumos"} url="/#" />


                        <Enlace aria-label="" text={"proveedores"} url="/#" />


                    </div>
                    <Button className=" bottom-0 left-0 my-10" size={"lg"}>
                        log Out
                    </Button>
                </div>
                {props?.children}
            </div>
        </ThemeProvider>
    )
}
