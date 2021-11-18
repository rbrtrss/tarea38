// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = require('twilio')(accountSid, authToken);

const sendSMS = (toPhone: string, msg: string) => {
  client.messages
    .create({
      body: msg,
      from: phoneNumber,
      to: toPhone,
    })
    .then((message: any) => console.log(message.sid));
};

export default sendSMS;
