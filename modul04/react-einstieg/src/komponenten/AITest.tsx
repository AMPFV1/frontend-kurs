import { useEffect, useState } from 'react'
import { chatKompletierung } from '../utils/ai'
import { personas } from '../daten/personas'

// Wechselnde Sprüche, solange auf die Antwort gewartet wird
const LADE_SPRUECHE = [
  '🎾 Der Ball ist noch in der Luft …',
  '🤔 Hawk-Eye wird befragt …',
  '🧦 Das Orakel wechselt die Socken …',
  '🏃 Sprint zum Netz …',
  '💦 Kurze Trinkpause …',
]

function AITest(): React.JSX.Element {
  const [personaId, setPersonaId] = useState<string>(personas[0].id)
  const [eingabe, setEingabe] = useState<string>('')
  const [antwort, setAntwort] = useState<string>('')
  const [isLaden, setIsLaden] = useState<boolean>(false)
  const [fehler, setFehler] = useState<string | null>(null)
  const [spruchIndex, setSpruchIndex] = useState<number>(0)

  const persona = personas.find((p) => p.id === personaId) ?? personas[0]

  // Während des Ladens alle 1,5 Sekunden einen neuen Spruch zeigen
  useEffect(() => {
    if (!isLaden) return
    const interval = setInterval(() => {
      setSpruchIndex((prev) => (prev + 1) % LADE_SPRUECHE.length)
    }, 1500)
    // Cleanup: Interval stoppen, wenn das Laden fertig ist
    return () => clearInterval(interval)
  }, [isLaden])

  const handleFragen = async (): Promise<void> => {
    const frage = eingabe.trim()
    if (frage === '' || isLaden) return

    setIsLaden(true)
    setFehler(null)
    setAntwort('')
    setSpruchIndex(0)

    try {
      const text = await chatKompletierung([
        { role: 'system', content: persona.systemPrompt },
        { role: 'user', content: frage },
      ])
      setAntwort(text)
    } catch (err) {
      setFehler(err instanceof Error ? err.message : 'Unbekannter Fehler')
    } finally {
      setIsLaden(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleFragen()
    }
  }

  return (
    <section className="orakel" aria-labelledby="orakel-titel">
      <h2 id="orakel-titel">🔮 Das Tennis-Orakel</h2>
      <p>Stell irgendeine Frage – die Antwort kommt garantiert mit Topspin.</p>

      <fieldset className="orakel-personas">
        <legend>Wer soll antworten?</legend>
        {personas.map((p) => (
          <label key={p.id} className={p.id === personaId ? 'persona aktiv' : 'persona'}>
            <input
              type="radio"
              name="persona"
              value={p.id}
              checked={p.id === personaId}
              onChange={() => setPersonaId(p.id)}
              disabled={isLaden}
            />
            <span className="persona-emoji" aria-hidden="true">{p.emoji}</span>
            <strong>{p.name}</strong>
            <small>{p.beschreibung}</small>
          </label>
        ))}
      </fieldset>

      <div className="orakel-eingabe">
        <label htmlFor="orakel-frage" className="visuell-versteckt">Deine Frage</label>
        <input
          id="orakel-frage"
          value={eingabe}
          onChange={(e) => setEingabe(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="z. B. Warum ist die Banane krumm?"
          disabled={isLaden}
        />
        <button onClick={handleFragen} disabled={isLaden || eingabe.trim() === ''}>
          {isLaden ? 'Wird geschlagen …' : 'Aufschlag! 🎾'}
        </button>
      </div>

      <div aria-live="polite">
        {isLaden && <p className="orakel-laden">{LADE_SPRUECHE[spruchIndex]}</p>}

        {fehler && (
          <p className="fehler">
            🚫 Doppelfehler! {fehler}
          </p>
        )}

        {antwort && !isLaden && (
          <div className="orakel-antwort">
            <p className="orakel-absender">
              <span aria-hidden="true">{persona.emoji}</span> {persona.name} sagt:
            </p>
            <p>{antwort}</p>
            <small className="ki-hinweis">KI-generierter Inhalt</small>
          </div>
        )}
      </div>
    </section>
  )
}

export default AITest
