const {db, models: {User} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const [cody, murphy, lumpy, tick, wart] = await Promise.all([
    User.create({ username: 'cody', password: '123',
    account: 'd66fddb5-8102-5e5d-8248-aba8b68d681f', address: '0xD446CB3b3A0A632eDb0f3d331Ef6a189b0E9eE3A'}),
    User.create({ username: 'murphy', password: '123'}),
    User.create({ username: 'lumpy', password: '123',
    account:'24a9e0d8-460a-5430-b9d5-091ff13a5b28', address:'0x988f0cE276fCF8E7eBD2E5C4071813B5c0Dbb4f0'}),
    User.create({ username: 'tick', password: '123'}),
    User.create({ username: 'wart', password: '123'}),
  ])

  murphy.userId = cody.id
  lumpy.userId = cody.id
  tick.userId = cody.id
  wart.userId = cody.id

  await Promise.all([
    murphy.save(),
    lumpy.save(),
    tick.save(),
    wart.save()
  ])

  users = [cody, murphy, lumpy, tick, wart]

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed