const express = require('express');
const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { NOT_FOUND_ERROR } = require('./utils/errorMessage');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '62e2b1d9e1d252a756403491'
  };

  next();
});

app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));

app.use((req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Запрашиваемый ресурс не найден' });
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb')
  console.log('Connect to db')

  await app.listen(PORT)
    console.log(`App listening on port ${PORT}`);
}

main();