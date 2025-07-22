const Guerrero = require('./src/models/Guerrero');
const Mago = require('./src/models/Mago');
const Arquero = require('./src/models/Arquero');

const g = new Guerrero('TestGuerrero');
const m = new Mago('TestMago');
const a = new Arquero('TestArquero');

console.assert(g.nombre === 'TestGuerrero', '❌ Guerrero nombre incorrecto');
console.assert(g.clase === 'Guerrero', '❌ Guerrero clase incorrecta');
console.assert(typeof g.atacar === 'function', '❌ Guerrero no tiene método atacar');

const vidaAntes = a.estado.vida;
m.habilidadEspecial(a);
const vidaDespues = a.estado.vida;

console.assert(vidaDespues < vidaAntes, '❌ El Mago no causó daño con habilidadEspecial');

console.log('✅ Todos los tests básicos pasaron correctamente.');

// // Test Personaje base
// const Personaje = require('./src/models/personaje');
// const p = new Personaje('TestP', 'Guerrero');
// console.assert(p.nombre === 'TestP', '❌ Personaje nombre incorrecto');
// console.assert(p.clase === 'Guerrero', '❌ Clase incorrecta en Personaje'); 
// console.assert(p.estado.vida > 0, '❌ Vida inicial del Personaje debe ser mayor a 0'); 
// console.assert(p.estado.nivel === 1, '❌ Nivel inicial del Personaje debe ser 1');  
// console.assert(p.estado.fuerza > 0, '❌ Fuerza inicial del Personaje debe ser mayor a 0');
// console.assert(p.inventario.length === 0, '❌ Inventario del Personaje debe estar vacío al inicio');
