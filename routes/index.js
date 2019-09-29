const routes = require('express').Router();

routes.get('/', (req, res, next) => {
  console.log('Accessing Index');
  res.status(200).send('Vinyasa Flow');
});

routes.get('/saveUser', (req, res, next) => {
  console.log(req.body);
  res.status(200).send('Vinyasa Flow');
});

module.exports = routes;
