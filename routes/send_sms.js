const accountSid = 'AC28b6a086a95aa3d81f7b0d2f45cef8d9';
const authToken = '4235ecb8db4c2bfaf50d1453cc27e84c';
const client = require('twilio')(accountSid, authToken);

var otp = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
client.messages
  .create({
     body: '\nyour OTP is '+otp,
     from: '+15053226608',
     to: '+6597152308'
   })
  .then(message => console.log(message)).catch(e => console.log(e));

