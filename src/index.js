const inquirer = require('inquirer');
const chalk = require('chalk');

// Clases de personajes
const Guerrero = require('./models/Guerrero');
const Mago = require('./models/Mago');
const Arquero = require('./models/Arquero');

// Lógica de batalla
const BatallaService = require('./services/BatallaService');
const generarEnemigo = require('./utils/generarEnemigo');

// Utilidades
const crearObjetosBasicos = require('./utils/crearObjetosBasicos');
const { guardarPersonajes, cargarPersonajes } = require('./utils/PersonajeStorage');
const { initDB } = require('./data/db');

// Clases disponibles para crear personajes
const ClasesDisponibles = {
  Guerrero,
  Mago,
  Arquero,
};

let personajes = [];

console.log(chalk.blueBright.bold('🧙‍♂️ Bienvenido al Simulador de Batallas RPG 🗡️ \n'));



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
      'Ver inventario de un personaje',
      'Iniciar batalla',
      'Luchar contra enemigo IA',
      'Salir'
      ],
    },
  ]);

  
// Manejar la opción seleccionada
  switch (opcion) {
    case 'Crear personaje':
      await crearPersonaje();
      break;
    case 'Ver personajes':
      mostrarPersonajes();
      break;
    case 'Ver inventario de un personaje':
      await verInventarioDePersonaje();
      break;
    case 'Iniciar batalla':
      await iniciarBatalla(); 
      break;
    case 'Luchar contra enemigo IA':
      await lucharContraIA();
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

  // ✅ Generar objetos correctos para la clase
  const objetos = crearObjetosBasicos(clase);
  objetos.forEach(obj => personaje.agregarObjeto(obj));

  personajes.push(personaje);
  await guardarPersonajes(personajes);
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



// ------------------ FUNCION VER INVENTARIO ------------------

const verInventarioDePersonaje = async () => {
  if (personajes.length === 0) {
    console.log(chalk.yellow('⚠️ No hay personajes disponibles.\n'));
    return;
  }

  const { personajeId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'personajeId',
      message: 'Selecciona un personaje:',
      choices: personajes.map(p => ({ name: `${p.nombre} (${p.clase})`, value: p.id })),
    },
  ]);

  const personaje = personajes.find(p => p.id === personajeId);

  if (personaje.inventario.length === 0) {
    console.log(chalk.yellow('📦 Este personaje no tiene objetos.\n'));
    return;
  }

  console.log(chalk.cyan(`\n🎒 Inventario de ${personaje.nombre}:\n`));
  personaje.inventario.forEach((obj, i) => {
  console.log(`${i + 1}. ${obj.nombre} (${obj.tipo}) - ${obj.descripcion}`);  });
  console.log('');
};

// ------------------ FUNCION LUCHAR CONTRA ENEMIGO IA ------------------

const lucharContraIA = async () => {
  if (personajes.length === 0) {
    console.log(chalk.yellow('⚠️ Crea al menos un personaje antes de luchar.\n'));
    return;
  }

  const { personajeId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'personajeId',
      message: 'Selecciona tu personaje para la batalla:',
      choices: personajes.map(p => ({ name: `${p.nombre} (${p.clase})`, value: p.id })),
    },
  ]);

  const jugador = personajes.find(p => p.id === personajeId);

  const enemigo = generarEnemigo(); // ✅ esta línea es clave

  console.log(chalk.red(`\n😈 Aparece un enemigo: ${enemigo.nombre} (${enemigo.clase})\n`));

  const batalla = new BatallaService(jugador, enemigo, true);
  await batalla.iniciar();
};

// ------------------ INICIAR EL PROGRAMA ------------------

const main = async () => {
  await initDB();
  personajes = await cargarPersonajes(ClasesDisponibles);
  await mostrarMenu();
};

main();


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

