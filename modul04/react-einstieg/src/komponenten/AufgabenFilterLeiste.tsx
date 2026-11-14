import type { AufgabenFilter } from '../typen/todo'
import type { AufgabenFilterLeisteProps } from '../typen/props'

const FILTER: { wert: AufgabenFilter; text: string }[] = [
  { wert: 'alle', text: 'Alle' },
  { wert: 'offen', text: 'Offen' },
  { wert: 'erledigt', text: 'Erledigt' }
]

// Filter-Buttons — der aktive Filter ist deaktiviert
function AufgabenFilterLeiste({ filter, onFilterAendern }: AufgabenFilterLeisteProps): React.JSX.Element {
  return (
    <div>
      {FILTER.map((f) => (
        <button
          key={f.wert}
          onClick={() => onFilterAendern(f.wert)}
          disabled={filter === f.wert}
        >
          {f.text}
        </button>
      ))}
    </div>
  )
}

export default AufgabenFilterLeiste
