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
            required: [true, "Email required"],
            unique: true,
            lowercase: true,
            // must match a valid email address
            validate: {
                validator: function(v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: "Please enter a valid email"
            }
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