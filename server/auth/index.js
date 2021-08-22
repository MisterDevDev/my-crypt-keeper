const router = require('express').Router()
const coinbase_public = process.env.coinbase_public || (require('./env')).coinbase_public
const coinbase_secret = process.env.coinbase_secret || require('./env').coinbase_secret
module.exports = router

router.get('/oauth', async (req, res, next) => {
    console.log('heroku env variable= ~~~~~~',process.env.coinbase_public)
    console.log('public variable i pass= ~~~~~~', coinbase_public)
    try {
        res.send(coinbase_public)
    } catch (error) {
        next(error)
    }
})