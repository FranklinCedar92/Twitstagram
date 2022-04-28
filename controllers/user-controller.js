const { User } = require('../models');

const userController = {
    // get all users
    getAllUser(req, res) {
        User.find({})
            .populate({
                path: 'thoughts'
            })
            .populate({
                path: 'friends'
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
                path: 'thoughts'
            })
            .populate({
                path: 'friends'
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
        User.findOneAndUpdate(
            { _id: params.id }, 
            body, 
            { new: true }
            )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user found with that id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
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

    // post friend
    createFriend({ params, body }, res){
        // this has to select from the list of users
        User.findOneAndUpdate(
            { _id: params.id }, //
            { $push: { friends: params.friendsId } }, // "params.<>" has to match router route
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

    // delete friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends:  params.friendsId}  }, // the "params.<>" needs to match the router route
            { new: true }
        )
            .then(dbUserData =>{ 
                console.log(dbUserData);
                res.json(dbUserData)})
            .catch(err => res.json(err));
    }
};

module.exports = userController;