const inquirer = require('inquirer');
const chalk = require('chalk');
const Guerrero = require('./models/Guerrero');
const Mago = require('./models/Mago');
const Arquero = require('./models/Arquero');
const BatallaService = require('./services/BatallaService');

console.clear();
console.log(chalk.blueBright.bold('🧙‍♂️ Bienvenido al Simulador de Batallas RPG 🗡️ \n'));

const personajes = [];


// ------------------ FUNCION MENU PRINCIPAL ------------------
const mostrarMenu = async () => {
  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: '¿Qué deseas hacer?',
      choices: [
       'Crear personaje',
       'Ver personajes',
       'Iniciar batalla', 
       'Salir',
      ],
    },
  ]);

  switch (opcion) {
    case 'Crear personaje':
      await crearPersonaje();
      break;
    case 'Ver personajes':
      mostrarPersonajes();
      break;
      
    case 'Iniciar batalla':
      await iniciarBatalla(); 
      break;
    case 'Salir':

      console.log(chalk.green('👋 ¡Hasta la próxima!'));
      process.exit();
  }

  await mostrarMenu(); // repetir el menú
};
// ------------------ FUNCION CREAR PERSONAJE ------------------
const crearPersonaje = async () => {
  const { nombre, clase } = await inquirer.prompt([
    {
      type: 'input',
      name: 'nombre',
      message: 'Nombre del personaje:',
      validate: input => input ? true : 'El nombre no puede estar vacío.',
    },
    {
      type: 'list',
      name: 'clase',
      message: 'Selecciona la clase:',
      choices: ['Guerrero', 'Mago', 'Arquero'],
    },
  ]);

  let personaje;

  switch (clase) {
    case 'Guerrero':
      personaje = new Guerrero(nombre);
      break;
    case 'Mago':
      personaje = new Mago(nombre);
      break;
    case 'Arquero':
      personaje = new Arquero(nombre);
      break;
  }

  personajes.push(personaje);
  console.log(chalk.green(`✅ ${clase} "${nombre}" creado exitosamente.\n`));
};


// ------------------ FUNCION MOSTRAR PERSONAJES  ------------------
const mostrarPersonajes = () => {
  if (personajes.length === 0) {
    console.log(chalk.yellow('⚠️ No hay personajes creados aún.\n'));
    return;
  }

  console.log(chalk.cyan('\n📜 Lista de personajes:\n'));
  personajes.forEach((p, index) => {
    const estado = p.estado;
    console.log(`${index + 1}. ${estado.nombre} (${estado.clase}) - Vida: ${estado.vida}, Fuerza: ${estado.fuerza}, Nivel: ${estado.nivel}`);
  });
  console.log('');
};


// ------------------ FUNCION INICIAR BATALLA ------------------

const BatallaService = require('./services/BatallaService');

const iniciarBatalla = async () => {
  if (personajes.length < 2) {
    console.log(chalk.red('❌ Se necesitan al menos 2 personajes para una batalla.\n'));
    return;
  }

  const { jugador1Id, jugador2Id } = await inquirer.prompt([
    {
      type: 'list',
      name: 'jugador1Id',
      message: 'Selecciona el primer personaje:',
      choices: personajes.map(p => ({ name: `${p.nombre} (${p.clase})`, value: p.id })),
    },
    {
      type: 'list',
      name: 'jugador2Id',
      message: 'Selecciona el segundo personaje:',
      choices: personajes.map(p => ({ name: `${p.nombre} (${p.clase})`, value: p.id })),
    },
  ]);

  if (jugador1Id === jugador2Id) {
    console.log(chalk.red('❌ No puedes seleccionar el mismo personaje dos veces.\n'));
    return;
  }

  const jugador1 = personajes.find(p => p.id === jugador1Id);
  const jugador2 = personajes.find(p => p.id === jugador2Id);

  const batalla = new BatallaService(jugador1, jugador2);
  await batalla.iniciar();
};


// Iniciar el programa
mostrarMenu();


// EJECUTAR LA APP 
// npm start

//test para prueba de clases
// const Guerrero = require('./models/Guerrero');
// const Mago = require('./models/Mago');
// const Arquero = require('./models/Arquero');

// const guerrero = new Guerrero('Thorin');
// const mago = new Mago('Gandalf');
// const arquero = new Arquero('Legolas');

// console.log(guerrero.estado);
// console.log(mago.estado);
// console.log(arquero.estado);

// guerrero.atacar(mago);
// mago.habilidadEspecial(guerrero);
// arquero.habilidadEspecial(mago);

