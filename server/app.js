const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Routes for Models
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const auth = require('./routes/api/auth');
const rate = require('./routes/api/rate');
const ico = require('./routes/api/ico');
const mobile = require('./routes/api/mobile');

// Express Instance
const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Promise
mongoose.Promise = global.Promise;

// Mongodb Connect
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected.'))
  .catch(err => console.log(err));

console.log('environment: ', process.env.NODE_ENV);

// Middleware
if (!process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}

app.use(cors());

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

// Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/auth', auth);
app.use('/api/rate', rate);
app.use('/api/ico', ico);
app.use('/api/mobile', mobile);

module.exports = app;

//https://jwt.io/
//https://github.com/auth0/node-jsonwebtoken
