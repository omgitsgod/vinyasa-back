const routes = require('express').Router();
const Routine = require('../models/routine');

routes.get('/', (req, res) => {
  console.log('Accessing Index');
  res.status(200).send('Vinyasa Flow');
});

routes.post('/saveRoutine', (req, res) => {
  const body = req.body;
  const routine = new Routine({
    date: body.date,
    routine: body.routines
  });
  routine.save((err) => {
            if (err) {
              console.log(err);
            } else {
              console.log('saving routine...');
              res.status(200).send('saving routine');
            }
          });
});

routes.get('/loadRoutine/:date', (req, res) => {
  const date = new Date(req.params.date);
  console.log(date);
});

module.exports = routes;
