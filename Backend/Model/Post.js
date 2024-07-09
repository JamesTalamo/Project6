const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: 'String',
        required: true
    },
    likes: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Post', postSchema);
