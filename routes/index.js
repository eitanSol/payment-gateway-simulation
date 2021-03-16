const express = require('express');
const axios = require('axios');
const joi = require('joi');
const clients = require('../clients');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => res.render('index', { title: 'Express' }));

router.get('/healthcheck', async (req, res, next) => {
  try {
    const mockServerHealthcheckResponse = await axios.get(`${req.configuration.mockServerUrl}/healthcheck`);
    console.log(`Mock server responded to health check with the following response: ${mockServerHealthcheckResponse.data}`);
    
    return res.json({ status: 'OK'})
  }
  catch(err) {
    console.log(err);
    return res.json({ status: 'ERR', message: err.response.statusText})
  }
});

postChargeSchema = joi.object({
  body: joi.object({
    fullName: joi.string().required(),
    creditCardNumber: joi.string().length(16).required(), // the 16 limit is from the postman config
    creditCardCompany: joi.string().valid('visa', 'mastercard').required(),
    expirationDate: joi.string().pattern(/\d\d\/\d\d/).required(),
    cvv: joi.string().required(),
    amount: joi.number().required().strict()
  }).unknown(false),
  headers: joi.object({
    'merchant-identifier': joi.string().required()
  }).unknown(true)
})

router.post('/api/charge', async (req, res, next) => {
  try {
    await postChargeSchema.validateAsync({
      body: req.body,
      headers: req.headers,
    });
  }
  catch (err) {
    res.status(400).send()
    console.log(err)
    return next()
  }
  try {
    const identifier = req.headers["merchant-identifier"];
    const componyRequest = clients[req.body.creditCardCompany].bind(clients, identifier, req.body)
    const result = await retry(componyRequest, 3)
    if (result.chargeResult == "Failure") {
      res.status(200).send({ error: "Card declined" })
      return next()
    }
    res.status(200).send()
    next()
  }
  catch (err) {
    console.log(err)
    res.status(500).send()
  }
});

async function retry(func, maxAttempts, attempt=0 ) {
  try {
    return await func()
  }
  catch (err) {
    attempt++
    if (attempt == maxAttempts) {
      throw err
    }
    await delay(1000*attempt**2)
    return await retry(func, maxAttempts, attempt)
  }
}

function delay(t) {
  return new Promise(function(resolve) {
      setTimeout(resolve, t)
  });
}

module.exports = router;
