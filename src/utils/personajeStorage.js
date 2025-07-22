const fs = require('fs');
const path = require('path');

// 🗂️ Ruta del archivo donde se guardarán los personajes
const rutaArchivo = path.join(__dirname, '../data/personajes.json');

// ✅ FUNCIÓN PARA GUARDAR PERSONAJES EN EL ARCHIVO
function guardarPersonajes(personajes) {
  // Convertimos los personajes en un formato simple (JSON plano)
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
      inventario: p.inventario || [],
    };
  });

  // Escribimos el JSON al archivo con formato bonito
  fs.writeFileSync(rutaArchivo, JSON.stringify(data, null, 2), 'utf-8');
}

// ✅ FUNCIÓN PARA CARGAR PERSONAJES DESDE EL ARCHIVO
function cargarPersonajes(ClasesDisponibles) {
  // Si el archivo no existe, devolvemos una lista vacía
  if (!fs.existsSync(rutaArchivo)) return [];

  // Leemos el contenido del archivo como texto
  const raw = fs.readFileSync(rutaArchivo, 'utf-8');
  const datos = JSON.parse(raw);

  // ✅ Verificamos si es un array o un objeto con propiedad `personajes`
  const personajesRaw = Array.isArray(datos) ? datos : datos.personajes || [];

  // Creamos instancias de las clases originales (Guerrero, Mago, Arquero)
  return personajesRaw.map(p => {
    const Clase = ClasesDisponibles[p.clase];
    const personaje = new Clase(p.nombre);

    personaje.id = p.id;
    personaje.fuerza = p.fuerza;
    personaje.experiencia = p.experiencia;
    personaje.inventario = p.inventario || [];

    // Usamos setters si están definidos
    if (typeof personaje.setVida === 'function') personaje.setVida(p.vida);
    if (typeof personaje.setNivel === 'function') personaje.setNivel(p.nivel);

    return personaje;
  });
}

// 📤 Exportamos las funciones para usarlas en index.js u otros archivos
module.exports = {
  guardarPersonajes,
  cargarPersonajes,
};