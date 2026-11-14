import { NavLink } from 'react-router-dom'

// NavLink setzt die Klasse 'aktiv', wenn der Link zur aktuellen URL passt
const linkKlasse = ({ isActive }: { isActive: boolean }): string =>
  isActive ? 'nav-link aktiv' : 'nav-link'

function Navigation(): React.JSX.Element {
  return (
    <nav aria-label="Hauptnavigation" className="navigation">
      {/* end: Startseite nur bei genau "/" hervorheben */}
      <NavLink to="/" end className={linkKlasse}>Startseite</NavLink>
      <NavLink to="/produkte" className={linkKlasse}>Produkte</NavLink>
      <NavLink to="/kontakt" className={linkKlasse}>Kontakt</NavLink>
    </nav>
  )
}

export default Navigation
