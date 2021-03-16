// var express = require('express');
// const http = require('http');


// module.exports.MockServer = class {
//   constructor(port) {
//     this.port = port;
//     this.app = express();
//     this.app.use(express.json());
//     this.app.post(/.*/, async (req, res, next) => {
//       if (this.response) {
//         res.status(this.response.statusCode).send(this.response.body)
//       }
//       else {
//         res.status(200).send()
//       }
//       if (this.requestTest) {
//         this.requestTest(req)
//       }
//       next()
//     });
//   }

//   start() {
//     this.server = http.createServer(this.app);
//     this.server.listen(this.port)
//   }

//   close() {
//     this.server.close()
//   }

//   setResponse(response) {
//     this.response = response
//   }
//   assertRequest(requestTest) {
//     this.requestTest = requestTest
//   }
// }