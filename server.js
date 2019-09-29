const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { connectDb, models } = require('./models')

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
//  origin: 'https://vinyasa.netlify.com',
    origin: '*'
//  credentials: true
}));

connectDb()
  .then(() => console.log('connection to DB succesful'))
  .catch((err) => console.log(err))
app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
