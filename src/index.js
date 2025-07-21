const inquirer = require('inquirer');
const chalk = require('chalk');
chalk.blueBright.bold('...');
const Guerrero = require('./models/Guerrero');
const Mago = require('./models/Mago');
const Arquero = require('./models/Arquero');

console.clear();
console.log(chalk.blueBright.bold('🧙‍♂️ Bienvenido al Simulador de Batallas RPG 🗡️ \n'));

const personajes = [];

const mostrarMenu = async () => {
  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: '¿Qué deseas hacer?',
      choices: [
        'Crear personaje',
        'Ver personajes',
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
    case 'Salir':
      console.log(chalk.green('👋 ¡Hasta la próxima!'));
      process.exit();
  }

  await mostrarMenu(); // repetir el menú
};

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

