const Personaje = require('./Personaje');

class Guerrero extends Personaje {
  constructor(nombre) {
    super(nombre, 'Guerrero', 120, 15);
  }

  habilidadEspecial(objetivo) {
    console.log(`${this.nombre} usa Ataque Furioso sobre ${objetivo.nombre}`);
    objetivo.recibirDaño(this.fuerza * 2);
  }
}

module.exports = Guerrero;