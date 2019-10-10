require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const url = require('url');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const bodyParser = require('body-parser');
const routes = require('./routes');
const { connectDb } = require('./models');

const app = express();
const port = process.env.PORT || 5000;
const redisURL = url.parse(process.env.REDIS_URL);
const redisAuth = redisURL.auth.split(':');
const redisClient = redis.createClient(redisURL.port, redisURL.hostname, { no_ready_check: true });
require('./config/passport');

redisClient.auth(redisAuth[1], () => console.log('Redis Authorized'));
redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});
redisClient.on('connect', () => {
    console.log('Connected to Redis');
});
app.use(session({
  secret: process.env.SECRET,
  name: 'Vinyasa-Flow',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 600000 },
  store: new redisStore({ url: process.env.REDIS_URL }),
  clear: (err) => console.log(err)
}));
app.set('trust proxy');
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: 'https://vinyasa.netlify.com',
  credentials: true
}));
app.use(bodyParser.json());

connectDb()
  .then(() => console.log('connection to DB succesful'))
  .catch((err) => console.log(err));
app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
