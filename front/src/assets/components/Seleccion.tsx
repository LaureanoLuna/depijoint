import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function Seleccion({ opciones, titulo, funccion }: { opciones: string[], titulo: string, funccion: any }) {
    return (
        <Select onValueChange={funccion}>
            <SelectTrigger className="w-[120px]">
                <SelectValue placeholder={titulo} />
            </SelectTrigger>
            <SelectContent>
                {opciones?.map((o, i) => (<SelectItem className="capitalize" key={i} value={o}>{o}</SelectItem>))}
            </SelectContent>
        </Select>

    )
}
