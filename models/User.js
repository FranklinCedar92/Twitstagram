const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // must match a valid email address
        },
        thoughts: [
            // array of _id values referencing the Thought model
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            // array of _id values referencing the User model (self-reference)
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// get count of friends
userSchema.virtual('friendCount').get(function() {
    return this.friends.reduce((total, friend) => total + friend) //wait...figure this out
});

const User = model('User', userSchema);

module.exports = User;