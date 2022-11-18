const http = require('http');
console.log("REQUEST________________")
http.get('http://devnet.container:5050/is_alive', (resp) => {
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