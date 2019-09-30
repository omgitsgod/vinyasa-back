const routes = require('express').Router();
const Routine = require('../models/routine');

routes.get('/', (req, res) => {
  console.log('Accessing Index');
  res.status(200).send('Vinyasa Flow');
});

routes.post('/saveRoutine', (req, res) => {
  const body = req.body;
  const date = body.datey;
  if (Routine.findOne({ date })) {
    Routine.replaceOne({ date }, { routine: body.routines }, (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log('saving routine...');
                res.status(200).send('saving routine');
              }
            });
  } else {
  const routine = new Routine({
    date: body.datey,
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
  }
});

routes.get('/loadRoutine/:month/:day', (req, res) => {
  const date = `${req.params.month}/${req.params.day}`;
  console.log(date);
  Routine.findOne({ date }, (err, routine) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json(routine);
  });
});

module.exports = routes;
