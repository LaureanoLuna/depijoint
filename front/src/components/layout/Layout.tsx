'use client';

import { ThemeProvider } from "@/assets/context/ThemeContext";
import Enlace from "../ui/Enlace";
import Boton from "@/assets/components/Boton";
import { CheckCircledIcon, ExitIcon } from "@radix-ui/react-icons";

interface ReactElementProps {
    children: React.ReactNode; // Cambiado a React.ReactNode para permitir más de un hijo
}

const links = [
    { text: "Turno", url: "/turnos" },
    { text: "Pacientes", url: "/pacientes" },
    { text: "Insumos", url: "/#" },
    { text: "Proveedores", url: "/#" },
    { text: "Colaboradores", url: "/#" },
    { text: "Facturación", url: "/#" },
];

export default function Layout({ children }: ReactElementProps) {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="grid grid-cols-12 justify-start border rounded-lg">
                <aside className="col-span-3 border-r-2 min-h-[80vh] relative">
                    <h3 className="py-10 text-center font-bold">Menú</h3>
                    <nav className="flex flex-col gap-4 items-center">
                        {links.map((link, index) => (
                            <Enlace 
                                key={index} 
                                icon={<CheckCircledIcon />} 
                                text={link.text} 
                                url={link.url} 
                            />
                        ))}
                    </nav>
                    <Boton 
                        prop={{
                            is_tooltip: false,
                            icono: <ExitIcon />,
                            tamaño: "default",
                            variante: "outline",
                            texto: "Cerrar Sesión",
                            estilo: "absolute bottom-0 left-0 my-10 gap-2"
                        }} 
                    />
                </aside>
                <main className="col-span-9 p-4">
                    {children}
                </main>
            </div>
        </ThemeProvider>
    );
}