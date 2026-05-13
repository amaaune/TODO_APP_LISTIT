const { query } = require('../models/db');

// GET /api/todos — retourne tous les todos, du plus recent au plus ancien
async function getAllTodos(req, res) {
  try {
    const result = await query('SELECT * FROM todos ORDER BY created_at DESC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// GET /api/todos/:id — retourne un seul todo par son id
async function getTodoById(req, res) {
  try {
    const result = await query('SELECT * FROM todos WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Todo non trouve' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// POST /api/todos — cree un nouveau todo
// Le corps de la requete doit contenir { title: "..." }
async function createTodo(req, res) {
  const { title } = req.body;

  // Validation : le titre est obligatoire et ne peut pas etre vide
  if (!title || title.trim() === '') {
    return res.status(400).json({ success: false, error: 'Le titre est obligatoire' });
  }

  try {
    const result = await query(
      'INSERT INTO todos (title) VALUES ($1) RETURNING *',
      [title.trim()]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// PUT /api/todos/:id — met a jour le titre ou le statut completed d'un todo
async function updateTodo(req, res) {
  const { title, completed } = req.body;

  try {
    const result = await query(
      `UPDATE todos
       SET title     = COALESCE($1, title),
           completed = COALESCE($2, completed)
       WHERE id = $3
       RETURNING *`,
      [title ?? null, completed ?? null, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Todo non trouve' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// DELETE /api/todos/:id — supprime un todo
async function deleteTodo(req, res) {
  try {
    const result = await query('DELETE FROM todos WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Todo non trouve' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo };
