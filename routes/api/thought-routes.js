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
router.route('/').get(getAllThought);

// get one thought by id
router.route('/:thoughtId').get(getThoughtById);

// post thought
router.route('/:userId').post(addThought);

// /update thought, add reaction, remove reaction
router.route('/:userId/:thoughtId')
    .put(updateThought)
    .put(addReaction)
    .delete(removeThought);

router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;