const { User } = require('../models');

const userController = {
    // get all users
    getAllUser(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select:'-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select:'-__v'
            })
            .select('-__v')
            .then(dbUserData => 
                res.json(dbUserData)
            )
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    // update user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user found with that id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with that id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // post friend: Is this correct?
    createFriend({ params, body }, res){
        // this has to select from the list of users
        User.findOneAndUpdate(
            { _id: params.username }, //is this the right criteria
            { $push: { friends: username } }, // again, right criteria?
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        }) 
        .catch(err => res.json(err));
        
    },

    // delete friend: Is this correct?
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.username },
            { $pull: { friends: { friendId: params.friendId} } }, // I need to add friendId to the "friend" virtual in User model
            { new: true }
        )
            .then(dbuserData => res.json(dbuserData))
            .catch(err => res.json(err));
    }
};

module.exports = userController;