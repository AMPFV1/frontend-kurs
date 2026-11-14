//Implementieren Sie einen Zähler mit den Buttons: Erhöhen, Verringern, Zurücksetzen.
import { useState } from 'react'

function Zaehler(): React.JSX.Element {
  const [zaehler, setZaehler] = useState<number>(0)
  const [schrittweite, setSchrittweite] = useState<number>(1)

  const handleErhoehen = (): void => {
    setZaehler(prev => prev + 1)
  }

  // Der Zähler darf nicht unter 0 fallen
  const handleVerringern = (): void => {
    setZaehler(prev => Math.max(0, prev - 1))
  }

  const handleZuruecksetzen = (): void => {
    setZaehler(0)
  }

  const handleUmXErhoehen = (): void => {
    setZaehler(prev => Math.max(0, prev + schrittweite))
  }

  return (
    <div>
      <h2>Zähler</h2>
      <p style={{ color: zaehler > 10 ? 'red' : zaehler === 0 ? 'gray' : 'black' }}>
        {zaehler}
      </p>
      <button onClick={handleErhoehen}>Erhöhen</button>
      <button onClick={handleVerringern}>Verringern</button>
      <button onClick={handleZuruecksetzen}>Zurücksetzen</button>
      <div>
        <label htmlFor="schrittweite">Um X erhöhen: </label>
        <input
          id="schrittweite"
          type="number"
          value={schrittweite}
          onChange={(e) => setSchrittweite(Number(e.target.value))}
        />
        <button onClick={handleUmXErhoehen}>Um {schrittweite} erhöhen</button>
      </div>
    </div>
  )
}

export default Zaehler
