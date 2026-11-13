interface Produkt {
  id: number;
  name: string;
  preis: number;
}

interface ProduktListeProps {
  produkte: Produkt[];
}

function ProduktListe({ produkte }: ProduktListeProps): React.JSX.Element {
  return (
    <ul>
      {produkte.map((produkt) => (
        <li key={produkt.id}>
          {produkt.name} - ${produkt.preis.toFixed(2)}
        </li>
      ))}
    </ul>
  );
}


export default ProduktListe;
