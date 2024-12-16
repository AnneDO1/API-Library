const express = require('express');
const router = express.Router();
const libroController = require('../controllers/libroController');

router.get('/', libroController.getLibros);
router.get('/disponibles', libroController.getLibrosDisponibles);
router.get('/nodisponibles', libroController.getLibrosNoDisponibles);
router.post('/', libroController.addLibro);

module.exports = router;
