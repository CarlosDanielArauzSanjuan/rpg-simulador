const Objeto = require('../models/Objeto');

/**
 * Genera objetos iniciales apropiados según la clase del personaje.
 * Cada objeto tiene un efecto único que se aplica al personaje al usarse.
 *
 * @param {string} clase - La clase del personaje (Guerrero, Mago, Arquero)
 * @returns {Objeto[]} - Lista de objetos específicos para esa clase
 */
const crearObjetosBasicos = (clase) => {
  switch (clase) {

    case 'Mago':
      return [
        new Objeto('Báculo Arcano', 'arma', (p) => {
          p.fuerza += 5;
        }, 'Aumenta la fuerza mágica en +5'),

        new Objeto('Poción de Maná', 'pocion', (p) => {
          p.recibirDaño(-20);
        }, 'Restaura 20 puntos de vida'),

        new Objeto('Túnica Mágica', 'armadura', (p) => {
          p.recibirDaño = (d) => {
            p.estado.vida -= d * 0.85;
            console.log(`${p.nombre} recibió ${d * 0.85} de daño mágico reducido.`);
          };
        }, 'Reduce el daño recibido un 15%'),
      ];

    case 'Guerrero':
      return [
        new Objeto('Espada de Hierro', 'arma', (p) => {
          p.fuerza += 10;
        }, 'Aumenta la fuerza física en +10'),

        new Objeto('Poción de Vida', 'pocion', (p) => {
          p.recibirDaño(-30);
        }, 'Restaura 30 puntos de vida'),

        new Objeto('Armadura Pesada', 'armadura', (p) => {
          p.recibirDaño = (d) => {
            p.estado.vida -= d * 0.7;
            console.log(`${p.nombre} recibió ${d * 0.7} de daño (armadura pesada).`);
          };
        }, 'Reduce el daño recibido un 30%'),
      ];

    case 'Arquero':
      return [
        new Objeto('Arco Largo', 'arma', (p) => {
          p.fuerza += 7;
        }, 'Aumenta la fuerza a distancia en +7'),

        new Objeto('Poción de Agilidad', 'pocion', (p) => {
          p.recibirDaño(-15);
        }, 'Restaura 15 puntos de vida'),

        new Objeto('Botas Ligeras', 'armadura', (p) => {
          p.recibirDaño = (d) => {
            p.estado.vida -= d * 0.9;
            console.log(`${p.nombre} recibió ${d * 0.9} de daño (botas ligeras).`);
          };
        }, 'Reduce el daño recibido un 10%'),
      ];

    default:
      return [];
  }
};

module.exports = crearObjetosBasicos;