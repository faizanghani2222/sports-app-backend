const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    description: { type: String, required: true },
    timing: { type: Number, required: true },
    limit: { type: Number, required: true },
    category: { type: String, required: true },
    players: { type: [], default:[] }
})

const Events = mongoose.model('event', eventSchema);

module.exports = Events;