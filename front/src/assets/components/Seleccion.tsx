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
            <SelectTrigger className="max-w-[120px] w-auto">
                <SelectValue placeholder={titulo} />
            </SelectTrigger>
            <SelectContent className="w-auto">
                {opciones?.map((o, i) => (<SelectItem className="capitalize" key={i} value={o}>{o}</SelectItem>))}
            </SelectContent>
        </Select>

    )
}
