const Guerrero = require('../models/Guerrero');
const Mago = require('../models/Mago');
const Arquero = require('../models/Arquero');

const nombres = ['Krag', 'Zul', 'Drak', 'Morg', 'Thal', 'Xarn', 'Grum'];

function nombreAleatorio() {
  return nombres[Math.floor(Math.random() * nombres.length)];
}

function claseAleatoria(nombre) {
  const clases = [Guerrero, Mago, Arquero];
  const Clase = clases[Math.floor(Math.random() * clases.length)];
  return new Clase(nombre);
}

function generarEnemigo() {
  const nombre = nombreAleatorio();
  const enemigo = claseAleatoria(`Enemigo ${nombre}`);
  return enemigo;
}

module.exports = generarEnemigo;