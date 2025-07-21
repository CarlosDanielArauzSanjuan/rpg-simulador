const Objeto = require('../models/Objeto');

const crearObjetosBasicos = () => {
  return [
    new Objeto('Poción de Vida', 'pocion', (p) => {
      p.recibirDaño(-30); // curar
    }),
    new Objeto('Espada de Hierro', 'arma', (p) => {
      p.fuerza += 10;
    }),
    new Objeto('Armadura Ligera', 'armadura', (p) => {
      p.recibirDaño = (d) => {
        p.estado.vida -= d * 0.8; // reduce daño
        console.log(`${p.nombre} recibió ${d * 0.8} de daño reducido.`);
      };
    }),
  ];
};

module.exports = crearObjetosBasicos;
