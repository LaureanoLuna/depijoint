import ModalComponent from "@/assets/components/ModalComponent";

export default function ModalObsevaciones({id}:{id:string}) {

    

    return (
        <ModalComponent
            botonText="Observaciones"
            descripcion="Aca estan las observaciones de turnos anteriores"
            titulo="Observaciones"
            key={id}
            children={<h2>Hola</h2>}
        />
    );
}
