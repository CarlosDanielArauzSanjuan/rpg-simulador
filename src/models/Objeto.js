const { v4: uuidv4 } = require('uuid');

class Objeto {
  constructor(nombre, tipo, efecto) {
    this.id = uuidv4();
    this.nombre = nombre;
    this.tipo = tipo; // 'arma', 'pocion', 'armadura'
    this.efecto = efecto; // función que se aplicará al personaje
  }

  usar(personaje) {
    if (typeof this.efecto === 'function') {
      this.efecto(personaje);
      console.log(`${personaje.nombre} usó ${this.nombre}`);
    }
  }
}

module.exports = Objeto;