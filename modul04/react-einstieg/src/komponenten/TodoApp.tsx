// State: aufgaben: Aufgabe[] (mit 3 Beispiel-Aufgaben als Anfangswert).
import { useState } from 'react'
import AufgabeEintrag from './AufgabeEintrag'
import AufgabenFilterLeiste from './AufgabenFilterLeiste'
import type { Aufgabe, AufgabenFilter } from '../typen/todo'

function TodoApp(): React.JSX.Element {
  const [aufgaben, setAufgaben] = useState<Aufgabe[]>([
    { id: 1, text: 'Erste Aufgabe', erledigt: false },
    { id: 2, text: 'Zweite Aufgabe', erledigt: true },
    { id: 3, text: 'Dritte Aufgabe', erledigt: false }
  ])
  const [eingabe, setEingabe] = useState<string>('')
  const [filter, setFilter] = useState<AufgabenFilter>('alle')

  // Feature 1: Aufgabe hinzufügen
  const handleHinzufuegen = (): void => {
    const text = eingabe.trim()
    if (text === '') {
      return
    }
    setAufgaben(prev => [...prev, { id: Date.now(), text, erledigt: false }])
    setEingabe('')
  }

  // Enter-Taste im Eingabefeld fügt ebenfalls hinzu
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleHinzufuegen()
    }
  }

  // Feature 2: Status erledigt/offen umschalten
  const handleUmschalten = (id: number): void => {
    setAufgaben(prev => prev.map((aufgabe) =>
      aufgabe.id === id ? { ...aufgabe, erledigt: !aufgabe.erledigt } : aufgabe
    ))
  }

  // Feature 3: Aufgabe löschen
  const handleLoeschen = (id: number): void => {
    setAufgaben(prev => prev.filter((aufgabe) => aufgabe.id !== id))
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
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleHinzufuegen}>Hinzufügen</button>

      <p>{anzahlErledigt} von {aufgaben.length} Aufgaben erledigt</p>

      <AufgabenFilterLeiste filter={filter} onFilterAendern={setFilter} />

      <ul>
        {gefilterteAufgaben.map((aufgabe) => (
          <AufgabeEintrag
            key={aufgabe.id}
            aufgabe={aufgabe}
            onUmschalten={handleUmschalten}
            onLoeschen={handleLoeschen}
          />
        ))}
      </ul>
    </div>
  )
}

export default TodoApp
