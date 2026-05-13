const { query } = require('../models/db');

// GET /api/templates — liste tous les modèles
async function getAllTemplates(req, res) {
  try {
    const result = await query('SELECT * FROM templates ORDER BY created_at DESC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// POST /api/templates — sauvegarde la liste actuelle comme modèle
// Body: { name: "Liste courses", items: ["Lait", "Pain", "Œufs"] }
async function createTemplate(req, res) {
  const { name, items } = req.body;
  if (!name || !items || items.length === 0) {
    return res.status(400).json({ success: false, error: 'Nom et items obligatoires' });
  }
  try {
    const tmpl = await query(
      'INSERT INTO templates (name) VALUES ($1) RETURNING *',
      [name.trim()]
    );
    const templateId = tmpl.rows[0].id;
    for (const title of items) {
      await query(
        'INSERT INTO template_items (template_id, title) VALUES ($1, $2)',
        [templateId, title.trim()]
      );
    }
    res.status(201).json({ success: true, data: tmpl.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// GET /api/templates/:id — charge un modèle avec ses items
async function getTemplateById(req, res) {
  try {
    const tmpl = await query('SELECT * FROM templates WHERE id = $1', [req.params.id]);
    if (tmpl.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Modèle non trouvé' });
    }
    const items = await query(
      'SELECT * FROM template_items WHERE template_id = $1',
      [req.params.id]
    );
    res.json({ success: true, data: { ...tmpl.rows[0], items: items.rows } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// DELETE /api/templates/:id — supprime un modèle et ses items (CASCADE)
async function deleteTemplate(req, res) {
  try {
    const result = await query('DELETE FROM templates WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Modèle non trouvé' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = { getAllTemplates, createTemplate, getTemplateById, deleteTemplate };