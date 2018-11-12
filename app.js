const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const user = require('./routes/user.route');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', user);

const mongoDbUrl = 'mongodb://localhost:27017/simplecrudapi';
const mongoDB = process.env.MONGODB_URI || mongoDbUrl;

mongoose.Promise = global.Promise;

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
}).then(() => {
  console.log('Successfully connected to the database');
}).catch((err) => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

app.listen(1337, () => {
  console.log('Server is up and running on port numner 1337');
});

module.exports = app;
