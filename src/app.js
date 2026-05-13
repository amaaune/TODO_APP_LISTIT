require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const cors = require('cors');
app.use(cors());

// Servir index.html pour la racine
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/api/health', (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

//Routes API
const todosRouter = require('./routes/todos');
app.use('/api/todos', todosRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

module.exports = app;