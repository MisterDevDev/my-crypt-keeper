const router = require("express").Router();
const coinbase_public =
  process.env.coinbase_public || require("./env").coinbase_public;
const coinbase_secret =
  process.env.coinbase_secret || require("./env").coinbase_secret;
const axios = require("axios");
 
const my_key  = process.env.my_key || require("./env").my_key
const my_secret = process.env.my_secret || require("./env").my_secret
var Client = require('coinbase').Client;


var client = new Client({'apiKey': my_key, 'apiSecret': my_secret});

client.getAccounts({}, function(err, accounts) {
  if(err)console.log('error is~~~~~~', err)
  accounts.forEach(function(acct) {
    console.log('my bal: ' + acct.balance.amount + ' for ' + acct.name);
  });
});

const Account = require('coinbase').model.Account;


// client.getAccounts({}, function(err, accounts) {
//   if(err) console.log('the error is.....', err)
//   accounts.forEach(function(acct) {
//     console.log('my bal: ' + acct.balance.amount + ' for ' + acct.name);
//   });
// });


const {
  models: { User },
} = require("../db");

module.exports = router;

router.get("/oauth", async (req, res, next) => {
  try {
    res.send(coinbase_public);
  } catch (error) {
    next(error);
  }
});

router.get("/access", async (req, res, next) => {
  try {
    res.send(coinbase_secret);
  } catch (error) {
    next(error);
  }
});

router.get("/list/:id", async (req, res, next) => {
  try {
    const token = req.params.id;
    const { data } = await axios.get("https://api.coinbase.com/v2/accounts", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.get("/user/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({
      where: { username: userId },
    });
    const { data } = await axios.get("https://api.coinbase.com/v2/user", {
      headers: {
        Authorization: "Bearer " + user.apiKey,
      },
    });
    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.get("/account/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({
      where: { username: userId },
    });
    const { data } = await axios.get(
      "https://api.coinbase.com/v2/accounts?limit=100",
      {
        headers: {
          Authorization: "Bearer " + user.apiKey,
        },
      }
    );
    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.post('/send/:id', async (req, res, next) => {
  try {
      console.log('~~~~~~~~~~~~~~~~~~~~req.body~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', req.body)
      console.log('da keys~~~', my_key,'~~~~~~~~~~~~~~~~~~~~~', my_secret)
    const userId = req.params.id;

    const user = await User.findOne({
      where: { id: userId },
    });

    const recipientId = req.body.receiver

    const recipient = await User.findOne({
      where: { id: recipientId },
    });

      var args = {
      "to": "djb91c@gmail.com",
      "amount": req.body.quantity,
      "currency": "ETH",
      "description": "Sample transaction for you"
    };

    const myAccount = new Account(client, {'id': `${user.account}`});

    myAccount.sendMoney(args, function(err, txn){
      if(err) console.log('my error!!!!!!!!!!!!!', err)
      console.log('my txn thingy.......... =>   ', txn)
    })

 

    // client.getAccounts({}, function(err, accounts) {
    //   if(err) console.log('this is the err.......!!!!@!@!~@~!@~@!!~@!~ ', err)
    //   accounts.forEach(function(acct) {
    //     console.log('my bal: ' + acct.balance.amount + ' for ' + acct.name);
    //   });
    // });


    // client.getAccount(`${user.account}`, function(err, account) {
    //   if(err) console.log('my error', err)
    //   console.log('bal: ' + account.balance.amount + ' currency: ' + account.balance.currency);
    //   account.sendMoney(args, function(err, txn) {
    //     if(err) console.log('My error~~', err)
    //     console.log('my txn id is: ' + txn.id);
    //   });
    // });

    // const { data } = await axios.post(
    //   `https://api.coinbase.com/v2/accounts/${user.account}/transactions`,
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: "Bearer " + user.apiKey,
    //     },
    //     data: {
    //       type: 'send',
    //       to: 'djb91c@gmail.com',
    //       amount: req.body.quantity,
    //       currency: 'BTC'
    //     }
    //   }
    // );
    // res.send(200)
  } catch (error) {
    next(error)
  }
})

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    console.log('~~~~~~req.headers.authorization from me~~~~~~~~~~~~~~~~~~~~~~~~~', req.headers.authorization)
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

const redirect_uri = "&redirect_uri=http://localhost:8080/auth"; // '&redirect_uri=https://fast-brook-16275.herokuapp.com/auth' // 
const access_url = "https://api.coinbase.com/oauth/token";
const type = "grant_type=authorization_code";
const secret = `&client_secret=${coinbase_secret}`;
const clientId = `&client_id=${coinbase_public}`;

const accessPost2 = `${clientId}${secret}${redirect_uri}`;

router.put("/set/:id", async (req, res, next) => {
  try {
    accessPost1 = `${type}&code=${req.body.key}`;
    const request = `${accessPost1}${accessPost2}`;
    const { data } = await axios.post(access_url, request);
    await User.update(
      { apiKey: data.access_token, refresh: data.refresh_token },
      { where: { username: req.params.id } }
    );
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~data!!!~~~~~~~~~~~~~~~~~~~~~~~', data)
    res.send("key set");
  } catch (error) {
    console.log(error);
  }
});

router.get("/friends/:id", async (req, res, next) => {
  try {
    const data = await User.findAll({
      where: { userId: req.params.id },
    });
    console.log(
      "friends route~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
      data,
      "this is params => ",
      req.params.id
    );
    res.send(data);
  } catch (error) {
    next(error);
  }
});



  

