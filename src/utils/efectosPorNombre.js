module.exports = {
  'Espada de Hierro': (p) => { p.fuerza += 10; },
  'Báculo Arcano': (p) => { p.fuerza += 5; },
  'Arco Largo': (p) => { p.fuerza += 7; },

  'Poción de Vida': (p) => { p.recibirDaño(-30); },
  'Poción de Maná': (p) => {
    const manaActual = p.estado.mana;
    p.setMana(manaActual + 25);
  },
  'Poción de Agilidad': (p) => { p.recibirDaño(-15); },

  'Armadura Pesada': (p) => {
    const original = p.recibirDaño.bind(p);
    p.recibirDaño = (d) => original(d * 0.7);
  },
  'Túnica Mágica': (p) => {
    const original = p.recibirDaño.bind(p);
    p.recibirDaño = (d) => original(d * 0.85);
  },
  'Botas Ligeras': (p) => {
    const original = p.recibirDaño.bind(p);
    p.recibirDaño = (d) => original(d * 0.9);
  },
};