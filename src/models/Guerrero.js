const Personaje = require('./Personaje');

class Guerrero extends Personaje {
  constructor(nombre) {
    super(nombre, 'Guerrero', 140, 18, 30); // vida alta, fuerza alta, maná bajo
  }

  habilidadEspecial(objetivo) {
    const costo = 15;
    if (!this.gastarMana(costo)) {
      console.log(`${this.nombre} no puede usar Ataque Furioso (maná insuficiente).`);
      return;
    }
    console.log(`${this.nombre} usa Ataque Furioso sobre ${objetivo.nombre}`);
    objetivo.recibirDaño(this.fuerza * 2);
  }
}

module.exports = Guerrero;