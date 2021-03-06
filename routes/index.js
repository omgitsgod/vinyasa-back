const routes = require('express').Router();
const cors = require('cors');
const Routine = require('../models/routine');
const passport = require('passport');
const { connectDb, models } = require('../models');
let { logged, loggedIn, liveList } = require('../constants');
require('../config/passport');

routes.get('/', (req, res) => {
  if (req.session.passport) {
      res.redirect('/getUser');
  } else { req.session.destroy((err) => console.log(err)); }
});

routes.post('/saveRoutine', (req, res) => {
  const body = req.body;
  const date = body.datey;
  const routine = body.routines;
  const user = req.session.user.email;
  const temp = { date, routine };
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  Routine.findOneAndUpdate({ date, user }, { routine }, options, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('saving routine...');
      res.status(200).send('saving routine');
    }
  });


//  if (Routine.findOne({ date })) {
//    console.log('Already saved!');
//  } else {
//    const routineDB = new Routine(temp);
//    console.log(routineDB);
//    routineDB.save((err) => {
//              if (err) {
//                console.log(err);
//              } else {
//                console.log('saving routine...');
//                res.status(200).send('saving routine');
//              }
//            });
//  }
});

routes.get('/loadRoutine/:month/:day', (req, res) => {
  const date = `${req.params.month}/${req.params.day}`;
  const user = req.session.user.email;
  console.log(date);
  Routine.findOne({ date, user }, (err, routine) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json(routine);
  });
});

routes.delete('/deleteRoutine/:month/:day', (req, res) => {
  const date = `${req.params.month}/${req.params.day}`;
  const user = req.session.user.email;
  console.log(date);
  Routine.findOneAndDelete({ date, user }, (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.status(200).send('Deleted');
});

routes.get(
  '/auth/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);

routes.get(
	'/auth/google/callback',
	passport.authenticate('google', { failureRedirect: process.env.CLIENT, session: true }),
	(req, res) => {
    const user = req.user;
		const token = user.token;
    req.session.user = req.user;
    console.log('id: ', req.session.id);
    console.log('session: ', req.session);
    logged.push(user);
    loggedIn.includes(user) ? null : loggedIn.push(user);
    console.log('Getting User:', loggedIn.map(x => x.name));
		res.redirect(`${process.env.CLIENT}`);
	}
);

routes.get(
  '/getUser', (req, res) => {
    if (req.session.passport) {
      console.log('req.session test', req.session);
      console.log('id: ', req.session.id);
    //  const skim = ({email, name, photo}) => ({email, name, photo})
      models.User.findById(req.session.passport.user, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        if (logged.filter(x => x.token === req.session.user.token)[0]) {
           //const user = logged.filter(x => x.token === req.session.user.token)[0]

           console.log('logging in: ', user.name);
           console.log('currently online: ', loggedIn.map(x => x.name));
           res.status(200).json(user);
         } else { req.session.destroy((err) => console.log(err)); }
      }
    });
    }
	}
);

routes.get(
  '/logout/', (req, res) => {
    console.log('logging out: ', loggedIn.filter(x => x.token === req.session.user.token)[0].name);
    loggedIn = loggedIn.filter(x => x.token !== req.session.user.token);
    console.log('currently online: ', loggedIn.map(x => x.name));
    req.session.destroy((err) => console.log(err));
    res.sendStatus(200);
	}
);

routes.loggedIn = loggedIn;
routes.logged = logged;

module.exports = routes;
