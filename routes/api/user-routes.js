const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    createFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// /api/users
router
    .route('/')
    .get(getAllUser)
    .post(createUser);

router 
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:userId/friends/:friendsId
router
    .route('/:userId/friends/:friendsId')
    .post(createFriend)
    .delete(deleteFriend);

module.exports = router;