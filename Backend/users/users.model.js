const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    role:{
        type: String,
        default:"user"
    }
},
{
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});
// userSchema.virtual('snippets', {
//     ref: 'Snippet',
//     localField: '_id',
//     foreignField: 'user_id'
// });

// userSchema.virtual('bookmarks', {
//     ref: 'Bookmark',
//     localField: '_id',
//     foreignField: 'user_id'
// });

const User = mongoose.model('User',userSchema)

module.exports = User;
