const express = require('express');
const router = express.Router();
const 
{
    generation,
    modifiGeneration
} = require('../controllers/PromptController');


router.post('/post', generation);
router.put('/:id', modifiGeneration);

module.exports = router;
