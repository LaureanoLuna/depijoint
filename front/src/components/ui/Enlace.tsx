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
            className="flex items-center lg:gap-5 sm:gap-2 rounded-lg bg-muted px-3 py-2 text-primary transition-all border border-transparent hover:border-green-600 w-3/4 uppercase"
        >
            <span>{prop.icon}</span>
            <p className="md:block hidden ">{prop.text}</p>
        </Link>
    )
}
