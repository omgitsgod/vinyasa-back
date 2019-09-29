const routes = require('express').Router();

routes.get('/', (req, res, next) => {
  console.log('Accessing Index');
  res.set('Content-Type', 'text/html');
  res.status(200).send('Vinyasa Flow');
});

module.exports = routes;
