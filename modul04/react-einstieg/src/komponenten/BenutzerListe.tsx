import { useState, useEffect } from 'react'
import Karte from './Karte'

interface BenutzerProps {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
}

const BenutzerListe = () => {
  // State für die drei Zustände: Daten, Loading, Fehler
  const [benutzer, setBenutzer] = useState<BenutzerProps[]>([])
  const [isLaden, setIsLaden] = useState(true)
  const [fehler, setFehler] = useState<string | null>(null)
  // Wird bei 'Neu laden' erhöht und löst dadurch useEffect erneut aus
  const [ladeVersuch, setLadeVersuch] = useState(0)

  useEffect(() => {
    const ladeBenutzer = async () => {
      setIsLaden(true)
      setFehler(null)

      try {
        const antwort = await fetch('https://jsonplaceholder.typicode.com/users')

        // fetch() wirft bei 404 oder 500 keinen Fehler, deshalb antwort.ok prüfen
        if (!antwort.ok) {
          throw new Error(`HTTP Fehler ${antwort.status}: ${antwort.statusText}`)
        }

        const daten: BenutzerProps[] = await antwort.json()
        setBenutzer(daten)
      } catch (e) {
        setFehler(e instanceof Error ? e.message : 'Ein unbekannter Fehler ist aufgetreten.')
      } finally {
        setIsLaden(false)
      }
    }

    ladeBenutzer()
  }, [ladeVersuch])

  const neuLaden = () => {
    setLadeVersuch(ladeVersuch + 1)
  }

  return (
    <div>
      <h2>Benutzerliste</h2>
      <button onClick={neuLaden} disabled={isLaden}>Neu laden</button>

      {isLaden && <p>Benutzer werden geladen …</p>}

      {!isLaden && fehler && (
        <p style={{ color: 'red' }}>Die Benutzer konnten nicht geladen werden. ({fehler})</p>
      )}

      {!isLaden && !fehler && benutzer.map((b) => (
        <Karte key={b.id} titel={b.name}>
          <p>E-Mail: {b.email}</p>
          <p>
            Website:{' '}
            <a href={`https://${b.website}`} target="_blank" rel="noopener noreferrer">
              {b.website}
            </a>
          </p>
        </Karte>
      ))}
    </div>
  )
}

export default BenutzerListe
