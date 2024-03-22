import { expect } from 'chai';
import 'mocha';

import { Carta, Color, TipoCarta, Rareza } from '../src/magic/carta.js';

describe('Carta', () => {
  it('should create a carta object', () => {
    const carta = new Carta(1, 'Carta Ejemplo', 3, Color.Azul, TipoCarta.Instantáneo, Rareza.Rara, 'Reglas de ejemplo', 10);
    expect(carta).to.be.an.instanceOf(Carta);
  });

  it('should throw error if a creature card misses strength or resistance', () => {
    expect(() => new Carta(1, 'Carta Ejemplo', 3, Color.Azul, TipoCarta.Criatura, Rareza.Rara, 'Reglas de ejemplo', 10)).to.throw('A card with type Criatura must have the attributes Strength and Resistance and no other one can have them');
    expect(() => new Carta(1, 'Carta Ejemplo', 3, Color.Azul, TipoCarta.Criatura, Rareza.Rara, 'Reglas de ejemplo', 10, 2)).to.throw('A card with type Criatura must have the attributes Strength and Resistance and no other one can have them');
    expect(() => new Carta(1, 'Carta Ejemplo', 3, Color.Azul, TipoCarta.Criatura, Rareza.Rara, 'Reglas de ejemplo', 10, undefined, 2)).to.throw('A card with type Criatura must have the attributes Strength and Resistance and no other one can have them');
    expect(() => new Carta(1, 'Carta Ejemplo', 3, Color.Azul, TipoCarta.Planeswalker, Rareza.Rara, 'Reglas de ejemplo', 10, 4, 2)).to.throw('A card with type Criatura must have the attributes Strength and Resistance and no other one can have them');
  });

  it('should throw error if a planeswalker card misses loyalty', () => {
    expect(() => new Carta(1, 'Carta Ejemplo', 3, Color.Azul, TipoCarta.Planeswalker, Rareza.Rara, 'Reglas de ejemplo', 10)).to.throw('A card with type Planeswalker must have the attribute Loyalty and no other one can have them');
    expect(() => new Carta(1, 'Carta Ejemplo', 3, Color.Azul, TipoCarta.Criatura, Rareza.Rara, 'Reglas de ejemplo', 10, 5, 6, 100)).to.throw('A card with type Planeswalker must have the attribute Loyalty and no other one can have them');
  });

  it('should create a carta object with creature attributes', () => {
    const carta = new Carta(1, 'Carta Ejemplo', 3, Color.Azul, TipoCarta.Criatura, Rareza.Rara, 'Reglas de ejemplo', 10, 2, 3);
    expect(carta._fuerza).to.equal(2);
    expect(carta._resistencia).to.equal(3);
  });

  it('should create a carta object with planeswalker attributes', () => {
    const carta = new Carta(1, 'Carta Ejemplo', 3, Color.Azul, TipoCarta.Planeswalker, Rareza.Rara, 'Reglas de ejemplo', 10, undefined, undefined, 4);
    expect(carta._lealtad).to.equal(4);
  });
});