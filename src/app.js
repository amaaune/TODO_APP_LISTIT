const express = require('express');
const app = express();

app.use(express.json());

const cors = require('cors');
app.use(cors());
app.get('/', (req, res) => {
  res.json({ message: "Bienvenue sur l'API !" });
});
app.get('/api/health', (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

module.exports = app;