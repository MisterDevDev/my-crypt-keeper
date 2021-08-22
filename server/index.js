const path = require('path');
const express = require('express');
const morgan = require('morgan')
const { db, seed } = require('./db')
const app = express();
module.exports = app

const PORT = process.env.PORT || 8080;
const PUBLIC_PATH = path.join(__dirname, '../public');
const DIST_PATH = path.join(__dirname, '../dist');

app.use(morgan('dev'))
app.use(express.json());
app.use(express.static(PUBLIC_PATH));
app.use(express.static(DIST_PATH));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});



app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

const init = async () => {
  try {
      await seed();
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
  } catch (ex) {
    console.log(ex)
  }
}

init()