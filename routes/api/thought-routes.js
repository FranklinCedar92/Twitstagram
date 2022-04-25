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

// /api/thoughts/<userId>
router.route(':/userId').post(addThought);

// /api/thoughts/<userId>/<thoughtId>
router.route('/:userId/:thoughtId')
    .put(addReaction)
    .delete(removeReaction);

router.route('/:userId/:thoughtId/:reactionId').delete(removeThought);

module.exports = router;