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
          where: {id: userId}
        }) 
        console.log('~~~~~~~~~~~~~~~about to make the request!!!', user)
        const {data} = await axios.get('https://api.coinbase.com/v2/user',{
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

/*
const { Curl } = require('node-libcurl');

const curl = new Curl();

curl.setOpt('URL', 'www.google.com');
curl.setOpt('FOLLOWLOCATION', true);

curl.on('end', function (statusCode, data, headers) {
  console.info(statusCode);
  console.info('---');
  console.info(data.length);
  console.info('---');
  console.info(this.getInfo( 'TOTAL_TIME'));
  
  this.close();
});

curl.on('error', curl.close.bind(curl));
curl.perform();
*/

/*
'grant_type=authorization_code
&code=4c666b5c0c0d9d3140f2e0776cbe245f3143011d82b7a2c2a590cc7e20b79ae8
&client_id=1532c63424622b6e9c4654e7f97ed40194a1547e114ca1c682f44283f39dfa49
&client_secret=3a21f08c585df35c14c0c43b832640b29a3a3a18e5c54d5401f08c87c8be0b20
&redirect_uri=https://example.com/oauth/callback'
*/

/*
access_token: "aee22c7608870ffd5b0b9d26c213cca9a357d24c4d7e672f7a15bc0e531d3534"
created_at: 1629679835
expires_in: 7200
refresh_token: "cbcfec39b519ee6a6dc927c3fa323caccbf457cddfd46630b915a8ed2176e6f2"
scope: "wallet:accounts:read"
token_type: "bearer"
*/
