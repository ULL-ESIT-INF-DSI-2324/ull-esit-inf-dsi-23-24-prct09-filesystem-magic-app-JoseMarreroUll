import { Carta, TipoCarta, Color, Rareza } from "./carta.js";
import fs from 'fs';

import chalk from "chalk";

export const multicolorText = chalk.red('M') + chalk.yellow('u') + chalk.blue('l') + chalk.green('t') + chalk.magenta('i') + 
                       chalk.cyan('c') + chalk.whiteBright('o') + chalk.redBright('l') + chalk.yellowBright('o') + chalk.greenBright('r');

// Clase que representa una colección de cartas.
export class ColeccionCartas {

  /**
   * Agrega una carta a la colección de un usuario.
   * @param user El nombre del usuario.
   * @param carta La carta a agregar.
   * @returns Un mensaje indicando que se ha agregado una nueva carta a la colección.
   * @throws Error si la carta ya existe en la colección del usuario.
   */
  addCarta(user: string, carta: Carta): string {
    const userFolder = `./data/${user}`;
    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder, { recursive: true });
    }
    if (fs.existsSync(`./data/${user}/${carta._id}.json`)) {
      throw new Error(`Card with id ${carta._id} already exists in ${user} collection!`);
    }
    fs.writeFileSync(`./data/${user}/${carta._id}.json`, JSON.stringify(carta));
    return `New card ${carta._nombre} added to ${user} collection!`;
  }


  /**
   * Lista todas las cartas de la colección de un usuario.
   * @param user El nombre del usuario.
   * @returns Una cadena que representa todas las cartas en la colección del usuario.
   * @throws Error si el usuario no existe o no ha agregado ninguna carta.
   */
  listCartas(user: string): string {
    const userFolder = `./data/${user}`;
    if (!fs.existsSync(userFolder)) {
      throw new Error(`User ${user} has never added a card and does not exist!`);
    }
    const files = fs.readdirSync(userFolder);
    let list = `${user} collection\n--------------------------------\n`;
    files.forEach(file => {
      const fileContent = fs.readFileSync(`${userFolder}/${file}`, 'utf-8');
      const carta :Carta = JSON.parse(fileContent);
      list += `ID: ${carta._id}\n` +
              `Name: ${carta._nombre}\n` +
              `Cost: ${carta._coste_mana}\n`;
      switch (carta._color) {
        case Color.Blanco:
          list += `Color: ${chalk.white(Color[carta._color])}\n`;
          break;
        case Color.Azul:
          list += `Color: ${chalk.blue(Color[carta._color])}\n`;
          break;
        case Color.Negro:
          list += `Color: ${chalk.black(Color[carta._color])}\n`;
          break;
        case Color.Rojo:
          list += `Color: ${chalk.red(Color[carta._color])}\n`;
          break;
        case Color.Verde:
          list += `Color: ${chalk.green(Color[carta._color])}\n`;
          break;
        case Color.Incoloro:
          list += `Color: ${chalk.gray(Color[carta._color])}\n`;
          break;
        case Color.Multicolor:
          list += `Color: ${multicolorText}\n`;
          break;
      }
      list += `Type: ${TipoCarta[carta._tipo]}\n` +
              `Rarity: ${Rareza[carta._rareza]}\n` +
              `Rules: ${carta._reglas}\n` +
              `Value: ${carta._valor}\n`;
      if (carta._fuerza !== undefined) {
        list += `Strength: ${carta._fuerza}\n` +
                `Resistance: ${carta._resistencia}\n` +
                `Market Price: ${carta._valor}\n` +
                `--------------------------------\n`;
      } else if (carta._lealtad !== undefined) {
        list += `Loyalty: ${carta._lealtad}\n` +
                `Market Price: ${carta._valor}\n` +
                `--------------------------------\n`;
      } else {
        list += `--------------------------------\n`;
      }
    });
    return list;
  }

  /**
   * Lee una carta de la colección de un usuario por su ID.
   * @param user El nombre del usuario.
   * @param id El ID de la carta.
   * @returns Una cadena que representa la carta solicitada.
   * @throws Error si el usuario no existe, la carta no existe o no se puede leer.
   */
  readCarta(user: string, id: number): string {
    const userFolder = `./data/${user}`;
    if (!fs.existsSync(userFolder)) {
      throw new Error(`User ${user} has never added a card and does not exist!`);
    }
    if (!fs.existsSync(`./data/${user}/${id}.json`)) {
      throw new Error(`Card with id ${id} does not exist in ${user} collection!`);
    }
    const fileContent = fs.readFileSync(`./data/${user}/${id}.json`, 'utf-8');
    const carta :Carta = JSON.parse(fileContent);
    let cartaString = `ID: ${carta._id}\n` +
                      `Name: ${carta._nombre}\n` +
                      `Cost: ${carta._coste_mana}\n`;
    switch (carta._color) {
      case Color.Blanco:
        cartaString += `Color: ${chalk.white(Color[carta._color])}\n`;
        break;
      case Color.Azul:
        cartaString += `Color: ${chalk.blue(Color[carta._color])}\n`;
        break;
      case Color.Negro:
        cartaString += `Color: ${chalk.black(Color[carta._color])}\n`;
        break;
      case Color.Rojo:
        cartaString += `Color: ${chalk.red(Color[carta._color])}\n`;
        break;
      case Color.Verde:
        cartaString += `Color: ${chalk.green(Color[carta._color])}\n`;
        break;
      case Color.Incoloro:
        cartaString += `Color: ${chalk.gray(Color[carta._color])}\n`;
        break;
      case Color.Multicolor:
        cartaString += `Color: ${multicolorText}\n`;
        break;
    }
    cartaString += `Type: ${TipoCarta[carta._tipo]}\n` +
                   `Rarity: ${Rareza[carta._rareza]}\n` +
                   `Rules: ${carta._reglas}\n` +
                   `Value: ${carta._valor}\n`;
      if (carta._fuerza !== undefined) {
        cartaString += `Strength: ${carta._fuerza}\n` +
                       `Resistance: ${carta._resistencia}\n` +
                       `Market Price: ${carta._valor}\n`;
      } else if (carta._lealtad !== undefined) {
        cartaString += `Loyalty: ${carta._lealtad}\n` +
                       `Market Price: ${carta._valor}\n`;
      }
    return cartaString;
  }

  /**
   * Modifica una carta existente en la colección del usuario.
   * @param user Nombre del usuario.
   * @param carta Objeto Carta modificado.
   * @returns Mensaje de confirmación.
   * @throws Error si el usuario no tiene cartas en su colección o si la carta especificada no existe.
   */
  modifyCarta(user: string, carta: Carta): string {
    const userFolder = `./data/${user}`;
    if (!fs.existsSync(userFolder)) {
      throw new Error(`User ${user} has never added a card and does not exist!`);
    }
    if (!fs.existsSync(`./data/${user}/${carta._id}.json`)) {
      throw new Error(`Card with id ${carta._id} does not exist in ${user} collection!`);
    }
    fs.writeFileSync(`./data/${user}/${carta._id}.json`, JSON.stringify(carta));
    return `Card with id ${carta._id} updated at ${user} collection!`;
  }

   /**
   * Elimina una carta de la colección del usuario.
   * @param user Nombre del usuario.
   * @param id ID de la carta a eliminar.
   * @returns Mensaje de confirmación.
   * @throws Error si el usuario no tiene cartas en su colección o si la carta especificada no existe.
   */
  removeCarta(user: string, id: number): string {
    const userFolder = `./data/${user}`;
    if (!fs.existsSync(userFolder)) {
      throw new Error(`User ${user} has never added a card and does not exist!`);
    }
    if (!fs.existsSync(`./data/${user}/${id}.json`)) {
      throw new Error(`Card with id ${id} does not exist in ${user} collection!`);
    }
    fs.unlinkSync(`./data/${user}/${id}.json`);
    return `Card with id ${id} removed from ${user} collection!`;
  }
}