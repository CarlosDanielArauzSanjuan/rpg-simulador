const inquirer = require('inquirer');

class BatallaService {
  constructor(jugador1, jugador2, enemigoIA = false) {
    this.jugador1 = jugador1;
    this.jugador2 = jugador2;
    this.turno = 0;
    this.enemigoIA = enemigoIA;
  }

  async iniciar() {
    [this.jugador1, this.jugador2].forEach(p => p.restaurar());

    console.log(`\n💥 ¡Comienza la batalla entre ${this.jugador1.nombre} y ${this.jugador2.nombre}!\n`);

    while (this.vivos()) {
      const atacante = this.turno === 0 ? this.jugador1 : this.jugador2;
      const defensor = this.turno === 0 ? this.jugador2 : this.jugador1;

      console.log(`➡️ Turno de ${atacante.nombre}`);

      let tipoAtaque;

      // Acción IA
      if (this.enemigoIA && atacante === this.jugador2) {
        const opcionesIA = ['Atacar', 'Usar habilidad especial'];
        tipoAtaque = opcionesIA[Math.floor(Math.random() * opcionesIA.length)];
        console.log(`🤖 ${atacante.nombre} decide: ${tipoAtaque}`);
      } else {
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

if (tipoAtaque === 'Atacar') {
  const costo = 10;
  const manaActual = atacante.estado.mana;

  if (manaActual >= costo) {
    atacante.atacar(defensor);
  } else {
    console.log(`${atacante.nombre} no tiene suficiente maná para atacar.`);

    // 💤 Recuperar maná si no pudo atacar
    const clase = atacante.estado.clase;
    let recuperacion = 5;
    if (clase === 'Mago') recuperacion = 10;
    else if (clase === 'Arquero') recuperacion = 7;

    atacante.setMana(manaActual + recuperacion);
    console.log(`💤 ${atacante.nombre} recupera ${recuperacion} puntos de maná al descansar.`);
  }
} else if (tipoAtaque === 'Usar habilidad especial') {
        const manaActual = atacante.getMana?.() ?? atacante.estado.mana;
        const costoMana = 10;

        if (manaActual >= costoMana) {
          atacante.gastarMana(costoMana);
          atacante.habilidadEspecial(defensor);
        } else {
          console.log(`❌ ${atacante.nombre} no tiene suficiente maná para usar su habilidad especial.`);
          this._descansar(atacante);
        }

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

      this.mostrarEstado();

      if (!this.vivos()) break;

      this.turno = this.turno === 0 ? 1 : 0;
      console.log('\n---------------------------------\n');
    }

    const ganador = this.jugador1.estado.vida > 0 ? this.jugador1 : this.jugador2;
    console.log(`🏆 ¡${ganador.nombre} ha ganado la batalla!\n`);
  }

  /**
   * Recupera maná según clase si no puede actuar.
   * @param {Personaje} personaje
   */
  _descansar(personaje) {
    const clase = personaje.clase;
    let recuperacion = 15;
    if (clase === 'Mago') recuperacion = 10;
    else if (clase === 'Arquero') recuperacion = 7;

    const manaActual = personaje.getMana?.() ?? personaje.estado.mana;
    personaje.setMana(manaActual + recuperacion);
    console.log(`💤 ${personaje.nombre} recupera ${recuperacion} puntos de maná al descansar.`);
  }

  vivos() {
    return this.jugador1.estado.vida > 0 && this.jugador2.estado.vida > 0;
  }

  mostrarEstado() {
    const barra = (actual, max) => {
      const total = 20;
      const llenos = Math.round((actual / max) * total);
      return '█'.repeat(llenos) + '░'.repeat(total - llenos);
    };

    const imprimir = (p) => {
      const vidaMax = p.vidaMaxima ?? p.estado.vida;
      const manaMax = p.manaMaximo ?? p.estado.mana;
      const vida = p.estado.vida;
      const mana = p.estado.mana;

      return `┌────────────────────────────┐
│ 👤 ${p.nombre} (${p.clase})${' '.repeat(24 - p.nombre.length - p.clase.length)}│
│ 🩸 Vida: ${barra(vida, vidaMax)} ${vida}/${vidaMax} │
│ 🔮 Maná: ${barra(mana, manaMax)} ${mana}/${manaMax} │
│ 🎒 Objetos: ${p.inventario.length} disponible(s)${' '.repeat(9 - p.inventario.length.toString().length)}│
└────────────────────────────┘`;
    };

    console.log('\n📊 Estado actual:\n');
    console.log(imprimir(this.jugador1));
    console.log();
    console.log(imprimir(this.jugador2));
  }
}

module.exports = BatallaService;