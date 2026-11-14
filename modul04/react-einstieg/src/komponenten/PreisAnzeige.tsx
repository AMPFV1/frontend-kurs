import type { PreisAnzeigeProps } from '../typen/props';
import { formatierePreis } from '../utils/formatierung';

function PreisAnzeige({ preis }: PreisAnzeigeProps): React.JSX.Element {
  const formatierterPreis = formatierePreis(preis);
  const farbe = preis < 10 ? 'green' : preis > 100 ? 'red' : 'black';
  return (
    <span style={{ color: farbe }}>
      {formatierterPreis}
    </span>
  );
}

export default PreisAnzeige;    