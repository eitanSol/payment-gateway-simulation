const { expect } = require('chai');
const request = require('request');
const testData = require('./testData');
// const { MockServer } = require('./helpers');
const app = require('../app');
const http = require('http');
// const nconf = require('nconf');

// nconf.set({
//   visaUrl: "http://localhost:4000",
//   masterUrl: "http://localhost:4001",
// })

before(function () {
  this.server = http.createServer(app);
  this.server.listen(8000)
  // this.visaServer = new MockServer(4000)
  // this.visaServer.start()
  // this.masterServer = new MockServer(4001)
  // this.masterServer.start()
  // this.visaServer.assertRequest((req) =>{
  //   console.log(request.body)
  //   // expect(request.body).to.eql
  // })
  // this.masterServer.assertRequest((req) =>{
  //   console.log(request.body)
  //   // expect(request.body).to.eql
  // })
})

// beforeEach(function () {
//   this.visaServer.setResponse(false)
//   this.masterServer.setResponse(false)
// })

after(function () {
  this.server.close()
  // this.visaServer.close()
  // this.masterServer.close()
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

  });

  it('should reply with statusCode 200 when for valid mastercard', function(done) {
    request(testData.goodRequestMaster, (err, res) =>{
      expect(err).to.not.exist
      expect(res.statusCode).to.equal(200)
      done()
    })
  });

  it('should reply with statusCode 200 when for valid visa', function(done) {
    request(testData.goodRequestVisa, (err, res) =>{
      expect(err).to.not.exist
      expect(res.statusCode).to.equal(200)
      done()
    })
  });
 
  // describe('credit card integration', function () {
  //   it("should return 500 when master server is down", function () {
  //     this.masterServer.close()
  //     request(testData.goodRequestMaster, (err, res) =>{
  //       expect(err).to.not.exist
  //       expect(res.statusCode).to.equal(500)
  //       this.masterServer.start()
  //       done()
  //     })
  //   })

  //   it("should return 500 when visa server is down", function () {
  //     this.visaServer.close()
  //     request(testData.goodRequestVisa, (err, res) =>{
  //       expect(err).to.not.exist
  //       expect(res.statusCode).to.equal(500)
  //       this.visaServer.start()
  //       done()
  //     })
  //   })
    
  //   it("should return 200 and 'Card declined' message when mastercard is declined", function () {
  //     this.visaServer.setResponse({
  //       statusCode: 400,
  //       body: {
  //         decline_reason: "bla"
  //       }
  //     })
  //     request(testData.goodRequestMaster, (err, res) => {
  //       expect(err).to.not.exist
  //       expect(res.statusCode).to.equal(200)
  //       expect(res.body).to.equal({ error: 'Card declined' })
  //       // this.masterServer.start()
  //       done()
  //     })
  //   })

  //   it("should return 200 and 'Card declined' message when visa is declined", function () {
  //     this.visaServer.setResponse({
  //       statusCode: 200,
  //       body: {
  //         chargeResult: "Failure",
  //         resultReason: "bla"
  //       }
  //     })
  //     request(testData.goodRequestVisa, (err, res) => {
  //       expect(err).to.not.exist
  //       expect(res.statusCode).to.equal(200)
  //       expect(res.body).to.equal({ error: 'Card declined' })
  //       // this.masterServer.start()
  //       done()
  //     })
  //   })

  //   it("should return 200 with empty body for mastercard successful transaction", function () {
      
  //   })
    
  //   it("should return 200 with empty body for visa successful transaction", function () {
      
  //   })

  // });
});