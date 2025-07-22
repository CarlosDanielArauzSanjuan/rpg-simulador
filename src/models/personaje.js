const { v4: uuidv4 } = require('uuid');

/**
 * Clase base para personajes RPG.
 * Contiene atributos como vida, maná, fuerza, nivel, inventario y métodos comunes.
 */
class Personaje {
  #vida;
  #nivel;
  #mana;

  /**
   * @param {string} nombre - Nombre del personaje
   * @param {string} clase - Clase del personaje (Guerrero, Mago, Arquero)
   * @param {number} vida - Vida inicial
   * @param {number} fuerza - Fuerza base
   * @param {number} mana - Maná inicial
   */
  constructor(nombre, clase, vida = 100, fuerza = 10, mana = 50) {
    this.id = uuidv4();
    this.nombre = nombre;
    this.clase = clase;
    this.#vida = vida;
    this.#mana = mana;
    this.#nivel = 1;
    this.fuerza = fuerza;
    this.experiencia = 0;
    this.reduccionDanio = 0; // Afectado por armaduras u objetos pasivos
    this.inventario = [];

    this.vidaMaxima = vida;
    this.manaMaximo = mana;
  }

  /**
   * Ejecuta un ataque básico contra otro personaje.
   * Consume maná.
   * @param {Personaje} objetivo 
   */
atacar(objetivo) {
  const costo = 10;
  if (!this.gastarMana(costo)) {
    console.log(`${this.nombre} no tiene suficiente maná para atacar.`);

    // 💤 Recuperar maná si no puede atacar
    const clase = this.clase;
    let recuperacion = 5;
    if (clase === 'Mago') recuperacion = 10;
    else if (clase === 'Arquero') recuperacion = 7;

    this.setMana(this.estado.mana + recuperacion);
    console.log(`💤 ${this.nombre} recupera ${recuperacion} puntos de maná al descansar.`);
    return;
  }

  console.log(`${this.nombre} ataca a ${objetivo.nombre} (costo ${costo} MP)`);
  objetivo.recibirDaño(this.fuerza);
}

  /**
   * Aplica daño o curación.
   * Se tiene en cuenta la reducción de daño.
   * @param {number} cantidad 
   */
  recibirDaño(cantidad) {
    let cantidadFinal = cantidad;

    if (cantidad > 0 && this.reduccionDanio > 0) {
      cantidadFinal = Math.round(cantidad * (1 - this.reduccionDanio));
    }

    this.#vida -= cantidadFinal;
    if (this.#vida < 0) this.#vida = 0;

    const mensaje = cantidad >= 0
      ? `${this.nombre} recibe ${cantidadFinal} de daño`
      : `${this.nombre} se cura ${-cantidad} de vida`;

    console.log(mensaje);
  }

  /**
   * Intenta gastar maná.
   * @param {number} cantidad 
   * @returns {boolean}
   */
  gastarMana(cantidad) {
    if (this.#mana < cantidad) {
      console.log(`${this.nombre} no tiene suficiente maná.`);
      return false;
    }
    this.#mana -= cantidad;
    return true;
  }

  /**
   * Sube de nivel aumentando atributos.
   */
  subirNivel() {
    this.#nivel++;
    this.fuerza += 5;
    this.manaMaximo += 10;
    this.#mana = this.manaMaximo;
    console.log(`${this.nombre} sube a nivel ${this.#nivel}`);
  }

  /**
   * Agrega un objeto al inventario.
   * @param {Objeto} objeto 
   */
  agregarObjeto(objeto) {
    this.inventario.push(objeto);
    console.log(`${this.nombre} obtuvo el objeto ${objeto.nombre}`);
  }

  /**
   * Usa un objeto del inventario (por índice) y lo consume.
   * @param {number} indice 
   */
  usarObjeto(indice) {
    const objeto = this.inventario[indice];
    if (!objeto) {
      console.log('Índice de objeto no válido.');
      return;
    }

    // Validación extra (ej: no curar si ya está al máximo)
    const { vida, mana } = objeto.modificadores;
    const estado = this.estado;

    if (vida && estado.vida >= this.vidaMaxima) {
      console.log(`${this.nombre} ya tiene la vida al máximo. No se usa ${objeto.nombre}.`);
      return;
    }

    if (mana && estado.mana >= this.manaMaximo) {
      console.log(`${this.nombre} ya tiene el maná al máximo. No se usa ${objeto.nombre}.`);
      return;
    }

    objeto.usar(this);
    this.inventario.splice(indice, 1);
  }

  /**
   * Restaura vida y maná al máximo.
   */
  restaurar() {
    this.#vida = this.vidaMaxima;
    this.#mana = this.manaMaximo;
  }

  /**
   * Setters usados al cargar desde archivos.
   */
  setVida(cantidad) {
    this.#vida = Math.min(cantidad, this.vidaMaxima);
  }

  setMana(m) {
    this.#mana = Math.min(m, this.manaMaximo);
  }

  setNivel(nivel) {
    this.#nivel = nivel;
  }

  /**
   * Devuelve el estado actual visible del personaje.
   */
  get estado() {
    return {
      id: this.id,
      nombre: this.nombre,
      clase: this.clase,
      vida: this.#vida,
      nivel: this.#nivel,
      fuerza: this.fuerza,
      mana: this.#mana
    };
  }
}

module.exports = Personaje;