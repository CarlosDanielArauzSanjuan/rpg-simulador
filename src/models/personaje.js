const { v4: uuidv4 } = require('uuid');

class Personaje {
  #vida;
  #nivel;

  
// Constructor de la clase Personaje
  constructor(nombre, clase, vida = 100, fuerza = 10) {
    this.id = uuidv4();
    this.nombre = nombre;
    this.clase = clase;
    this.#vida = vida;
    this.#nivel = 1;
    this.fuerza = fuerza;
    this.experiencia = 0;
    this.inventario = [];
  };


// Métodos de la clase Personaje

  atacar(objetivo) {
    console.log(`${this.nombre} ataca a ${objetivo.nombre}`);
    objetivo.recibirDaño(this.fuerza);
  };

  recibirDaño(cantidad) {
    this.#vida -= cantidad;
    console.log(`${this.nombre} recibe ${cantidad} de daño`);
  };

  subirNivel() {
    this.#nivel++;
    this.fuerza += 5;
    console.log(`${this.nombre} sube a nivel ${this.#nivel}`);
  };

  agregarObjeto(objeto) {
    this.inventario.push(objeto);
    console.log(`${this.nombre} obtuvo el objeto ${objeto.nombre}`);
  };

  usarObjeto(indice) {
  if (this.inventario[indice]) {
    this.inventario[indice].usar(this); // le pasa "this" al objeto
    this.inventario.splice(indice, 1); // se elimina el objeto del inventario tras usarse
  } else {
    console.log('Índice de objeto no válido.');
  }
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
