// Enumerado para los colores de las cartas
export enum Color {
  Blanco,
  Azul,
  Negro,
  Rojo,
  Verde,
  Incoloro,
  Multicolor
}

// Enumerado para los tipos de carta
export enum TipoCarta {
  Tierra,
  Criatura,
  Encantamiento,
  Conjuro,
  Instantáneo,
  Artefacto,
  Planeswalker
}

// Enumerado para las rarezas de las cartas
export enum Rareza {
  Común,
  Infrecuente,
  Rara,
  Mítica
}

export class Carta {
  _id: number;
  _nombre: string;
  _coste_mana: number;
  _color: Color;
  _tipo: TipoCarta;
  _rareza: Rareza;
  _reglas: string;
  _fuerza?: number; // Solo para cartas de tipo Criatura
  _resistencia?: number; // Solo para cartas de tipo Criatura
  _lealtad?: number; // Solo para cartas de tipo Planeswalker
  _valor: number;

  constructor(id: number, nombre: string, coste_mana: number, color: Color , tipo: TipoCarta, rareza: Rareza, reglas: string, valor: number, fuerza?: number, resistencia?: number, lealtad?: number) {
    this._id = id;
    this._nombre = nombre;
    this._coste_mana = coste_mana;
    if (color === undefined) throw new Error('Invalid color, try with: Blanco, Azul, Negro, Rojo, Verde, Incoloro or Multicolor (0 - 6)');
    this._color = color;
    if (tipo === undefined) throw new Error('Invalid type, try with: Tierra, Criatura, Encantamiento, Conjuro, Instantáneo, Artefacto or Planeswalker (0 - 6)');
    this._tipo = tipo;
    if (rareza === undefined) throw new Error('Invalid rarity, try with: Común, Infrecuente, Rara or Mítica (0 - 3)');
    this._rareza = rareza;
    this._reglas = reglas;
    this._valor = valor;
    if ((fuerza !== undefined && resistencia !== undefined && tipo === TipoCarta.Criatura)) {
      this._fuerza = fuerza;
      this._resistencia = resistencia;
    } else if ((fuerza === undefined || resistencia === undefined) && tipo === TipoCarta.Criatura){
      throw new Error('A card with type Criatura must have the attributes Strength and Resistance and no other one can have them');
    } else if (fuerza !== undefined && resistencia !== undefined && tipo !== TipoCarta.Criatura) {
      throw new Error('A card with type Criatura must have the attributes Strength and Resistance and no other one can have them');
    }
    if (lealtad !== undefined && tipo === TipoCarta.Planeswalker) {
      this._lealtad = lealtad;
    } else if (lealtad === undefined && tipo === TipoCarta.Planeswalker) {
      throw new Error('A card with type Planeswalker must have the attribute Loyalty and no other one can have them');
    } else if (lealtad !== undefined && tipo !== TipoCarta.Planeswalker) {
      throw new Error('A card with type Planeswalker must have the attribute Loyalty and no other one can have them');
    }
  }
}