const routes = require('express').Router();

routes.get('/', (req, res) => {
  console.log('Accessing Index');
  res.status(200).send('Vinyasa Flow');
});

routes.post('/saveUser', (req, res) => {
  console.log(req);
  res.status(200).send('Vinyasa Flow');
});

module.exports = routes;
