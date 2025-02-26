import { PacienteProvider } from './context/PacienteContext'
import TablaPacientes from './TablaPacientes'

export default function Paciente() {
  return (
    <PacienteProvider>
        <TablaPacientes />
    </PacienteProvider>
  )
}
