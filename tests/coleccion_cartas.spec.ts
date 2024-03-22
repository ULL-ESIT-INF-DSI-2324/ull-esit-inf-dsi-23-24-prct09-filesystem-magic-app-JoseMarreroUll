import { expect } from 'chai';
import { Carta, TipoCarta, Color, Rareza } from '../src/magic/carta.js';
import { ColeccionCartas, multicolorText } from '../src/magic/coleccion_cartas.js';

import fs from 'fs';
import chalk from 'chalk';

const coleccion = new ColeccionCartas();

describe('ColeccionCartas', () => {
  before(() => {
    // Crear carpeta de datos de prueba si no existe
    if (!fs.existsSync('./data')) {
      fs.mkdirSync('./data');
    }
  });

  it('should add a carta to user collection', () => {
    const carta = new Carta(1, 'Carta Ejemplo', 3, Color.Azul, TipoCarta.Instantáneo, Rareza.Rara, 'Reglas de ejemplo', 10);
    const result = coleccion.addCarta('user1', carta);
    expect(result).to.equal(`New card Carta Ejemplo added to user1 collection!`);
    const fileExists = fs.existsSync(`./data/user1/1.json`);
    expect(fileExists).to.be.true;
  });

  it('should list cartas from user collection', () => {
    const carta1 = new Carta(1, 'Carta 1', 3, Color.Azul, TipoCarta.Instantáneo, Rareza.Rara, 'Reglas de ejemplo', 10);
    const carta2 = new Carta(2, 'Carta 2', 2, Color.Verde, TipoCarta.Criatura, Rareza.Común, 'Otras reglas', 5, 2, 3);
    coleccion.addCarta('user2', carta1);
    coleccion.addCarta('user2', carta2);
    const result = coleccion.listCartas('user2');
    const expectedOutput = `user2 collection\n` +
                           `--------------------------------\n` +
                           `ID: 1\n` +
                           `Name: Carta 1\n` +
                           `Cost: 3\n` +
                           `Color: ${chalk.blue('Azul')}\n` +
                           `Type: Instantáneo\n` +
                           `Rarity: Rara\n` +
                           `Rules: Reglas de ejemplo\n` +
                           `Value: 10\n` +
                           `--------------------------------\n` +
                           `ID: 2\n` +
                           `Name: Carta 2\n` +
                           `Cost: 2\n` +
                           `Color: ${chalk.green('Verde')}\n` +
                           `Type: Criatura\n` +
                           `Rarity: Común\n` +
                           `Rules: Otras reglas\n` +
                           `Value: 5\n` +
                           `Strength: 2\n` +
                           `Resistance: 3\n` +
                           `Market Price: 5\n` +
                           `--------------------------------\n`;
    expect(result).to.equal(expectedOutput);
  });

  it('should read a carta from user collection', () => {
    const carta = new Carta(1, 'Carta Ejemplo', 3, Color.Azul, TipoCarta.Instantáneo, Rareza.Rara, 'Reglas de ejemplo', 10);
    coleccion.addCarta('user3', carta);
    const result = coleccion.readCarta('user3', 1);
    const expectedOutput = `ID: 1\nName: Carta Ejemplo\nCost: 3\nColor: ${chalk.blue('Azul')}\nType: Instantáneo\nRarity: Rara\nRules: Reglas de ejemplo\nValue: 10\n`;
    expect(result).to.equal(expectedOutput);
  });

  it('should modify a carta in user collection', () => {
    const carta = new Carta(1, 'Carta Ejemplo', 3, Color.Azul, TipoCarta.Instantáneo, Rareza.Rara, 'Reglas de ejemplo', 10);
    coleccion.addCarta('user4', carta);
    const modifiedCarta = new Carta(1, 'Modified Carta', 2, Color.Verde, TipoCarta.Criatura, Rareza.Común, 'New rules', 8, 1, 1);
    const result = coleccion.modifyCarta('user4', modifiedCarta);
    expect(result).to.equal(`Card with id 1 updated at user4 collection!`);
    const fileContent = fs.readFileSync(`./data/user4/1.json`, 'utf-8');
    const cartaFromFile = JSON.parse(fileContent);
    expect(cartaFromFile._nombre).to.equal('Modified Carta');
    expect(cartaFromFile._color).to.equal(Color.Verde);
    expect(cartaFromFile._tipo).to.equal(TipoCarta.Criatura);
    expect(cartaFromFile._rareza).to.equal(Rareza.Común);
    expect(cartaFromFile._reglas).to.equal('New rules');
    expect(cartaFromFile._valor).to.equal(8);
    expect(cartaFromFile._fuerza).to.equal(1);
    expect(cartaFromFile._resistencia).to.equal(1);
  });

  it('should remove a carta from user collection', () => {
    const carta = new Carta(1, 'Carta Ejemplo', 3, Color.Azul, TipoCarta.Instantáneo, Rareza.Rara, 'Reglas de ejemplo', 10);
    coleccion.addCarta('user5', carta);
    const result = coleccion.removeCarta('user5', 1);
    expect(result).to.equal(`Card with id 1 removed from user5 collection!`);
    const fileExists = fs.existsSync(`./data/user5/1.json`);
    expect(fileExists).to.be.false;
  });

  it('should throw error when adding existing carta', () => {
    const carta = new Carta(1, 'Carta Ejemplo', 3, Color.Azul, TipoCarta.Instantáneo, Rareza.Rara, 'Reglas de ejemplo', 10);
    coleccion.addCarta('user', carta);
    expect(() => coleccion.addCarta('user', carta)).to.throw('Card with id 1 already exists in user collection!');
  });

  it('should throw error when listing cartas from non-existent user collection', () => {
    expect(() => coleccion.listCartas('nonexistentUser')).to.throw('User nonexistentUser has never added a card and does not exist!');
  });

  it('should throw error when reading non-existent carta', () => {
    expect(() => coleccion.readCarta('user', 999)).to.throw('Card with id 999 does not exist in user collection!');
  });

  it('should throw error when modifying non-existent carta', () => {
    const carta = new Carta(3, 'Carta Ejemplo', 3, Color.Rojo, TipoCarta.Instantáneo, Rareza.Mítica, 'Reglas de ejemplo', 10);
    expect(() => coleccion.modifyCarta('user', carta)).to.throw('Card with id 3 does not exist in user collection!');
  });

  it('should throw error when removing non-existent carta', () => {
    expect(() => coleccion.removeCarta('user', 999)).to.throw('Card with id 999 does not exist in user collection!');
  });

  it('should throw error when attempting to list cartas from a non-existent user collection', () => {
    const user = 'nonexistentUser';
    expect(() => coleccion.listCartas(user)).to.throw(`User ${user} has never added a card and does not exist!`);
  });

  it('should throw an error if user folder does not exist when removing a card', () => {
    const user = 'nonexistentUser';
    const id = 1;
    expect(() => coleccion.removeCarta(user, id)).to.throw(`User ${user} has never added a card and does not exist!`);
  });

  it('should throw an error if user folder does not exist when modifying a card', () => {
    const user = 'nonexistentUser';
    const carta1 = new Carta(1, 'Carta 1', 3, Color.Blanco, TipoCarta.Instantáneo, Rareza.Rara, 'Reglas de ejemplo', 10);
    expect(() => coleccion.modifyCarta(user, carta1)).to.throw(`User ${user} has never added a card and does not exist!`);
  });

  it('should throw an error if user folder does not exist when read a card', () => {
    const user = 'nonexistentUser';
    expect(() => coleccion.readCarta(user, 1)).to.throw(`User ${user} has never added a card and does not exist!`);
  });

  it('should list cartas from user collection with all colors', () => {
    coleccion.removeCarta('user', 1);

    const carta1 = new Carta(1, 'Carta 1', 3, Color.Blanco, TipoCarta.Instantáneo, Rareza.Rara, 'Reglas de ejemplo', 10);
    const carta2 = new Carta(2, 'Carta 2', 2, Color.Azul, TipoCarta.Criatura, Rareza.Común, 'Otras reglas', 5, 2, 3);
    const carta3 = new Carta(3, 'Carta 3', 4, Color.Negro, TipoCarta.Encantamiento, Rareza.Infrecuente, 'Más reglas', 8);
    const carta4 = new Carta(4, 'Carta 4', 1, Color.Rojo, TipoCarta.Conjuro, Rareza.Mítica, 'Reglas adicionales', 15);
    const carta5 = new Carta(5, 'Carta 5', 5, Color.Verde, TipoCarta.Artefacto, Rareza.Común, 'Reglas finales', 3);
    const carta6 = new Carta(6, 'Carta 6', 0, Color.Incoloro, TipoCarta.Instantáneo, Rareza.Rara, 'Reglas finales', 20);
    const carta7 = new Carta(7, 'Carta 7', 6, Color.Multicolor, TipoCarta.Criatura, Rareza.Mítica, 'Reglas finales', 30, 4, 4);
    
    coleccion.addCarta('user', carta1);
    coleccion.addCarta('user', carta2);
    coleccion.addCarta('user', carta3);
    coleccion.addCarta('user', carta4);
    coleccion.addCarta('user', carta5);
    coleccion.addCarta('user', carta6);
    coleccion.addCarta('user', carta7);

    const result = coleccion.listCartas('user');

    const expectedOutput = `user collection\n--------------------------------\n` +
  `ID: 1\n` +
  `Name: Carta 1\n` +
  `Cost: 3\n` +
  `Color: ${chalk.white('Blanco')}\n` +
  `Type: Instantáneo\n` +
  `Rarity: Rara\n` +
  `Rules: Reglas de ejemplo\n` +
  `Value: 10\n` +
  `--------------------------------\n` +
  `ID: 2\n` +
  `Name: Carta 2\n` +
  `Cost: 2\n` +
  `Color: ${chalk.blue('Azul')}\n` +
  `Type: Criatura\n` +
  `Rarity: Común\n` +
  `Rules: Otras reglas\n` +
  `Value: 5\n` +
  `Strength: 2\n` +
  `Resistance: 3\n` +
  `Market Price: 5\n` +
  `--------------------------------\n` +
  `ID: 3\n` +
  `Name: Carta 3\n` +
  `Cost: 4\n` +
  `Color: ${chalk.black('Negro')}\n` +
  `Type: Encantamiento\n` +
  `Rarity: Infrecuente\n` +
  `Rules: Más reglas\n` +
  `Value: 8\n` +
  `--------------------------------\n` +
  `ID: 4\n` +
  `Name: Carta 4\n` +
  `Cost: 1\n` +
  `Color: ${chalk.red('Rojo')}\n` +
  `Type: Conjuro\n` +
  `Rarity: Mítica\n` +
  `Rules: Reglas adicionales\n` +
  `Value: 15\n` +
  `--------------------------------\n` +
  `ID: 5\n` +
  `Name: Carta 5\n` +
  `Cost: 5\n` +
  `Color: ${chalk.green('Verde')}\n` +
  `Type: Artefacto\n` +
  `Rarity: Común\n` +
  `Rules: Reglas finales\n` +
  `Value: 3\n` +
  `--------------------------------\n` +
  `ID: 6\n` +
  `Name: Carta 6\n` +
  `Cost: 0\n` +
  `Color: ${chalk.gray('Incoloro')}\n` +
  `Type: Instantáneo\n` +
  `Rarity: Rara\n` +
  `Rules: Reglas finales\n` +
  `Value: 20\n` +
  `--------------------------------\n` +
  `ID: 7\n` +
  `Name: Carta 7\n` +
  `Cost: 6\n` +
  `Color: ${multicolorText}\n` +
  `Type: Criatura\n` +
  `Rarity: Mítica\n` +
  `Rules: Reglas finales\n` +
  `Value: 30\n` +
  `Strength: 4\n` +
  `Resistance: 4\n` +
  `Market Price: 30\n` +
  `--------------------------------\n`;

    expect(result).to.equal(expectedOutput);
  });
});
