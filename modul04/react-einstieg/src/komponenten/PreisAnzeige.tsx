
interface PreisAnzeigeProps {
  preis: number;
}

function PreisAnzeige({ preis }: PreisAnzeigeProps): React.JSX.Element {
  const formatierterPreis = preis.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
  const farbe = preis < 10 ? 'green' : preis > 100 ? 'red' : 'black';
  return (
    <span style={{ color: farbe }}>
      {formatierterPreis}
    </span>
  );
}

export default PreisAnzeige;    