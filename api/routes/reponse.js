// routes/reponse.routes.js
const express = require('express');
const router = express.Router();
const {createReponse ,getAllReponses, getReponseById} = require('../controllers/ReponseController');

router.post('/', createReponse);
router.get('/', getAllReponses);
router.get('/:id', getReponseById);

module.exports = router;
