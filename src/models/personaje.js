const { v4: uuidv4 } = require('uuid');

class Personaje {
  #vida;
  #nivel;

  constructor(nombre, clase, vida = 100, fuerza = 10) {
    this.id = uuidv4();
    this.nombre = nombre;
    this.clase = clase;
    this.#vida = vida;
    this.#nivel = 1;
    this.fuerza = fuerza;
    this.experiencia = 0;
  }

  atacar(objetivo) {
    console.log(`${this.nombre} ataca a ${objetivo.nombre}`);
    objetivo.recibirDaño(this.fuerza);
  }

  recibirDaño(cantidad) {
    this.#vida -= cantidad;
    console.log(`${this.nombre} recibe ${cantidad} de daño`);
  }

  subirNivel() {
    this.#nivel++;
    this.fuerza += 5;
    console.log(`${this.nombre} sube a nivel ${this.#nivel}`);
  }

  get estado() {
    return {
      id: this.id,
      nombre: this.nombre,
      clase: this.clase,
      vida: this.#vida,
      nivel: this.#nivel,
      fuerza: this.fuerza,
    };
  }
}

module.exports = Personaje;

// console.clear();
// console.log('Bienvenido al Simulador de Batallas RPG');
// const Personaje = require('./models/personajes');
