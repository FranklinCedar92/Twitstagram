const router = require('express').Router();
const { 
    getAllThought,
    getThoughtById,
    addThought, 
    updateThought,
    removeThought, 
    addReaction, 
    removeReaction 
} = require('../../controllers/thought-controller');

// get all thoughts
router.route('/')
    .get(getAllThought);

// get, update, delete one thought by id
router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

// post thought
router.route('/:userId')
    .post(addThought);
    
// add reaction
router.route('/:thoughtId/reactions')
    .post(addReaction)

// remove reaction
router.route('/thoughts/:thoughtId/reactions/:reactionsId')
    .delete(removeReaction);

module.exports = router;