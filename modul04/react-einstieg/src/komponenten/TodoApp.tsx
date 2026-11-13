// State: aufgaben: Aufgabe[] (mit 3 Beispiel-Aufgaben als Anfangswert).
import { useState } from 'react'

interface AufgabeProps {
  id: string;
  text: string;
  erledigt: boolean;
}

type Filter = 'alle' | 'offen' | 'erledigt'

const TodoApp = () => {
  const [aufgaben, setAufgaben] = useState<AufgabeProps[]>([
    { id: '1', text: 'Erste Aufgabe', erledigt: false },
    { id: '2', text: 'Zweite Aufgabe', erledigt: true },
    { id: '3', text: 'Dritte Aufgabe', erledigt: false }
  ])
  const [eingabe, setEingabe] = useState('')
  const [filter, setFilter] = useState<Filter>('alle')

  // Feature 1: Aufgabe hinzufügen
  const hinzufuegen = () => {
    const text = eingabe.trim()
    if (text === '') {
      return
    }
    const neueAufgabe: AufgabeProps = {
      id: Date.now().toString(),
      text: text,
      erledigt: false
    }
    setAufgaben([...aufgaben, neueAufgabe])
    setEingabe('')
  }

  // Enter-Taste im Eingabefeld fügt ebenfalls hinzu
  const tasteGedrueckt = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      hinzufuegen()
    }
  }

  // Feature 2: Status erledigt/offen umschalten
  const umschalten = (id: string) => {
    setAufgaben(aufgaben.map((aufgabe) =>
      aufgabe.id === id ? { ...aufgabe, erledigt: !aufgabe.erledigt } : aufgabe
    ))
  }

  // Feature 3: Aufgabe löschen
  const loeschen = (id: string) => {
    setAufgaben(aufgaben.filter((aufgabe) => aufgabe.id !== id))
  }

  // Anzeige: X von Y Aufgaben erledigt
  const anzahlErledigt = aufgaben.filter((aufgabe) => aufgabe.erledigt).length

  // Filter: nur die passenden Aufgaben anzeigen
  const gefilterteAufgaben = aufgaben.filter((aufgabe) => {
    if (filter === 'offen') {
      return !aufgabe.erledigt
    }
    if (filter === 'erledigt') {
      return aufgabe.erledigt
    }
    return true
  })

  return (
    <div>
      <h2>Aufgabenliste</h2>

      <input
        type="text"
        value={eingabe}
        placeholder="Neue Aufgabe"
        onChange={(e) => setEingabe(e.target.value)}
        onKeyDown={tasteGedrueckt}
      />
      <button onClick={hinzufuegen}>Hinzufügen</button>

      <p>{anzahlErledigt} von {aufgaben.length} Aufgaben erledigt</p>

      <div>
        <button onClick={() => setFilter('alle')} disabled={filter === 'alle'}>Alle</button>
        <button onClick={() => setFilter('offen')} disabled={filter === 'offen'}>Offen</button>
        <button onClick={() => setFilter('erledigt')} disabled={filter === 'erledigt'}>Erledigt</button>
      </div>

      <ul>
        {gefilterteAufgaben.map((aufgabe) => (
          <li key={aufgabe.id}>
            <span
              onClick={() => umschalten(aufgabe.id)}
              style={{
                textDecoration: aufgabe.erledigt ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
            >
              {aufgabe.text}
            </span>
            <button onClick={() => loeschen(aufgabe.id)}>Löschen</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoApp
