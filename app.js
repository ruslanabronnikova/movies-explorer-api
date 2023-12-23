require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const handleNotFound = require('./routes/errorHandler');

const errorMiddleW = require('./middlewares/errorMiddleW');
const router = require('./routes');

mongoose.connect('mongodb://127.0.0.1:27017/bddiplomfilm');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(cors());

app.use(router);

app.use(errorLogger);
app.use(handleNotFound);
app.use(errors());
app.use(errorMiddleW);

app.listen(3000, () => {
  console.log('Привет, я сервер!');
});
