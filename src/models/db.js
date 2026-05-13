const { Pool } = require('pg');

// Pool = un ensemble de connexions réutilisables vers la base de données.
// Plutôt que d'ouvrir/fermer une connexion à chaque requête, on garde
// un "pool" de connexions ouvertes et on les réutilise.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // En production (Scalingo), la connexion PostgreSQL exige le SSL.
  // En local on le désactive pour ne pas avoir d'erreur de certificat.
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Fonction utilitaire pour exécuter une requête SQL.
// On passe toujours les valeurs en paramètres séparés ($1, $2...)
// pour éviter les injections SQL — jamais concatener des strings directement.
function query(text, params) {
  return pool.query(text, params);
}

// Crée la table todos si elle n'existe pas encore.
// Appelée au démarrage du serveur pour s'assurer que la structure est en place.
async function initDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id         SERIAL PRIMARY KEY,
      title      VARCHAR(255) NOT NULL,
      completed  BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS templates (
      id         SERIAL PRIMARY KEY,
      name       VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS template_items (
      id          SERIAL PRIMARY KEY,
      template_id INTEGER REFERENCES templates(id) ON DELETE CASCADE,
      title       VARCHAR(255) NOT NULL
    )
  `);
  console.log('Database initialized');
}

module.exports = { query, initDatabase };
