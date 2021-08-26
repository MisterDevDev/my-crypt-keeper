const router = require('express').Router()
const axios = require('axios')
const coinbase_public = process.env.coinbase_public || (require('./env')).coinbase_public
const coinbase_secret = process.env.coinbase_secret || require('./env').coinbase_secret
const { models: { User }} = require('../db')
module.exports = router

const redirect_uri = '&redirect_uri=http://localhost:8080/auth'
const access_url = 'https://api.coinbase.com/oauth/token'
const type = 'grant_type=authorization_code'
const secret = `&client_secret=${coinbase_secret}`


const accessPost2 =
    `${clientId}${secret}${redirect_uri}`

const grantAccess = (key) => {
    accessPost1 = `${type}&code=${key}`
    const request = `${accessPost1}${accessPost2}`
    const { data } = await axios.post(access_url, accessPost)
    return data.access_token
}

router.put('/set/:id', async (req, res, next) => {
    try {
      const token = grantAccess(req.body._key)
      console.log('About to set key ~~~~~~~~~~~~~~~~~~~token~~~~~~~~~~~~~~~~~~~~~~~~', token)
      await User.update(
        {apiKey: req.token},
        {where: {username: req.params.id}}
      )
      res.send('key set')
    } catch (error) {
      console.log(error)
    }
  })