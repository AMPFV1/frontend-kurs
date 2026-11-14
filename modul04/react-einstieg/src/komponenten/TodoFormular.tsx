import { useState } from 'react'
import type { TodoFormularProps } from '../typen/props'

// Formular zum Erstellen eines neuen Todos
function TodoFormular({ isLaden, onErstellen }: TodoFormularProps): React.JSX.Element {
  const [titel, setTitel] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const text = titel.trim()
    if (text === '') return

    const isErstellt = await onErstellen(text)
    if (isErstellt) {
      setTitel('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="todo-titel">Neues Todo: </label>
      <input
        id="todo-titel"
        value={titel}
        onChange={e => setTitel(e.target.value)}
        disabled={isLaden}
      />
      <button type="submit" disabled={isLaden || titel.trim() === ''}>
        {isLaden ? 'Wird erstellt...' : 'Hinzufügen'}
      </button>
    </form>
  )
}

export default TodoFormular
