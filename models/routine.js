const mongoose = require('mongoose');

const routineSchema = new mongoose.Schema({
date: {
  type: String,
  unique: true
},
routine: Array
});

const Routine = mongoose.model('Routine', routineSchema);

module.exports = Routine;
