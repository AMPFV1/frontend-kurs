import { useEffect, useRef, useState } from 'react'
import useAI from '../hooks/useAI'
import NachrichtBlaeschen from './NachrichtBlaeschen'

const MAX_ZEICHEN = 500

/*
 * System-Prompt nach Abschnitt 5.2: Persona, Aufgabe, Format, Einschränkungen.
 */
const SYSTEM_PROMPT = `
Du bist "Coach Volley", ein überenthusiastischer Tennistrainer-Chatbot mit 30 Jahren Platzerfahrung.
Du liebst Tennis so sehr, dass du alles im Leben mit Tennis vergleichst.

DEINE AUFGABE:
- Beantworte Fragen zu Tennis: Regeln, Zählweise, Schlagtechnik, Training, Ausrüstung und Taktik
- Gib konkrete, praktisch umsetzbare Tipps für Hobbyspielerinnen und Hobbyspieler
- Merke dir, was die Person dir im Gespräch erzählt (Name, Spielniveau, Probleme) und beziehe dich darauf

FORMAT:
- Antworte immer auf Deutsch
- Maximal 80 Wörter pro Antwort
- Bau in jede Antwort einen kleinen Tennis-Witz oder ein Tennis-Wortspiel ein
- Bei Übungen: kurze Aufzählung

EINSCHRÄNKUNGEN:
- Bei Fragen ohne Tennisbezug: kurz und humorvoll antworten und dann zurück zum Tennis lenken ("Zurück auf den Platz!")
- Keine medizinischen Diagnosen: bei Schmerzen immer zum Arzt oder zur Physiotherapie schicken
- Bleib freundlich und motivierend, auch bei der hundertsten Doppelfehler-Frage
`.trim()

function Chatbox(): React.JSX.Element {
  const [eingabe, setEingabe] = useState<string>('')
  const { nachrichten, isStreaming, fehler, sendeNachricht, zuruecksetzen } =
    useAI({ systemPrompt: SYSTEM_PROMPT })

  // Unsichtbares Element am Ende des Verlaufs — dorthin wird gescrollt
  const endeRef = useRef<HTMLDivElement | null>(null)

  // Automatisch nach unten scrollen, sobald eine neue Nachricht (oder ein neuer Token) erscheint
  useEffect(() => {
    endeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [nachrichten])

  const handleSenden = async (): Promise<void> => {
    if (!eingabe.trim()) return
    const text = eingabe
    setEingabe('')
    await sendeNachricht(text)
  }

  const letzte = nachrichten[nachrichten.length - 1]
  const isTippt = isStreaming && letzte?.role === 'assistant' && letzte.content === ''
  const restZeichen = MAX_ZEICHEN - eingabe.length

  return (
    <section className="chatbox" aria-labelledby="chatbox-titel">
      <header className="chatbox-kopf">
        <h2 id="chatbox-titel">🎾 Coach Volley</h2>
        <small className="ki-hinweis">KI-Chatbot · Antworten sind KI-generiert</small>
      </header>

      {/* Nachrichtenverlauf */}
      <div className="chatbox-verlauf" aria-live="polite" aria-busy={isStreaming}>
        {nachrichten.length === 0 && (
          <p className="chatbox-leer">
            Servus! Ich bin Coach Volley. 🎾 Frag mich alles über Tennis –
            Vorhand, Doppelfehler, Schlägerwahl … Ich nehme jeden Ball an!
          </p>
        )}

        {nachrichten.map((msg, index) => (
          // Index als key ist hier in Ordnung: Nachrichten werden nur angehängt, nie umsortiert
          // Die leere Nachricht während des Wartens zeigt stattdessen den Typing-Indikator
          !(isTippt && index === nachrichten.length - 1) && (
            <NachrichtBlaeschen key={index} nachricht={msg} />
          )
        ))}

        {isTippt && (
          <p className="chatbox-tippt">Coach Volley holt zum Aufschlag aus <span className="punkte" aria-hidden="true">…</span></p>
        )}

        {fehler && (
          <p className="fehler">🚫 Doppelfehler! {fehler}</p>
        )}

        <div ref={endeRef} />
      </div>

      {/* Eingabebereich */}
      <div className="chatbox-eingabe">
        <label htmlFor="chatbox-feld" className="visuell-versteckt">Nachricht an Coach Volley</label>
        <input
          id="chatbox-feld"
          value={eingabe}
          onChange={e => setEingabe(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSenden()}
          placeholder="Nachricht eingeben..."
          maxLength={MAX_ZEICHEN}
          disabled={isStreaming}
          aria-describedby="chatbox-zaehler"
        />
        <button
          onClick={handleSenden}
          disabled={isStreaming || !eingabe.trim()}
        >
          Aufschlag 🎾
        </button>
        <button onClick={zuruecksetzen} className="button-neu" disabled={isStreaming}>
          Neues Match
        </button>
      </div>
      <p
        id="chatbox-zaehler"
        className={restZeichen <= 50 ? 'chatbox-zaehler chatbox-zaehler--knapp' : 'chatbox-zaehler'}
      >
        {eingabe.length} / {MAX_ZEICHEN} Zeichen
        {restZeichen === 0 && ' – Aus! Der Ball ist hinter der Grundlinie.'}
      </p>
    </section>
  )
}

export default Chatbox
