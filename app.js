const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorStatus = require('./utils/constants');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const cookieParser = require('cookie-parser');

const app = express();
const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use(bodyParser.json());
app.use(cookieParser());
app.post('/signup', createUser);
app.post('/signin', login);
app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('/*', (req, res) => {
  res.status(404).send(errorStatus.wrongWay);
});
app.listen(PORT, () => {
});
