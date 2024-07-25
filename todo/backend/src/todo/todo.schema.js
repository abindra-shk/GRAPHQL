const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    status: {
        required: true,
        type: String,
        enum: ['todo', 'inprogress', 'done']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Todo', todoSchema);
