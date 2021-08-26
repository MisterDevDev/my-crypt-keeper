const router = require('express').Router()
const coinbase_public = process.env.coinbase_public || (require('./env')).coinbase_public
const coinbase_secret = process.env.coinbase_secret || require('./env').coinbase_secret
const axios = require('axios')
const { models: {User }} = require('../db')
module.exports = router


router.get('/oauth', async (req, res, next) => {
    try {
        res.send(coinbase_public)
    } catch (error) {
        next(error)
    }
})

router.get('/access', async (req, res, next) => {
    try {
        res.send(coinbase_secret)
    } catch (error) {
        next(error)
    }
})

router.get('/list/:id', async (req, res, next) => {
    try {
        const token = req.params.id
        const {data} = await axios.get('https://api.coinbase.com/v2/accounts',{
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        res.send(data)
    } catch (error) {
        next(error)
    }
})

router.post('/currencies', async (req, res, next) => {
    try {
        const client = new Client({'accessToken': req.body.access,
                         'refreshToken': req.body.refresh});
        client.getCurrencies(function(err, currencies) {
            res.status(err).send(currencies);
          });
    } catch (error) {
        next(error)
    }
})

router.get('/user/:id', async (req, res, next) => {
    try {
        
        const userId = req.params.id
        const user = await User.findOne({
          where: {username: userId}
        }) 
        const {data} = await axios.get('https://api.coinbase.com/v2/user',{
            headers: {
                Authorization: 'Bearer ' + user.apiKey
            }
        })
        res.send(data)
    } catch (error) {
        next(error)
    }
})

router.get('/account/:id', async (req, res, next) => {
    try {
        
        const userId = req.params.id
        const user = await User.findOne({
          where: {username: userId}
        }) 
        console.log('~~~~~~~~~~~~~~~about to make the request!!!', user)
        const {data} = await axios.get('https://api.coinbase.com/v2/accounts?limit=100',{
            headers: {
                Authorization: 'Bearer ' + user.apiKey
            }
        })
        console.log('HERES the USER DATA!!!~!~!~!~~!!~!!~!~!~!~!~!!~!~!~', data)
        res.send(data)
    } catch (error) {
        next(error)
    }
})



router.post('/login', async (req, res, next) => {
    try {
        console.log('Got the request! Heres body~~~~~~~~~~~~~~~~~~~~~~~~~', req.body)
      res.send({ token: await User.authenticate(req.body)}); 
    } catch (err) {
      next(err)
    }
  })
  
  
  router.post('/signup', async (req, res, next) => {
    try {
      const user = await User.create(req.body)
      res.send({token: await user.generateToken()})
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    }
  })
  
  router.get('/me', async (req, res, next) => {
    try {
        console.log('you got to meeeeeeeeeee')
      res.send(await User.findByToken(req.headers.authorization))
    } catch (ex) {
      next(ex)
    }
  })

const redirect_uri = '&redirect_uri=http://localhost:8080/auth'
const access_url = 'https://api.coinbase.com/oauth/token'
const type = 'grant_type=authorization_code'
const secret = `&client_secret=${coinbase_secret}`
const clientId = `&client_id=${coinbase_public}`


const accessPost2 =
    `${clientId}${secret}${redirect_uri}`

router.put('/set/:id', async (req, res, next) => {
    try {
      console.log('the req.body for the set^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', req.body)
      accessPost1 = `${type}&code=${req.body.key}`
      const request = `${accessPost1}${accessPost2}`
      console.log('check the request!!!!!!~~~~url~~~', access_url,'~~~requestheader~~~~~~', request )
      const { data } = await axios.post(access_url, request)
      console.log('About to set key ~~~~~~~~~~~~~~~~~~~token~~~~~~~~~~~~~~~~~~~~~~~~', data)
      await User.update(
        {apiKey: data.access_token},
        {where: {username: req.params.id}}
      )
      res.send('key set')
    } catch (error) {
      console.log(error)
    }
  })
