const express = require('express');
const router = express.Router();
const {
  getAllTemplates,
  createTemplate,
  getTemplateById,
  deleteTemplate,
} = require('../controllers/templateController');

router.get('/',     getAllTemplates);
router.post('/',    createTemplate);
router.get('/:id',  getTemplateById);
router.delete('/:id', deleteTemplate);

module.exports = router;