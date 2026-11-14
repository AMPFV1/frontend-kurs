import { Routes, Route, Navigate } from 'react-router-dom'
import Navigation from './komponenten/Navigation'
import Startseite from './seiten/Startseite'
import Produkte from './seiten/Produkte'
import ProduktDetail from './seiten/ProduktDetail'
import Kontakt from './seiten/Kontakt'
import Todos from './seiten/Todos'
import Orakel from './seiten/Orakel'
import Streaming from './seiten/Streaming'
import NichtGefunden from './seiten/NichtGefunden'
import './App.css'

function App(): React.JSX.Element {
  return (
    <>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Startseite />} />
          <Route path="/produkte" element={<Produkte />} />
          <Route path="/produkte/:id" element={<ProduktDetail />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/orakel" element={<Orakel />} />
          <Route path="/streaming" element={<Streaming />} />
          <Route path="/404" element={<NichtGefunden />} />
          {/* Alle unbekannten URLs auf die 404-Seite umleiten */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
    </>
  )
}

export default App
