const router = require('express').Router()
const {coinbase_public} = process.env.coinbase_public || require('./env')
const {coinbase_secret} = process.env.coinbase_secret || require('./env')
module.exports = router

router.get('/oauth', async (req, res, next) => {
    try {
        res.send(coinbase_client)
    } catch (error) {
        next(error)
    }
})