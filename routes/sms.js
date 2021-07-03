const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken)

client.verify.services('VAa6c3fba0191984b5aabd4fe667886213')
    .verifications
    .create({to:'+6585225580', channel: 'sms'})
    .then(verification => console.log(verification.sid));
