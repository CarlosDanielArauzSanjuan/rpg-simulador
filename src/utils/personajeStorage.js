const fs = require('fs');
const path = require('path');
const Objeto = require('../models/Objeto'); // Clase Objeto
const efectos = require('./efectosPorNombre'); // Mapeo de nombre → función efecto

// 🗂️ Ruta al archivo JSON donde se guardan los personajes
const rutaArchivo = path.join(__dirname, '../data/personajes.json');

/**
 * Guarda la lista de personajes como JSON plano en el sistema de archivos.
 * @param {Personaje[]} personajes 
 */
function guardarPersonajes(personajes) {
  const data = personajes.map(p => {
    const estado = p.estado;
    return {
      id: estado.id,
      nombre: estado.nombre,
      clase: estado.clase,
      fuerza: estado.fuerza,
      experiencia: estado.experiencia,
      nivel: estado.nivel,
      vida: estado.vida,
      mana: estado.mana,
      reduccionDanio: p.reduccionDanio || 0, // ✅ Guardar efecto pasivo si aplica
      inventario: p.inventario.map(obj => ({
        id: obj.id,
        nombre: obj.nombre,
        tipo: obj.tipo,
        descripcion: obj.descripcion
        // El efecto se vuelve a mapear al cargar
      })),
    };
  });

  fs.writeFileSync(rutaArchivo, JSON.stringify(data, null, 2), 'utf-8');
}

/**
 * Carga los personajes desde el archivo y los reconstruye con sus clases y objetos.
 * @param {Object} ClasesDisponibles - Mapeo de clases por nombre: { Guerrero, Mago, ... }
 * @returns {Personaje[]}
 */
function cargarPersonajes(ClasesDisponibles) {
  if (!fs.existsSync(rutaArchivo)) return [];

  const raw = fs.readFileSync(rutaArchivo, 'utf-8');
  const datos = JSON.parse(raw);
  const personajesRaw = Array.isArray(datos) ? datos : datos.personajes || [];

  return personajesRaw.map(p => {
    const Clase = ClasesDisponibles[p.clase];
    const personaje = new Clase(p.nombre);

    personaje.id = p.id;
    personaje.fuerza = p.fuerza;
    personaje.experiencia = p.experiencia;

    if (typeof personaje.setVida === 'function') personaje.setVida(p.vida);
    if (typeof personaje.setNivel === 'function') personaje.setNivel(p.nivel);
    if (typeof personaje.setMana === 'function') personaje.setMana(p.mana);

    // ✅ Restaurar reducción de daño si fue aplicada anteriormente
    personaje.reduccionDanio = p.reduccionDanio || 0;

    // ✅ Restaurar objetos desde JSON como instancias de Objeto con sus efectos
    personaje.inventario = (p.inventario || []).map(o => {
      const efecto = efectos[o.nombre] || (() => {});
      return new Objeto(o.nombre, o.tipo, efecto, o.descripcion);
    });

    return personaje;
  });
}

module.exports = {
  guardarPersonajes,
  cargarPersonajes,
};