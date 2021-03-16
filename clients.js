const request = require("request") // didn't use axios because it throw 400 status codes...
const Promise = require("bluebird")

module.exports.visa = async function (identifier, body) {
  let result = await Promise.promisify(request.post)({
    url: "https://interview.riskxint.com/visa/api/chargeCard",
    json: {
      fullName: body.fullName,
      number: body.creditCardNumber,
      expiration: body.expirationDate,
      cvv: body.cvv,
      totalAmount: body.amount

    },
    headers: {
      identifier: identifier
    }
  })
  // Error: Something went wrong with visa. err: {"errors":"cvv is empty, cvv is not a number"}
  if(result.statusCode != 200) {
    throw new Error(`Something went wrong with visa. err: ${JSON.stringify(result.body)}`)
  }
  return result.body
}

module.exports.mastercard = async function (identifier, body) {
  let result = await Promise.promisify(request.post)({
    url: "https://interview.riskxint.com/visa/api/chargeCard",
    json: {
      first_name: body.fullName.split(" ")[0],
      last_name: body.fullName.split(" ").splice(1).join(" "),
      card_number: body.creditCardNumber,
      expiration: body.expirationDate.replace("/", "-"),
      cvv: body.cvv,
      charge_amount: body.amount

    },
    headers: {
      identifier: identifier
    }
  })
  if(result.statusCode == 400) {
    return {
      chargeResult: "Failure",
      resultReason: result.body.decline_reason
    }
  }
  if(result.statusCode != 200) {
    throw new Error(`Something went wrong with visa. err: ${JSON.stringify(result.body)}`)
  }
  return {
    chargeResult: "Success"
  }
}