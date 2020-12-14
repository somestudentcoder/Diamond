const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
    name: { type: String, unique: false, required: true },
    password: { type: String, unique: false, required: false },
    launched: { type: Boolean, unique: false, required: true },
    id: { type: String, unique: true, required: true },
    createdDate: { type: Date, default: Date.now },
    tree: { type: Array, required: true },
    tasks: { type: Array, required: true },
    user: { type: String, unique: false, required: true },
    welcomeMessage: { type: String, unique: false, required: false },
    instructions: { type: String, unique: false, required: false },
    thankYouScreen: { type: String, unique: false, required: false },
    leaveFeedback: { type: String, unique: false, required: false },
    leafNodes: { type: Boolean, unique: false, required: false },
    orderNumbers: { type: Boolean, unique: false, required: false }
});

testSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Test', testSchema);