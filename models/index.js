const mongoose = require('mongoose');

const Routine = require('./routine');

const connectDb = () => mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/vinyasa-flow', { useNewUrlParser: true, useCreateIndex: true, });

const models = { Routine };

module.exports = {
  connectDb,
  models
};
