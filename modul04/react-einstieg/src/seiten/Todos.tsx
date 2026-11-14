import { useState } from 'react'
import useFetch from '../hooks/useFetch'
import useMutation from '../hooks/useMutation'
import TodoFormular from '../komponenten/TodoFormular'
import TodoEintrag from '../komponenten/TodoEintrag'
import type { NeuesTodo, Todo } from '../typen/todo'

const API_URL = 'https://jsonplaceholder.typicode.com/todos'

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

  // DELETE: URL hängt von der id ab, deshalb eigener Zustand
  const [loeschtId, setLoeschtId] = useState<number | null>(null)
  const [loeschFehler, setLoeschFehler] = useState<string | null>(null)
  const [isLoeschErfolgreich, setIsLoeschErfolgreich] = useState<boolean>(false)

  const handleLoeschen = async (id: number): Promise<void> => {
    setLoeschtId(id)
    setLoeschFehler(null)
    setIsLoeschErfolgreich(false)

    try {
      const antwort = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      if (!antwort.ok) {
        throw new Error(`HTTP Fehler: ${antwort.status}`)
      }
      // Nach Erfolg aus der lokalen Liste entfernen
      setTodos(prev => (prev ?? []).filter(todo => todo.id !== id))
      setIsLoeschErfolgreich(true)
    } catch (err) {
      setLoeschFehler(err instanceof Error ? err.message : 'Fehler')
    } finally {
      setLoeschtId(null)
    }
  }

  const handleErstellen = async (titel: string): Promise<boolean> => {
    const ergebnis = await erstellen({ userId: 1, title: titel, completed: false })
    if (!ergebnis) {
      return false
    }
    // JSONPlaceholder gibt immer id 201 zurück — für eindeutige keys eigene id vergeben
    const neu: Todo = { ...ergebnis, id: Date.now() }
    setTodos(prev => [neu, ...(prev ?? [])])
    return true
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

      <TodoFormular isLaden={isErstellen} onErstellen={handleErstellen} />

      {erstellFehler && <p className="fehler">Erstellen fehlgeschlagen: {erstellFehler}</p>}
      {erstellErfolg && <p className="erfolg">Todo wurde erstellt.</p>}
      {loeschFehler && <p className="fehler">Löschen fehlgeschlagen: {loeschFehler}</p>}
      {isLoeschErfolgreich && <p className="erfolg">Todo wurde gelöscht.</p>}

      <button onClick={neuLaden}>Neu laden</button>

      <ul className="todo-liste">
        {todos?.map(todo => (
          <TodoEintrag
            key={todo.id}
            todo={todo}
            isLoeschen={loeschtId === todo.id}
            onUmschalten={handleUmschalten}
            onLoeschen={handleLoeschen}
          />
        ))}
      </ul>
    </div>
  )
}

export default Todos
