const router = require('express').Router()
const coinbase_public = process.env.coinbase_public || (require('./env')).coinbase_public
const coinbase_secret = process.env.coinbase_secret || require('./env').coinbase_secret
const axios = require('axios')
const Client = require('coinbase').Client;
const { curly } = require('node-libcurl');
const querystring = require('querystring');
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

// router.post('/list', async (req, res, next) => {
//     try {
//         const client = new Client({'accessToken': req.body.access,
//                          'refreshToken': req.body.refresh});
//         client.getAccounts({}, function(err, accounts) {
//             res.status(err).send(accounts);
//           });
//     } catch (error) {
//         next(error)
//     }
// })

router.get('/list/:id', async (req, res, next) => {
    try {
        const {data} = await curly.get('https://api.coinbase.com/v2/accounts',{
            postFields: querystring.stringify({
                h : `Authorization: Bearer ${req.params.id}`
            })
        });
        console.log('my data!!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', req.params.id)
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
