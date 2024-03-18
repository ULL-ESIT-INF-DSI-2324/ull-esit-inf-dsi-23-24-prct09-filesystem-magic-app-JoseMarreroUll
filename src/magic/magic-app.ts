import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

import chalk from "chalk";

import { Carta, Color, TipoCarta, Rareza } from './carta.js';
import { ColeccionCartas } from './coleccion_cartas.js';

const coleccion = new ColeccionCartas();

yargs(hideBin(process.argv))
  .command({
    command: 'add',
    describe: 'Adds a card to the collection',
    builder: (yargs) => {
      return yargs.options({
        user: {
          description: 'Username',
          type: 'string',
          demandOption: true
        },
        id: {
          description: 'Card ID',
          type: 'number',
          demandOption: true
        },
        name: {
          description: 'Card Name',
          type: 'string',
          demandOption: true
        },
        cost: {
          description: 'Card Cost',
          type: 'number',
          demandOption: true
        },
        color : {
          description: 'Card Color',
          type: 'string',
          demandOption: true
        },
        type: {
          description: 'Card Type',
          type: 'string',
          demandOption: true
        },
        rarity: {
          description: 'Card Rarity',
          type: 'string',
          demandOption: true
        },
        rules: {
          description: 'Card Rules',
          type: 'string',
          demandOption: true
        },
        strength: {
          description: 'Card Strength',
          type: 'number',
          demandOption: false,
        },
        resistance: {
          description: 'Card Resistance',
          type: 'number',
          demandOption: false
        },
        loyalty: {
          description: 'Card Loyalty Markers',
          type: 'string',
          demandOption: false
        },
        price: {
          description: 'Card Market Price',
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


yargs(hideBin(process.argv))
  .command({
    command: 'list',
    describe: 'Lits user collection',
    builder: (yargs) => {
      return yargs.options({
        user: {
          description: 'Username',
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


yargs(hideBin(process.argv))
  .command({
    command: 'read',
    describe: 'Read a card of user collection',
    builder: (yargs) => {
      return yargs.options({
        user: {
          description: 'Username',
          type: 'string',
          demandOption: true
        },
        id: {
          description: 'Card ID',
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


yargs(hideBin(process.argv))
  .command({
    command: 'update',
    describe: 'Update a card of user collection',
    builder: (yargs) => {
      return yargs.options({
        user: {
          description: 'Username',
          type: 'string',
          demandOption: true
        },
        id: {
          description: 'Card ID',
          type: 'number',
          demandOption: true
        },
        name: {
          description: 'Card Name',
          type: 'string',
          demandOption: true
        },
        cost: {
          description: 'Card Cost',
          type: 'number',
          demandOption: true
        },
        color : {
          description: 'Card Color',
          type: 'string',
          demandOption: true
        },
        type: {
          description: 'Card Type',
          type: 'string',
          demandOption: true
        },
        rarity: {
          description: 'Card Rarity',
          type: 'string',
          demandOption: true
        },
        rules: {
          description: 'Card Rules',
          type: 'string',
          demandOption: true
        },
        strength: {
          description: 'Card Strength',
          type: 'number',
          demandOption: false,
        },
        resistance: {
          description: 'Card Resistance',
          type: 'number',
          demandOption: false
        },
        loyalty: {
          description: 'Card Loyalty Markers',
          type: 'string',
          demandOption: false
        },
        price: {
          description: 'Card Market Price',
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


yargs(hideBin(process.argv))
  .command({
    command: 'remove',
    describe: 'Remove a card of user collection',
    builder: (yargs) => {
      return yargs.options({
        user: {
          description: 'Username',
          type: 'string',
          demandOption: true
        },
        id: {
          description: 'Card ID',
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