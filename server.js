const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { connectDb } = require('./models');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
//  origin: 'https://vinyasa.netlify.com',
//    origin: '*'
//  credentials: true
}));
app.use(bodyParser.json());

connectDb()
  .then(() => console.log('connection to DB succesful'))
  .catch((err) => console.log(err));
app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
