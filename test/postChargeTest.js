const { expect } = require('chai');
const request = require('request');
const testData = require('./testData');
const app = require('../app');
const http = require('http');

before(function (){
  this.server = http.createServer(app);
  this.server.listen(8000)
})

after(function (){
  this.server.close()
})

describe('POST /api/charge', function () {
  describe('validation', function () {
    it('should reply with an error when Credit card number is invalid', function(done) {
      request(testData.cardNumberNotValid, (err, res) =>{
        expect(err).to.not.exist
        expect(res.statusCode).to.equal(400)
        done()
      })
    });

    it('should reply with an error when merchant is not provided', function(done) {
      request(testData.missingMerchantIdentifier, (err, res) =>{
        expect(err).to.not.exist
        expect(res.statusCode).to.equal(400)
        done()
      })
    });

    it('should reply with an error when payload is invalid', function(done) {
      request(testData.invalidPayload, (err, res) =>{
        expect(err).to.not.exist
        expect(res.statusCode).to.equal(400)
        done()
      })
    });

    it('should reply with an error when payload is not an object', function(done) {
      request(testData.stringPayload, (err, res) =>{
        expect(err).to.not.exist
        expect(res.statusCode).to.equal(400)
        done()
      })
    });

    it('should reply with statusCode 200 when payload is valid', function(done) {
      request(testData.goodRequestVisa, (err, res) =>{
        expect(err).to.not.exist
        expect(res.statusCode).to.equal(200)
        done()
      })
    });
  });
});