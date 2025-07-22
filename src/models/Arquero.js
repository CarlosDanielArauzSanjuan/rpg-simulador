const Personaje = require('./Personaje');

class Arquero extends Personaje {
  constructor(nombre) {
    super(nombre, 'Arquero', 100, 14, 60); // balanceado
  }

  habilidadEspecial(objetivo) {
    const costo = 12;
    if (!this.gastarMana(costo)) {
      console.log(`${this.nombre} intenta disparo doble (maná insuficiente).`);
      return;
    }
    console.log(`${this.nombre} realiza Disparo Doble sobre ${objetivo.nombre}`);
    objetivo.recibirDaño(this.fuerza + 8);
  }
}

module.exports = Arquero;