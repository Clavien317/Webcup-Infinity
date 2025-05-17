const express = require('express');
const router = express.Router();
const 
{
    createVote,
    getAllVotes,
    getVoteById,
    deleteVote,
    countForReponse
} = require('../controllers/VoteController');



router.post('/', createVote);
router.get('/', getAllVotes);
router.get('/:id', getVoteById);
router.delete('/:id', deleteVote);
router.get('/count/:id', countForReponse);

module.exports = router;
