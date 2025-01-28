import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { FaCheck, FaPencilAlt, FaRegTimesCircle } from "react-icons/fa";
import Boton from "./Boton";


export default function GrupoBotones({ key }: { key: string }) {
    return (
        <div>
            <div className="md:block hidden">
                <Boton
                    key={key + 1}
                    prop={{
                        variante: "confirm",
                        icono: <FaCheck color="succeess" />,
                        tamaño: "icon",
                        is_tooltip: true,
                        text_tooltip: "confirmar",
                    }}
                />
                <Boton
                    key={key + 2}
                    prop={{
                        variante: "alert",
                        icono: <FaPencilAlt color="alert" />,
                        tamaño: "icon",
                        is_tooltip: true,
                        text_tooltip: "editar",
                    }}
                />
                <Boton
                    key={key + 3}
                    prop={{
                        variante: "delete",
                        icono: <FaRegTimesCircle color="delete" />,
                        tamaño: "icon",
                        is_tooltip: true,
                        text_tooltip: "cancelar",
                    }}
                />
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
