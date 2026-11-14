// Preis als Euro-Betrag formatieren, z. B. 19.99 -> "19,99 €"
export function formatierePreis(preis: number): string {
  return preis.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}
