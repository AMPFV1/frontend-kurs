import Karte from './Karte'
import type { BenutzerKarteProps } from '../typen/props'

// Ein Benutzer als Karte: Name, E-Mail und Link zur Website
function BenutzerKarte({ benutzer }: BenutzerKarteProps): React.JSX.Element {
  return (
    <Karte titel={benutzer.name}>
      <p>E-Mail: {benutzer.email}</p>
      <p>
        Website:{' '}
        <a href={`https://${benutzer.website}`} target="_blank" rel="noopener noreferrer">
          {benutzer.website}
        </a>
      </p>
    </Karte>
  )
}

export default BenutzerKarte
