// Enumerado para los colores de las cartas
enum Color {
  Blanco,
  Azul,
  Negro,
  Rojo,
  Verde,
  Incoloro,
  Multicolor
}

// Enumerado para los tipos de carta
enum TipoCarta {
  Tierra,
  Criatura,
  Encantamiento,
  Conjuro,
  Instantaneo,
  Artefacto,
  Planeswalker
}

// Enumerado para las rarezas de las cartas
enum Rareza {
  Comun,
  Infrecuente,
  Rara,
  Mitica
}

export interface Carta {
  id: number;
  nombre: string;
  coste_mana: number;
  color: Color;
  tipo: TipoCarta;
  rareza: Rareza;
  reglas: string;
  fuerza_resistencia?: [number, number]; // Solo para cartas de tipo Criatura
  lealtad?: number; // Solo para cartas de tipo Planeswalker
  valor: number;
}