import type { TodoEintragProps } from '../typen/props'

// Ein Todo mit Checkbox (erledigt/offen) und Löschbutton
function TodoEintrag({ todo, isLoeschen, onUmschalten, onLoeschen }: TodoEintragProps): React.JSX.Element {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onUmschalten(todo.id)}
        />
        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          {todo.title}
        </span>
      </label>
      <button onClick={() => onLoeschen(todo.id)} disabled={isLoeschen}>
        {isLoeschen ? 'Wird gelöscht...' : 'Löschen'}
      </button>
    </li>
  )
}

export default TodoEintrag
