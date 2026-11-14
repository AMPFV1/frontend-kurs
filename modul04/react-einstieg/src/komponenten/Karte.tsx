import type { KarteProps } from '../typen/props';

function Karte({ titel, children }: KarteProps): React.JSX.Element {
  return (
    <div className="karte">
      <h1>{titel}</h1>
      {children}
    </div>
  );
}

export default Karte;
