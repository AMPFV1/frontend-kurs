interface BenutzerInfoProps {
  name: string;
  email: string;
  berufsbezeichnung?: string;
}

function BenutzerInfo({ name, email, berufsbezeichnung }: BenutzerInfoProps): React.JSX.Element {
  return (
    <div className="benutzer-info">
      <h2>{name}</h2>
      <p>Email: {email}</p>
      {berufsbezeichnung && <p>Berufsbezeichnung: {berufsbezeichnung}</p>}
    </div>
  );
}


export default BenutzerInfo;
