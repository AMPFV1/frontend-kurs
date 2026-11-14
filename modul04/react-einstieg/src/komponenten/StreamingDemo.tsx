import { useEffect, useRef, useState } from 'react'
import { chatStream } from '../utils/aiStream'
import type { Nachricht } from '../typen/ai'

// System-Prompt: Antworten bleiben sachlich richtig, kommen aber als Tennis-Live-Ticker
const SYSTEM_PROMPT =
  'Du bist der Live-Ticker-Sprecher vom Center Court. ' +
  'Beantworte jede Frage inhaltlich korrekt und verständlich, ' +
  'aber erzähle die Antwort wie den Verlauf eines Tennismatches: ' +
  'mit Aufschlag, Ballwechseln, Netzrollern und einem Spielstand zwischendurch. ' +
  'Antworte immer auf Deutsch und bleib freundlich.'

// Sprüche, solange das Modell nachdenkt und noch kein Text da ist
const WARTE_SPRUECHE = [
  '🧢 Die Spieler betreten den Platz …',
  '🎾 Ballkinder bringen frische Bälle …',
  '🤸 Aufwärmen am Netz …',
  '🪙 Münzwurf: Wer schlägt auf? …',
  '🍓 Erdbeeren mit Sahne werden serviert …',
]

function StreamingDemo(): React.JSX.Element {
  const [eingabe, setEingabe] = useState<string>('')
  const [antwort, setAntwort] = useState<string>('')
  const [isStreaming, setIsStreaming] = useState<boolean>(false)
  const [isAbgebrochen, setIsAbgebrochen] = useState<boolean>(false)
  const [fehler, setFehler] = useState<string | null>(null)
  const [anzahlTokens, setAnzahlTokens] = useState<number>(0)
  const [spruchIndex, setSpruchIndex] = useState<number>(0)

  // Reader des laufenden Streams — wird für 'Abbrechen' gebraucht.
  // useRef statt useState: eine Änderung soll kein neues Rendern auslösen.
  const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array> | null>(null)
  // Merkt sich, ob abgebrochen wurde, bevor der Reader überhaupt da war
  const abbrechenRef = useRef<boolean>(false)

  // Modell denkt noch nach: Stream läuft, aber noch kein Text angekommen
  const isAufwaermen = isStreaming && antwort === ''

  // Während des Aufwärmens alle 2 Sekunden einen neuen Spruch zeigen
  useEffect(() => {
    if (!isAufwaermen) return
    const interval = setInterval(() => {
      setSpruchIndex(prev => (prev + 1) % WARTE_SPRUECHE.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [isAufwaermen])

  const handleSenden = async (): Promise<void> => {
    if (!eingabe.trim() || isStreaming) return

    // State zuruecksetzen
    setAntwort('')
    setFehler(null)
    setAnzahlTokens(0)
    setIsAbgebrochen(false)
    setSpruchIndex(0)
    setIsStreaming(true)
    abbrechenRef.current = false

    const nachrichten: Nachricht[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: eingabe }
    ]

    await chatStream(
      nachrichten,
      // onChunk: Token zu bisheriger Antwort hinzufuegen und mitzählen
      (token) => {
        setAntwort(prev => prev + token)
        setAnzahlTokens(prev => prev + 1)
      },
      // onFertig
      () => {
        readerRef.current = null
        setIsStreaming(false)
      },
      // onFehler
      (err) => {
        readerRef.current = null
        setFehler(err.message)
        setIsStreaming(false)
      },
      // onReader: Reader merken (oder sofort abbrechen, falls schon geklickt)
      (reader) => {
        readerRef.current = reader
        if (abbrechenRef.current) {
          reader.cancel()
        }
      }
    )
  }

  const handleAbbrechen = (): void => {
    abbrechenRef.current = true
    setIsAbgebrochen(true)
    // reader.cancel() beendet den Stream — reader.read() liefert dann done: true
    readerRef.current?.cancel()
  }

  return (
    <section className="streaming" aria-labelledby="streaming-titel">
      <h2 id="streaming-titel">📺 Live-Ticker vom Center Court</h2>
      <p>Stell eine Frage – die Antwort wird Ballwechsel für Ballwechsel live übertragen.</p>

      <div className="streaming-eingabe">
        <label htmlFor="streaming-frage" className="visuell-versteckt">Frage</label>
        <input
          id="streaming-frage"
          value={eingabe}
          onChange={e => setEingabe(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSenden()}
          placeholder="z. B. Erkläre mir React Hooks in 200 Wörtern"
          disabled={isStreaming}
        />
        <button
          onClick={handleSenden}
          disabled={isStreaming || !eingabe.trim()}
        >
          {isStreaming ? 'Ballwechsel läuft …' : 'Aufschlag! 🎾'}
        </button>
        {isStreaming && (
          <button onClick={handleAbbrechen} className="button-abbrechen">
            ☔ Regenpause
          </button>
        )}
      </div>

      {fehler && (
        <p className="fehler">🚫 Doppelfehler! {fehler}</p>
      )}

      {(antwort || isStreaming) && (
        <p className="streaming-zaehler">
          🎾 {anzahlTokens} Ballwechsel · {antwort.length} Zeichen
        </p>
      )}

      {isAufwaermen && (
        <p className="orakel-laden">{WARTE_SPRUECHE[spruchIndex]}</p>
      )}

      {isAbgebrochen && !isStreaming && (
        <p className="streaming-regen">
          ☔ Spiel wegen Regen unterbrochen! Die Plane wird über den Platz gezogen.
        </p>
      )}

      {antwort && (
        <div className="streaming-antwort" aria-live="polite" aria-busy={isStreaming}>
          {antwort}
          {/* Hüpfender Ball als Cursor — nur waehrend des Streamings */}
          {isStreaming && (
            <span className="cursor" aria-hidden="true">🎾</span>
          )}
        </div>
      )}

      {antwort && !isStreaming && !isAbgebrochen && (
        <p className="streaming-ende">🏆 Spiel, Satz und Sieg! <small className="ki-hinweis">KI-generierter Inhalt</small></p>
      )}
    </section>
  )
}

export default StreamingDemo
