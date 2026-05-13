require('dotenv').config();
const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/api/health', (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

//Routes API
const todosRouter = require('./routes/todos');
app.use('/api/todos', todosRouter);

const templatesRouter = require('./routes/templates');
app.use('/api/templates', templatesRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

module.exports = app;