const routes = require('express').Router();

routes.get('/', (req, res, next) => {
  console.log('Accessing Index');
  res.end();
});

module.exports = routes;
