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

// get, create all users
router
    .route('/')
    .get(getAllUser)
    .post(createUser);

// get, put, delete user by ID
router 
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// post, delete friends
router
    .route('/:id/friends/:friendsId')
    .delete(deleteFriend)
    .post(createFriend);

module.exports = router;