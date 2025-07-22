const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');

// 👉 archivo JSON donde se guarda la base de datos
const file = path.join(__dirname, 'personajes.json');

// 👉 Inicializamos lowdb con defaultData: obligatorio en lowdb v3
const adapter = new JSONFile(file);
const defaultData = { personajes: [] }; // esto evita el error
const db = new Low(adapter, defaultData);

async function initDB() {
  await db.read();
  await db.write(); // escribe defaultData si está vacío
}

module.exports = { db, initDB };