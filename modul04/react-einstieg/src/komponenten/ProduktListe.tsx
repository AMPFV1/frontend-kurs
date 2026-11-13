import LeerePlatzhalter from './LeerePlatzhalter';
import PreisAnzeige from './PreisAnzeige';

interface Produkt {
  id: number;
  name: string;
  preis: number;
}

interface ProduktListeProps {
  produkte: Produkt[];
}

function ProduktListe({ produkte }: ProduktListeProps): React.JSX.Element {
  // Keine Produkte vorhanden: Platzhalter statt leerer Liste anzeigen
  if (produkte.length === 0) {
    return <LeerePlatzhalter />;
  }

  return (
    <ul>
      {produkte.map((produkt) => (
        <li key={produkt.id}>
          {produkt.name} - <PreisAnzeige preis={produkt.preis} />
        </li>
      ))}
    </ul>
  );
}


export default ProduktListe;
