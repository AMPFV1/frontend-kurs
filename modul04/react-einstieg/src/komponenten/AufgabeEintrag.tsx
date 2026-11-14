import type { AufgabeEintragProps } from '../typen/props'

// Eine Aufgabe: Klick auf den Text schaltet erledigt/offen um
function AufgabeEintrag({ aufgabe, onUmschalten, onLoeschen }: AufgabeEintragProps): React.JSX.Element {
  return (
    <li>
      <span
        onClick={() => onUmschalten(aufgabe.id)}
        style={{
          textDecoration: aufgabe.erledigt ? 'line-through' : 'none',
          cursor: 'pointer'
        }}
      >
        {aufgabe.text}
      </span>
      <button onClick={() => onLoeschen(aufgabe.id)}>Löschen</button>
    </li>
  )
}

export default AufgabeEintrag
