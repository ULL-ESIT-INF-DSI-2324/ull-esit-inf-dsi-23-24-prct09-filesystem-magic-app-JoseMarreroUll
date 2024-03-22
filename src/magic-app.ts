/**
 * Aplicación de magia de cartas.
 * 
 * Esta aplicación permite realizar operaciones relacionadas con una colección de cartas.
 * Las operaciones disponibles son: agregar una carta a la colección, listar las cartas de un usuario,
 * leer los detalles de una carta de un usuario, actualizar los detalles de una carta de un usuario
 * y eliminar una carta de la colección de un usuario.
 * 
 * La aplicación utiliza la biblioteca yargs para manejar los comandos de línea de comandos.
 * 
 */

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

import chalk from "chalk";

import { Carta, Color, TipoCarta, Rareza } from './magic/carta.js';
import { ColeccionCartas } from './magic/coleccion_cartas.js';

const coleccion = new ColeccionCartas();

/**
 * Comando "add" para agregar una carta a la colección.
 */
yargs(hideBin(process.argv))
  .command({
    command: 'add',
    describe: 'Añade una carta a la colección',
    builder: (yargs) => {
      return yargs.options({
        user: {
          description: 'Nombre de usuario',
          type: 'string',
          demandOption: true
        },
        id: {
          description: 'ID de la carta',
          type: 'number',
          demandOption: true
        },
        name: {
          description: 'Nombre de la carta',
          type: 'string',
          demandOption: true
        },
        cost: {
          description: 'Costo de la carta',
          type: 'number',
          demandOption: true
        },
        color : {
          description: 'Color de la carta',
          type: 'string',
          demandOption: true
        },
        type: {
          description: 'Tipo de la carta',
          type: 'string',
          demandOption: true
        },
        rarity: {
          description: 'Rareza de la carta',
          type: 'string',
          demandOption: true
        },
        rules: {
          description: 'Reglas de la carta',
          type: 'string',
          demandOption: true
        },
        strength: {
          description: 'Fuerza de la carta',
          type: 'number',
          demandOption: false,
        },
        resistance: {
          description: 'Resistencia de la carta',
          type: 'number',
          demandOption: false
        },
        loyalty: {
          description: 'Marcadores de lealtad de la carta',
          type: 'string',
          demandOption: false
        },
        price: {
          description: 'Precio de mercado de la carta',
          type: 'number',
          demandOption: true
        }
      });
    },
    handler: (argv) => {
      let fuerza;
      if (!argv.strength) {
        fuerza = undefined; 
      } else {
        fuerza = argv.strength;
      }
      let resistencia;
      if (!argv.resistance) {
        resistencia = undefined;
      } else {
        resistencia = argv.resistance;
      }
      let lealtad;
      if (!argv.loyalty) {
        lealtad = undefined;
      } else {
        lealtad = argv.loyalty;
      }
      try {
        const card = new Carta(
          argv.id,
          argv.name,
          argv.cost,
          Color[argv.color],
          TipoCarta[argv.type],
          Rareza[argv.rarity],
          argv.rules,
          argv.price,
          fuerza,
          resistencia,
          lealtad
        );
        console.log(chalk.green(coleccion.addCarta(argv.user, card)));
      } catch (error) {
        console.error(chalk.red(error.message));
      }
    }
  })
  .help()
  .argv;

/**
 * Comando "list" para listar las cartas de un usuario.
 */
yargs(hideBin(process.argv))
  .command({
    command: 'list',
    describe: 'Lista la colección de un usuario',
    builder: (yargs) => {
      return yargs.options({
        user: {
          description: 'Nombre de usuario',
          type: 'string',
          demandOption: true
        }
      });
    },
    handler: (argv) => {
      try {
        console.log(coleccion.listCartas(argv.user));
      } catch (error) {
        console.error(chalk.red(error.message));
      }
    }
  })
  .help()
  .argv;

/**
 * Comando "read" para leer los detalles de una carta de un usuario.
 */
yargs(hideBin(process.argv))
  .command({
    command: 'read',
    describe: 'Lee los detalles de una carta de un usuario',
    builder: (yargs) => {
      return yargs.options({
        user: {
          description: 'Nombre de usuario',
          type: 'string',
          demandOption: true
        },
        id: {
          description: 'ID de la carta',
          type: 'number',
          demandOption: true
        }
      });
    },
    handler: (argv) => {
      try {
        console.log(coleccion.readCarta(argv.user, argv.id));
      } catch (error) {
        console.error(chalk.red(error.message));
      }
    }
  })
  .help()
  .argv;

/**
 * Comando "update" para actualizar los detalles de una carta de un usuario.
 */
yargs(hideBin(process.argv))
  .command({
    command: 'update',
    describe: 'Actualiza los detalles de una carta de un usuario',
    builder: (yargs) => {
      return yargs.options({
        user: {
          description: 'Nombre de usuario',
          type: 'string',
          demandOption: true
        },
        id: {
          description: 'ID de la carta',
          type: 'number',
          demandOption: true
        },
        name: {
          description: 'Nombre de la carta',
          type: 'string',
          demandOption: true
        },
        cost: {
          description: 'Costo de la carta',
          type: 'number',
          demandOption: true
        },
        color : {
          description: 'Color de la carta',
          type: 'string',
          demandOption: true
        },
        type: {
          description: 'Tipo de la carta',
          type: 'string',
          demandOption: true
        },
        rarity: {
          description: 'Rareza de la carta',
          type: 'string',
          demandOption: true
        },
        rules: {
          description: 'Reglas de la carta',
          type: 'string',
          demandOption: true
        },
        strength: {
          description: 'Fuerza de la carta',
          type: 'number',
          demandOption: false,
        },
        resistance: {
          description: 'Resistencia de la carta',
          type: 'number',
          demandOption: false
        },
        loyalty: {
          description: 'Marcadores de lealtad de la carta',
          type: 'string',
          demandOption: false
        },
        price: {
          description: 'Precio de mercado de la carta',
          type: 'number',
          demandOption: true
        }
      });
    },
    handler: (argv) => {
      let fuerza;
      if (!argv.strength) {
        fuerza = undefined; 
      } else {
        fuerza = argv.strength;
      }
      let resistencia;
      if (!argv.resistance) {
        resistencia = undefined;
      } else {
        resistencia = argv.resistance;
      }
      let lealtad;
      if (!argv.loyalty) {
        lealtad = undefined;
      } else {
        lealtad = argv.loyalty;
      }
      try {
        const card = new Carta(
          argv.id,
          argv.name,
          argv.cost,
          Color[argv.color],
          TipoCarta[argv.type],
          Rareza[argv.rarity],
          argv.rules,
          argv.price,
          fuerza,
          resistencia,
          lealtad
        );
        console.log(chalk.green(coleccion.modifyCarta(argv.user, card)));
      } catch (error) {
        console.error(chalk.red(error.message));
      }
    }
  })
  .help()
  .argv;

/**
 * Comando "remove" para eliminar una carta de la colección de un usuario.
 */
yargs(hideBin(process.argv))
  .command({
    command: 'remove',
    describe: 'Elimina una carta de la colección de un usuario',
    builder: (yargs) => {
      return yargs.options({
        user: {
          description: 'Nombre de usuario',
          type: 'string',
          demandOption: true
        },
        id: {
          description: 'ID de la carta',
          type: 'number',
          demandOption: true
        }
      });
    },
    handler: (argv) => {
      try {
        console.log(chalk.green(coleccion.removeCarta(argv.user, argv.id)));
      } catch (error) {
        console.error(chalk.red(error.message));
      }
    }
  })
  .help()
  .argv;