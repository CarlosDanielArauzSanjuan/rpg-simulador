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
    this.inventario = [];
  }

  // 🗡️ Atacar a otro personaje
  atacar(objetivo) {
    console.log(`${this.nombre} ataca a ${objetivo.nombre}`);
    objetivo.recibirDaño(this.fuerza);
  }

  // ❤️‍🔥 Recibir daño o curación
  recibirDaño(cantidad) {
    this.#vida -= cantidad;

    if (cantidad > 0) {
      console.log(`${this.nombre} recibe ${cantidad} de daño`);
    } else {
      console.log(`${this.nombre} se cura ${-cantidad} puntos de vida`);
    }

    if (this.#vida < 0) this.#vida = 0;
  }

  // ⬆️ Subir de nivel
  subirNivel() {
    this.#nivel++;
    this.fuerza += 5;
    console.log(`${this.nombre} sube a nivel ${this.#nivel}`);
  }

  // 🎒 Agregar objeto y aplicar su efecto (como buff pasivo)
  agregarObjeto(objeto) {
    this.inventario.push(objeto);
    if (typeof objeto.aplicar === 'function') {
      objeto.aplicar(this);
    }
    console.log(`${this.nombre} obtuvo el objeto ${objeto.nombre}`);
  }

  // 🧪 Usar objeto (poción, arma, etc.)
  usarObjeto(indice) {
    const objeto = this.inventario[indice];

    if (!objeto) {
      console.log('Índice de objeto no válido.');
      return;
    }

    if (typeof objeto.usar === 'function') {
      objeto.usar(this);
      this.inventario.splice(indice, 1); // remover tras usarse
    } else {
      console.log(`${objeto.nombre} no se puede usar directamente.`);
    }
  }

  // Setters seguros (no obligatorios, pero útiles)
  setVida(cantidad) {
    this.#vida = cantidad;
  }

  setNivel(nivel) {
    this.#nivel = nivel;
  }

  // 📊 Estado público del personaje
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