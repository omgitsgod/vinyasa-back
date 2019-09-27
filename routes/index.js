const routes = require('express').Router();

routes.get('/', (req, res, next) => {
  console.log('Accessing Index');
  res.send('Accessing Index');
});

module.exports = routes;
