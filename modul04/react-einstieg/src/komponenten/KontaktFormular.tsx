import { useState } from 'react';
import { MIN_NACHRICHT, pruefeAlle, pruefeFeld } from '../utils/validierung';
import type { KontaktFormDaten, KontaktFormFehler } from '../typen/formular';

const leeresFormular: KontaktFormDaten = {
  name: '',
  email: '',
  betreff: '',
  nachricht: '',
  prioritaet: 'mittel',
};

function KontaktFormular(): React.JSX.Element {
  const [daten, setDaten] = useState<KontaktFormDaten>(leeresFormular);
  const [fehler, setFehler] = useState<KontaktFormFehler>({});
  const [isErfolgreich, setIsErfolgreich] = useState<boolean>(false);

  // Allgemeiner Change-Handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;

    setDaten(prev => ({ ...prev, [name]: value }));

    // Fehler beim Tippen zuruecksetzen, Erfolgsmeldung ausblenden
    setFehler(prev => ({ ...prev, [name]: undefined }));
    setIsErfolgreich(false);
  };

  // Echtzeit-Validierung: Feld wird geprüft, sobald es verlassen wird
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const feld = e.target.name as keyof KontaktFormFehler;
    setFehler(prev => ({ ...prev, [feld]: pruefeFeld(feld, daten) }));
  };

  // Senden-Button nur aktiv, wenn alle Felder gültig sind
  const isFormularGueltig = Object.keys(pruefeAlle(daten)).length === 0;

  // Submit-Handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const neueFehler = pruefeAlle(daten);
    setFehler(neueFehler);
    if (Object.keys(neueFehler).length > 0) return;

    console.log('Formular abgesendet:', daten);
    setIsErfolgreich(true);

    // Formular zurücksetzen
    setDaten(leeresFormular);
    setFehler({});
  };

  // Zeichenzählung für die Nachricht
  const anzahlZeichen = daten.nachricht.trim().length;
  const zeichenInfo = anzahlZeichen < MIN_NACHRICHT
    ? `Noch ${MIN_NACHRICHT - anzahlZeichen} Zeichen fehlen`
    : `${anzahlZeichen} Zeichen eingegeben`;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Kontaktformular</h2>

      {isErfolgreich && <p className='erfolg'>Vielen Dank! Ihre Nachricht wurde gesendet.</p>}

      <div>
        <label htmlFor='name'>Name</label>
        <input
          id='name'
          name='name'
          value={daten.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {fehler.name && <span className='fehler'>{fehler.name}</span>}
      </div>

      <div>
        <label htmlFor='email'>E-Mail</label>
        <input
          id='email'
          name='email'
          type='email'
          value={daten.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {fehler.email && <span className='fehler'>{fehler.email}</span>}
      </div>

      <div>
        <label htmlFor='betreff'>Betreff</label>
        <input
          id='betreff'
          name='betreff'
          value={daten.betreff}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {fehler.betreff && <span className='fehler'>{fehler.betreff}</span>}
      </div>

      <div>
        <label htmlFor='nachricht'>Nachricht</label>
        <textarea
          id='nachricht'
          name='nachricht'
          rows={5}
          value={daten.nachricht}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className='zeichen'>{zeichenInfo}</span>
        {fehler.nachricht && <span className='fehler'>{fehler.nachricht}</span>}
      </div>

      <div>
        <label htmlFor='prioritaet'>Priorität</label>
        <select
          id='prioritaet'
          name='prioritaet'
          value={daten.prioritaet}
          onChange={handleChange}
        >
          <option value='niedrig'>Niedrig</option>
          <option value='mittel'>Mittel</option>
          <option value='hoch'>Hoch</option>
        </select>
      </div>

      <button
        type='submit'
        disabled={!isFormularGueltig}
      >
        Senden
      </button>
    </form>
  );
}

export default KontaktFormular;
