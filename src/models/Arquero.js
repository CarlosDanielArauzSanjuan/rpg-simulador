const Personaje = require('./Personaje');

class Arquero extends Personaje {
  constructor(nombre) {
    super(nombre, 'Arquero', 100, 12);
  }

  habilidadEspecial(objetivo) {
    console.log(`${this.nombre} dispara una Flecha Precisa a ${objetivo.nombre}`);
    objetivo.recibirDaño(this.fuerza * 1.5);
  }
}

module.exports = Arquero;