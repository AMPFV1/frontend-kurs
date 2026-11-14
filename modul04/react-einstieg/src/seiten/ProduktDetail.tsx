import { Link, useParams } from 'react-router-dom'
import PreisAnzeige from '../komponenten/PreisAnzeige'
import { produkte } from '../daten/produkte'

function ProduktDetail(): React.JSX.Element {
  // :id aus der URL lesen — kommt immer als string
  const { id } = useParams<{ id: string }>()

  // Produkt anhand der id in der lokalen Liste suchen
  const produkt = produkte.find((p) => p.id === Number(id))

  if (!produkt) {
    return (
      <>
        <h2>Produkt nicht gefunden</h2>
        <p>Ein Produkt mit der ID „{id}“ gibt es nicht.</p>
        <Link to="/produkte">Zurück zu den Produkten</Link>
      </>
    )
  }

  return (
    <>
      <h2>{produkt.name}</h2>
      <p>Kategorie: {produkt.kategorie}</p>
      <p>Preis: <PreisAnzeige preis={produkt.preis} /></p>
      <p>{produkt.beschreibung}</p>
      <Link to="/produkte">Zurück zu den Produkten</Link>
    </>
  )
}

export default ProduktDetail
