class BatallaService {
  constructor(jugador1, jugador2) {
    this.jugador1 = jugador1;
    this.jugador2 = jugador2;
    this.turno = 0; // 0 = jugador1, 1 = jugador2
  }

  async iniciar() {
    console.log(`\n💥 ¡Comienza la batalla entre ${this.jugador1.nombre} y ${this.jugador2.nombre}!\n`);

    while (this.vivos()) {
      const atacante = this.turno === 0 ? this.jugador1 : this.jugador2;
      const defensor = this.turno === 0 ? this.jugador2 : this.jugador1;

      console.log(`➡️ Turno de ${atacante.nombre}`);

      // Elegir tipo de ataque
      const { tipoAtaque } = await require('inquirer').prompt([
        {
          type: 'list',
          name: 'tipoAtaque',
          message: `¿Qué debe hacer ${atacante.nombre}?`,
          choices: [
            'Atacar',
            'Usar habilidad especial',
          ],
        },
      ]);

      if (tipoAtaque === 'Atacar') {
        atacante.atacar(defensor);
      } else {
        atacante.habilidadEspecial(defensor);
      }

      if (!this.vivos()) break;

      // Cambiar turno
      this.turno = this.turno === 0 ? 1 : 0;
      console.log('\n---------------------------------\n');
    }

    const ganador = this.jugador1.estado.vida > 0 ? this.jugador1 : this.jugador2;
    console.log(`🏆 ¡${ganador.nombre} ha ganado la batalla!\n`);
  }

  vivos() {
    return this.jugador1.estado.vida > 0 && this.jugador2.estado.vida > 0;
  }
}

module.exports = BatallaService;