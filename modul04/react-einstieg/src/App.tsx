import Karte from './komponenten/Karte'
import ProduktListe from './komponenten/ProduktListe'
import BenutzerInfo from './komponenten/BenutzerInfo'
import Avatar from './komponenten/Avatar'
import avatarBild from './assets/images.jfif'
import Abzeichen from './komponenten/Abzeichen'
import './App.css'

const musterProdukte = [
  { id: 1, name: "Produkt 1", preis: 19.99 },
  { id: 2, name: "Produkt 2", preis: 29.99 }
]

function App() {
  return (
    <>
      <Karte titel="Willkommen">
        <p>Dies ist eine einfache Karte.</p>
      </Karte>
      <ProduktListe produkte={musterProdukte} />
      <BenutzerInfo name="Max Mustermann" email="max.mustermann@example.com" />
      <Avatar name="Max Mustermann" bildUrl={avatarBild} />
      <Abzeichen status="aktiv" />
    </>
  )
}

export default App
