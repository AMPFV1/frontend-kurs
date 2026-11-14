// Todo von jsonplaceholder.typicode.com/todos
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Daten, die beim Erstellen an den Server geschickt werden
export type NeuesTodo = Omit<Todo, 'id'>;

// Lokale Aufgabe der TodoApp (Übung 3.2)
export interface Aufgabe {
  id: number;
  text: string;
  erledigt: boolean;
}

export type AufgabenFilter = 'alle' | 'offen' | 'erledigt';
