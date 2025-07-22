const inquirer = require('inquirer');

class BatallaService {
  constructor(jugador1, jugador2, enemigoIA = false) {
    this.jugador1 = jugador1;
    this.jugador2 = jugador2;
    this.turno = 0;
    this.enemigoIA = enemigoIA;
  }

  async iniciar() {
    console.log(`\n💥 ¡Comienza la batalla entre ${this.jugador1.nombre} y ${this.jugador2.nombre}!\n`);

    while (this.vivos()) {
      const atacante = this.turno === 0 ? this.jugador1 : this.jugador2;
      const defensor = this.turno === 0 ? this.jugador2 : this.jugador1;

      console.log(`➡️ Turno de ${atacante.nombre}`);

      let tipoAtaque;

      // Si el segundo jugador es IA, elige aleatoriamente qué hacer
      if (this.enemigoIA && atacante === this.jugador2) {
        const opcionesIA = ['Atacar', 'Usar habilidad especial'];
        tipoAtaque = opcionesIA[Math.floor(Math.random() * opcionesIA.length)];
        console.log(`🤖 ${atacante.nombre} decide: ${tipoAtaque}`);
      } else {
        // Jugador humano elige acción
        const respuesta = await inquirer.prompt([
          {
            type: 'list',
            name: 'tipoAtaque',
            message: `¿Qué debe hacer ${atacante.nombre}?`,
            choices: ['Atacar', 'Usar habilidad especial', 'Usar objeto'],
          },
        ]);
        tipoAtaque = respuesta.tipoAtaque;
      }

      // Ejecutar acción seleccionada
      if (tipoAtaque === 'Atacar') {
        atacante.atacar(defensor);
      } else if (tipoAtaque === 'Usar habilidad especial') {
        atacante.habilidadEspecial(defensor);
      } else if (tipoAtaque === 'Usar objeto') {
        if (atacante.inventario.length === 0) {
          console.log(`${atacante.nombre} no tiene objetos disponibles.`);
        } else {
          const { objetoIndex } = await inquirer.prompt([
            {
              type: 'list',
              name: 'objetoIndex',
              message: `Selecciona un objeto para usar:`,
              choices: atacante.inventario.map((obj, i) => ({
                name: `${obj.nombre} (${obj.tipo})`,
                value: i,
              })),
            },
          ]);
          atacante.usarObjeto(objetoIndex);
        }
      }

      // Mostrar estado actual de vida
      console.log(`🩸 Vida actual -> ${this.jugador1.nombre}: ${this.jugador1.estado.vida} | ${this.jugador2.nombre}: ${this.jugador2.estado.vida}`);

      // Verificar si la batalla terminó
      if (!this.vivos()) break;

      // Cambiar de turno
      this.turno = this.turno === 0 ? 1 : 0;
      console.log('\n---------------------------------\n');
    }

    // Mostrar ganador
    const ganador = this.jugador1.estado.vida > 0 ? this.jugador1 : this.jugador2;
    console.log(`🏆 ¡${ganador.nombre} ha ganado la batalla!\n`);
  }

  // Verifica que ambos estén vivos
  vivos() {
    return this.jugador1.estado.vida > 0 && this.jugador2.estado.vida > 0;
  }
}

module.exports = BatallaService;