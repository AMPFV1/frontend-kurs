import { Link } from 'react-router-dom'
import Karte from '../komponenten/Karte'
import PreisAnzeige from '../komponenten/PreisAnzeige'
import { produkte } from '../daten/produkte'

function Produkte(): React.JSX.Element {
  return (
    <>
      <h2>Produkte</h2>
      <div className="produkt-raster">
        {produkte.map((produkt) => (
          // Ganze Karte ist ein Link zur Detailseite /produkte/:id
          <Link key={produkt.id} to={`/produkte/${produkt.id}`} className="produkt-link">
            <Karte titel={produkt.name}>
              <p>{produkt.kategorie}</p>
              <PreisAnzeige preis={produkt.preis} />
            </Karte>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Produkte
