const { v4: uuidv4 } = require('uuid');

/**
 * Clase que representa un objeto RPG (arma, poción, armadura).
 * Estos objetos pueden afectar solo vida, maná o el daño causado/recibido.
 */
class Objeto {
  /**
   * @param {string} nombre - Nombre del objeto (ej: "Espada de Hierro")
   * @param {string} tipo - Tipo del objeto: 'arma', 'pocion', 'armadura'
   * @param {Object} modificadores - Efectos a aplicar: { vida, mana, fuerza, reduccionDanio }
   * @param {string} descripcion - Descripción visible
   */
  constructor(nombre, tipo, modificadores = {}, descripcion = '') {
    this.id = uuidv4();
    this.nombre = nombre;
    this.tipo = tipo;
    this.modificadores = modificadores;
    this.descripcion = descripcion;
  }

  /**
   * Efecto inmediato: cura, aumenta fuerza o restaura maná.
   * Se llama al usar un objeto del inventario.
   */
  usar(personaje) {
    const { vida, mana, fuerza } = this.modificadores;

    if (typeof vida === 'number') personaje.recibirDaño(-vida); // curación
    if (typeof mana === 'number') personaje.setMana(personaje.estado.mana + mana);
    if (typeof fuerza === 'number') personaje.fuerza += fuerza;

    console.log(`${personaje.nombre} usó ${this.nombre}.`);
  }

  /**
   * Aplica efectos pasivos como fuerza o reducción de daño.
   * Se llama cuando el objeto se equipa (no se consume).
   */
  aplicar(personaje) {
    const { fuerza, reduccionDanio } = this.modificadores;

    if (typeof fuerza === 'number') {
      personaje.fuerza += fuerza;
    }

    if (typeof reduccionDanio === 'number') {
      personaje.reduccionDanio += reduccionDanio;
      console.log(`${personaje.nombre} gana ${Math.round(reduccionDanio * 100)}% de reducción de daño por ${this.nombre}.`);
    }
  }
}

module.exports = Objeto;