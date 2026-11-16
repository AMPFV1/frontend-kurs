import type { NachrichtBlaeschenProps } from '../typen/props'

// Eine Chat-Nachricht: Benutzer rechts (blau), Coach links (tennisgelb)
function NachrichtBlaeschen({ nachricht }: NachrichtBlaeschenProps): React.JSX.Element {
  const istBenutzer = nachricht.role === 'user'

  return (
    <div className={`blaeschen-zeile ${istBenutzer ? 'blaeschen-zeile--benutzer' : ''}`}>
      {!istBenutzer && <span className="blaeschen-avatar" aria-hidden="true">🎾</span>}
      <div className={`blaeschen ${istBenutzer ? 'blaeschen--benutzer' : 'blaeschen--coach'}`}>
        <span className="visuell-versteckt">{istBenutzer ? 'Du:' : 'Coach Volley:'}</span>
        <p>{nachricht.content}</p>
      </div>
      {istBenutzer && <span className="blaeschen-avatar" aria-hidden="true">🙋</span>}
    </div>
  )
}

export default NachrichtBlaeschen
