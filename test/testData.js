module.exports = {
  goodRequestVisa: {
    method: 'Post',
    headers: {
      'merchant-identifier': 'revolve'
    },
    json: {
      fullName: 'example example',
      creditCardNumber: '4242424242424242',
      creditCardCompany: 'visa',
      expirationDate: '10/21',
      cvv: '121',
      amount: 22.2
    }, 
    url: 'http://127.0.0.1:8000/api/charge'
  },
  goodRequestMaster: {
    method: 'Post',
    headers: {
      'merchant-identifier': 'revolve'
    },
    json: {
      fullName: 'example example',
      creditCardNumber: '4242424242424242',
      creditCardCompany: 'mastercard',
      expirationDate: '10/21',
      cvv: '121',
      amount: 22.2
    }, 
    url: 'http://127.0.0.1:8000/api/charge'
  },
  cardNumberNotValid: {
    method: 'Post',
    headers: {
      'merchant-identifier': 'revolve'
    },
    json: {
      fullName: 'example example',
      creditCardNumber: '11111',
      creditCardCompany: 'mastercard',
      expirationDate: '10/21',
      cvv: '121',
      amount: 22.2
    }, 
    url: 'http://127.0.0.1:8000/api/charge'
  },
  missingMerchantIdentifier: {
    method: 'Post',
    headers: {},
    json: {
      fullName: 'example example',
      creditCardNumber: '4242424242424242',
      creditCardCompany: 'mastercard',
      expirationDate: '10/21',
      cvv: '121',
      amount: 22.2
    }, 
    url: 'http://127.0.0.1:8000/api/charge'
  },
  invalidPayload: {
    method: 'Post',
    headers: {
      'merchant-identifier': 'revolve'
    },
    json: {
      fullName: 'example example',
      creditCardNumber: '4242424242424242',
      creditCardCompany: 'mastercard',
      expirationDate: '10/21',
      cvv: '121',
      amount: '22.2'
    }, 
    url: 'http://127.0.0.1:8000/api/charge'
  },
  stringPayload: {
    method: 'Post',
    headers: {
      'merchant-identifier': 'revolve'
    },
    json: 'bla', 
    url: 'http://127.0.0.1:8000/api/charge'
  }
}
