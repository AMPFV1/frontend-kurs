import { Link } from 'react-router-dom'

function NichtGefunden(): React.JSX.Element {
  return (
    <>
      <h2>404 – Nicht gefunden</h2>
      <p>Die angeforderte Seite existiert nicht.</p>
      <Link to="/">Zur Startseite</Link>
    </>
  )
}

export default NichtGefunden
