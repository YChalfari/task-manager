const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "appleseeds@appleseeds.net",
    subject: "Thanks for joining",
    text: `Welcome to our app, ${name}!`,
  });
};
const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "appleseeds@appleseeds.net",
    subject: "Sorry to see you go",
    text: `Goodbye, ${name}. Hope to see you back soon!`,
  });
};

module.exports = { sendWelcomeEmail, sendCancellationEmail };
