//this is the access point for all things database related!

const db = require('./db')

const User = require('./User')

async function seed() {
    await db.sync({ force: true }) // clears db and matches models to tables
    console.log('db synced!')
}

module.exports = {
  db,
  models: {
    User,
  },
}