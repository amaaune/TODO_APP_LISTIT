const app = require('./app');
const { initDatabase } = require('./models/db');

// On initialise la BD avant de démarrer le serveur.
// Si la BD est inaccessible, on coupe le process plutôt que de démarrer sans BD.
initDatabase()
  .then(() => {
    const server = app.listen(process.env.PORT || 3000, () => {
      const { address, port } = server.address();
      console.log(`App listening at http://${address}:${port}`);
    });
  })
  .catch((err) => {
    console.error('Erreur BD :', err.message);
    process.exit(1);
  });