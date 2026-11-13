//Erstellen Sie eine Komponente Abzeichen.tsx die je nach status-Prop ('aktiv', 'inaktiv', 'gesperrt')  unterschiedliche Farben und Texte anzeigt. 
interface AbzeichenProps {
  status: 'aktiv' | 'inaktiv' | 'gesperrt';
}

function Abzeichen({ status }: AbzeichenProps): React.JSX.Element {
  let text: string;
  let farbe: string;
    switch (status) {
    case 'aktiv':
      text = 'Aktiv';
      farbe = 'green';
      break;
    case 'inaktiv':
      text = 'Inaktiv';
      farbe = 'gray';
      break;
    case 'gesperrt':
      text = 'Gesperrt';
      farbe = 'red';
      break;
  }

  return (
    <span style={{ backgroundColor: farbe, color: 'white', padding: '4px 8px', borderRadius: '4px' }}>
      {text}
    </span>
  );
}

export default Abzeichen;