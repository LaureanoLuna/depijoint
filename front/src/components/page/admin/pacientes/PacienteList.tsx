
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import AddPaciente from './AddPaciente'

export default function PacienteList() {
  return (
    <Card className="flex justify-between items-center px-5">
      <CardHeader>
        <CardTitle className="text-justify text-xl uppercase flex justify-center items-center gap-5">

          <span>
            Turnos
            <CardDescription className="tracking-widest">
              del dia
            </CardDescription>
          </span>
        </CardTitle>
      </CardHeader>

      <CardHeader>
        <AddPaciente />
      </CardHeader>
    </Card>
  )
}

