const express = require('express');
const router = express.Router();
const upload = require("../middlewares/upload");
const 
{
    generation,
    modifiGeneration
} = require('../controllers/PromptController');


router.post(
  "/post",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "background", maxCount: 1 }
  ]),
  generation
);
router.put('/:id', modifiGeneration);

module.exports = router;
