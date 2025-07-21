const Personaje = require('./Personaje');

class Mago extends Personaje {
  constructor(nombre) {
    super(nombre, 'Mago', 80, 8);
    this.mana = 100;
  }

  habilidadEspecial(objetivo) {
    if (this.mana >= 30) {
      console.log(`${this.nombre} lanza Bola de Fuego sobre ${objetivo.nombre}`);
      objetivo.recibirDaño(this.fuerza * 3);
      this.mana -= 30;
    } else {
      console.log(`${this.nombre} no tiene suficiente mana.`);
    }
  }
}

module.exports = Mago;