const fs = require('fs');
const path = require('path');

const rutaArchivo = path.join(__dirname, '../data/personajes.json');

function guardarPersonajes(personajes) {
  const data = personajes.map(p => ({
    id: p.id,
    nombre: p.nombre,
    clase: p.clase,
    fuerza: p.fuerza,
    experiencia: p.experiencia,
    // ⚠️ No se guarda la instancia entera, se rehidrata luego
  }));

  fs.writeFileSync(rutaArchivo, JSON.stringify(data, null, 2), 'utf-8');
}

function cargarPersonajes(ClasesDisponibles) {
  if (!fs.existsSync(rutaArchivo)) return [];

  const raw = fs.readFileSync(rutaArchivo, 'utf-8');
  const datos = JSON.parse(raw);

  return datos.map(p => {
    const Clase = ClasesDisponibles[p.clase];
    const instancia = new Clase(p.nombre);
    instancia.id = p.id;
    instancia.fuerza = p.fuerza;
    instancia.experiencia = p.experiencia;
    return instancia;
  });
}

module.exports = {
  guardarPersonajes,
  cargarPersonajes,
};