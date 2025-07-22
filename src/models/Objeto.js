const { v4: uuidv4 } = require('uuid');

/**
 * Clase que representa un objeto (arma, poción, armadura) que puede usarse o aplicarse a un personaje.
 */
class Objeto {
  /**
   * @param {string} nombre - Nombre del objeto (ej: "Espada de Hierro")
   * @param {string} tipo - Tipo de objeto ('arma', 'pocion', 'armadura')
   * @param {Function} efecto - Función que se aplicará al personaje
   * @param {string} descripcion - Descripción visible del efecto (opcional)
   */
  constructor(nombre, tipo, efecto, descripcion = '') {
    this.id = uuidv4();
    this.nombre = nombre;
    this.tipo = tipo;         // 'arma', 'pocion', 'armadura'
    this.efecto = efecto;     // función (p) => { ... }
    this.descripcion = descripcion;
  }

  /**
   * Aplica el efecto como uso directo (por ejemplo, usar una poción).
   */
  usar(personaje) {
    if (typeof this.efecto === 'function') {
      this.efecto(personaje);
      console.log(`${personaje.nombre} usó ${this.nombre}`);
    } else {
      console.log(`⚠️ El objeto ${this.nombre} no tiene un efecto definido.`);
    }
  }

  /**
   * Aplica el efecto como mejora pasiva (ej: arma equipada, armadura equipada).
   */
  aplicar(personaje) {
    if (typeof this.efecto === 'function') {
      this.efecto(personaje);
      // Aquí no decimos "usó", porque no se "consume"
    } else {
      console.log(`⚠️ El objeto ${this.nombre} no tiene un efecto definido.`);
    }
  }
}

module.exports = Objeto;