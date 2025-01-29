"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { PacienteSelect } from "../interfaces/paciente"

export const SeleccionComponente = React.forwardRef<HTMLDivElement, { lista: PacienteSelect[], clave?: string, onClick: any, titulo: string }>(({ lista, onClick, titulo }, ref) => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? lista.find((elemento: PacienteSelect) => elemento.dni === value)?.nombre
                        : titulo}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" onClick={onClick}>
                <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandList>
                        <CommandEmpty>No se encontro</CommandEmpty>
                        <CommandGroup>
                            {lista.map((elemento) => (
                                <CommandItem
                                    key={elemento.pacienteId}
                                    value={elemento.dni}
                                    onSelect={(currentValue: any) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {elemento.nombre}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === elemento.dni ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
})
