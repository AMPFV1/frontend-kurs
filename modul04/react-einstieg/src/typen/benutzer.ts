// Benutzer von jsonplaceholder.typicode.com/users
export interface Benutzer {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

// Nur id und Name — z. B. für eine Auswahlliste
export type BenutzerKurz = Pick<Benutzer, 'id' | 'name'>;
