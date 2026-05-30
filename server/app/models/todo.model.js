let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

let todoModel = mongoose.model('Todo', todoSchema);
module.exports = todoModel;
