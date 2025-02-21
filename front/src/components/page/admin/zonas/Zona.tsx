import { ZonaProvider } from "./context/ZonaContext"
import TablaZonas from "./TablaZonas"

export default function Zona() {
    
  return (
    <ZonaProvider>
        <TablaZonas />
    </ZonaProvider>
  )
}
