import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { LIST_RUTAS } from "@/assets/constant/LIST_RUTAS";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronUp, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Usuario } from "@/assets/interfaces/usuario";
import useLoginAccion from "@/assets/hooks/useLoginAccion";
import Boton from "@/assets/components/Boton";

export function AppSidebar() {
  const { getUsuario, cerrarSesion } = useLoginAccion();
  const navegar = useNavigate()
  const [user] = useState<Usuario | null>(getUsuario());

  const handleCerrarSesion = async ()=>{
    const bool = await cerrarSesion();
    if(bool) navegar('/login');
  }

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>DepiJoint</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {LIST_RUTAS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {user ? user.usuario : "Usuario"}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onClick={handleCerrarSesion}>
                  <Boton
                    prop={{
                      is_tooltip: false,
                      tamaño: "sm",
                      variante: "ghost",
                      estilo: "p-0",
                      texto: "Cerrar Session",
                    }}
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
