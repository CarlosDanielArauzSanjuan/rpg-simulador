const Objeto = require('../models/Objeto');

/**
 * Genera objetos iniciales según la clase del personaje.
 * Cada objeto puede modificar atributos como vida, maná, fuerza o reducción de daño.
 * 
 * @param {string} clase - Clase del personaje: 'Mago', 'Guerrero', 'Arquero'
 * @returns {Objeto[]} - Lista de objetos aplicables a esa clase
 */
const crearObjetosBasicos = (clase = '') => {
  switch (clase.trim()) {
    case 'Mago':
      return [
        new Objeto('Báculo Arcano', 'arma', { fuerza: 5 }, 'Aumenta la fuerza mágica en +5'),
        new Objeto('Poción de Maná', 'pocion', { mana: 20 }, 'Restaura 20 puntos de maná'),
        new Objeto('Túnica Mágica', 'armadura', { reduccionDanio: 0.15 }, 'Reduce el daño recibido en un 15%'),
      ];

    case 'Guerrero':
      return [
        new Objeto('Espada de Hierro', 'arma', { fuerza: 10 }, 'Aumenta la fuerza física en +10'),
        new Objeto('Poción de Vida', 'pocion', { vida: 30 }, 'Restaura 30 puntos de vida'),
        new Objeto('Armadura Pesada', 'armadura', { reduccionDanio: 0.3 }, 'Reduce el daño recibido en un 30%'),
      ];

    case 'Arquero':
      return [
        new Objeto('Arco Largo', 'arma', { fuerza: 7 }, 'Aumenta la fuerza a distancia en +7'),
        new Objeto('Poción de Agilidad', 'pocion', { mana: 15 }, 'Restaura 15 puntos de maná'),
        new Objeto('Botas Ligeras', 'armadura', { reduccionDanio: 0.1 }, 'Reduce el daño recibido en un 10%'),
      ];

    default:
      console.warn(`⚠️ Clase no reconocida: "${clase}". No se generaron objetos.`);
      return [];
  }
};

module.exports = crearObjetosBasicos;