const express = require('express');
const axios = require('axios');
const joi = require('joi');

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
    console.log(req.body)
    const value = await postChargeSchema.validateAsync({
      body: req.body,
      headers: req.headers,
    });
  }
  catch (err) {
    res.status(400).send()
    return next()
  }
  
  res.status(200).send()
  next()
});


module.exports = router;
