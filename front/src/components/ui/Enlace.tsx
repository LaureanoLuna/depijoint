import { Link } from "react-router-dom";

interface Text {
    text: string | React.ReactElement
    icon?: React.ReactElement
    url: string
}

export default function Enlace(prop: Text) {
    return (
        <Link
            to={prop.url}
            className="flex items-center gap-5 rounded-lg bg-muted px-3 py-2 text-primary transition-all border border-transparent hover:border-green-600 w-3/4 uppercase"
        >
            <span>{prop.icon}</span>
            {prop.text}
        </Link>
    )
}
