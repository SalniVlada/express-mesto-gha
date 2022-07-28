const express = require('express');
const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', require('./routes/user'));
app.use('/card', require('./routes/card'));

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133'
  };

  next();
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mydb')
  console.log('Connect to db')

  await app.listen(PORT)
    console.log(`App listening on port ${PORT}`);
}
