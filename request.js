const http = require('http');
const request = require('request');

http.get('http://localhost:5050/is_alive', (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log('result', data);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

request.post(
  'http://localhost:5050/mint',
  { json: { 
    "address": "0x04a79245c3b9bcb05af5c00a87b3608ad049100c523d308f7db4db35ac9663fb",
    "amount": 50000000000000000
   } },
  function (error, response, body) {
      if (!error && response.statusCode == 200) {
          console.log(body);
      }
  }
);