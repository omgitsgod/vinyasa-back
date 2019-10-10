const mongoose = require('mongoose');

const Routine = require('./routine');
const User = require('./user')

const connectDb = () => mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/vinyasa-flow', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const models = { Routine, User };

module.exports = {
  connectDb,
  models
};
