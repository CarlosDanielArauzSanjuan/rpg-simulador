const Personaje = require('./Personaje');

class Mago extends Personaje {
  constructor(nombre) {
    super(nombre, 'Mago', 80, 12, 100); // vida baja, fuerza media, mucho maná
  }

  habilidadEspecial(objetivo) {
    const costo = 20;
    if (!this.gastarMana(costo)) {
      console.log(`${this.nombre} no puede lanzar Bola de Fuego (maná insuficiente).`);
      return;
    }
    console.log(`${this.nombre} lanza Bola de Fuego sobre ${objetivo.nombre}`);
    objetivo.recibirDaño(this.fuerza * 2);
  }
}

module.exports = Mago;