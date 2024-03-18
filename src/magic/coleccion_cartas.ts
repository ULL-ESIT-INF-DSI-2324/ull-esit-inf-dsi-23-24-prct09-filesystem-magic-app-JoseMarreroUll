import { Carta } from "./carta.js";

export class ColeccionCartas {
  private _cartas: Carta[] = []

  constructor(cartas?: Carta[]) {
    if (cartas) this._cartas = cartas;
  }
}