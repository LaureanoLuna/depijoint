import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function Seleccion({ opciones, titulo, funccion, name }: { opciones: string[], titulo: string, funccion: any, name?: string }) {

    
    return (
        <Select onValueChange={funccion} name={name}>
            <SelectTrigger className="w-[120px]">
                <SelectValue placeholder={titulo} />
            </SelectTrigger>
            <SelectContent>
                {opciones?.map((o, i) => (<SelectItem className="capitalize" key={i} value={o}>{o}</SelectItem>))}
            </SelectContent>
        </Select>

    )
}
