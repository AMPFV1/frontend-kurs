import { useState } from 'react'
import useFetch from '../hooks/useFetch'
import useMutation from '../hooks/useMutation'

const API_URL = 'https://jsonplaceholder.typicode.com/todos'

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Daten, die beim Erstellen an den Server geschickt werden
type NeuesTodo = Omit<Todo, 'id'>

function Todos(): React.JSX.Element {
  // GET: alle Todos laden
  const { daten: todos, isLaden, fehler, neuLaden, setDaten: setTodos } =
    useFetch<Todo[]>(API_URL)

  // POST: neues Todo erstellen
  const {
    ausfuehren: erstellen,
    isLaden: isErstellen,
    fehler: erstellFehler,
    erfolg: erstellErfolg,
  } = useMutation<NeuesTodo, Todo>(API_URL, 'POST')

  const [titel, setTitel] = useState<string>('')

  // DELETE: URL hängt von der id ab, deshalb eigener Zustand
  const [loeschtId, setLoeschtId] = useState<number | null>(null)
  const [loeschFehler, setLoeschFehler] = useState<string | null>(null)
  const [loeschErfolg, setLoeschErfolg] = useState<boolean>(false)

  const handleLoeschen = async (id: number): Promise<void> => {
    setLoeschtId(id)
    setLoeschFehler(null)
    setLoeschErfolg(false)

    try {
      const antwort = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      if (!antwort.ok) {
        throw new Error(`HTTP Fehler: ${antwort.status}`)
      }
      // Nach Erfolg aus der lokalen Liste entfernen
      setTodos(prev => (prev ?? []).filter(todo => todo.id !== id))
      setLoeschErfolg(true)
    } catch (err) {
      setLoeschFehler(err instanceof Error ? err.message : 'Fehler')
    } finally {
      setLoeschtId(null)
    }
  }

  const handleErstellen = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const text = titel.trim()
    if (text === '') return

    const ergebnis = await erstellen({ userId: 1, title: text, completed: false })

    if (ergebnis) {
      // JSONPlaceholder gibt immer id 201 zurück — für eindeutige keys eigene id vergeben
      const neu: Todo = { ...ergebnis, id: Date.now() }
      setTodos(prev => [neu, ...(prev ?? [])])
      setTitel('')
    }
  }

  // Checkbox: erledigt/offen lokal umschalten
  const handleUmschalten = (id: number): void => {
    setTodos(prev =>
      (prev ?? []).map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  // Zustand 1: Laden
  if (isLaden) return <p>Todos werden geladen...</p>

  // Zustand 2: Fehler
  if (fehler) {
    return (
      <div>
        <p className="fehler">Fehler beim Laden: {fehler}</p>
        <button onClick={neuLaden}>Erneut versuchen</button>
      </div>
    )
  }

  // Zustand 3: Erfolg
  return (
    <div>
      <h2>Todos</h2>

      <form onSubmit={handleErstellen}>
        <label htmlFor="todo-titel">Neues Todo: </label>
        <input
          id="todo-titel"
          value={titel}
          onChange={e => setTitel(e.target.value)}
          disabled={isErstellen}
        />
        <button type="submit" disabled={isErstellen || titel.trim() === ''}>
          {isErstellen ? 'Wird erstellt...' : 'Hinzufügen'}
        </button>
      </form>

      {erstellFehler && <p className="fehler">Erstellen fehlgeschlagen: {erstellFehler}</p>}
      {erstellErfolg && <p className="erfolg">Todo wurde erstellt.</p>}
      {loeschFehler && <p className="fehler">Löschen fehlgeschlagen: {loeschFehler}</p>}
      {loeschErfolg && <p className="erfolg">Todo wurde gelöscht.</p>}

      <button onClick={neuLaden}>Neu laden</button>

      <ul className="todo-liste">
        {todos?.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleUmschalten(todo.id)}
              />
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.title}
              </span>
            </label>
            <button
              onClick={() => handleLoeschen(todo.id)}
              disabled={loeschtId === todo.id}
            >
              {loeschtId === todo.id ? 'Wird gelöscht...' : 'Löschen'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todos
