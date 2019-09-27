const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
//  origin: 'https://vinyasa.netlify.com',
    origin: '*'
//  credentials: true
}));

app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
