const mongoose = require("./connection");

const animalSchema = new mongoose.Schema({
    species: { type: String, required: true },
    extinct: Boolean,
    location: { type: String, required: true },
    lifeExpectancy: { type: Number, required: true }
})

const Animal = mongoose.model("animal", animalSchema);

module.exports = Animal;

