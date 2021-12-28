const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

  // Instantiate the SMTP server
  module.exports = sendmail = async (email, fullname, subject, message) => {

  // Create reusable transporter object using the default SMTP transport
  const smtpConfig = {
    host : 'smtp.gmail.com',
    port : 465,
    secure : true,
    auth: {
      user: process.env.MY_USERNAME,
      pass: process.env.MY_PASSWORD 
    },
  }

  let transporter = nodemailer.createTransport(smtpConfig);

  // Mail Options
  let mailOptions = {
    from: `${email}`, // sender address
    to: 'easyb606@gmail.com', // list of receivers
    subject: `${subject} request from: ${fullname}`, // Subject line
    text: `${message}`, // plain text body
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
    console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = sendInvitation = async(email, fullname) => {

  const smtpConfig = {
    host : 'smtp.gmail.com',
    port : 465,
    secure : true,
    auth: {
      user: process.env.MY_USERNAME,
      pass: process.env.MY_PASSWORD 
    },
  }

  let transporter = nodemailer.createTransport(smtpConfig);

  // Mail Options
  let mailOptions = {
    from: process.env.MY_PASSWORD, // sender address
    to: `${email}`, // list of receivers
    subject: `Invite request from: ${fullname}`, // Subject line
    html: `
    <h1>Easy Bank Invitation</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultrices ipsum est, in congue nisi pellentesque et. Sed venenatis metus dolor, vel aliquet purus mattis ut. Donec eget interdum elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
    <p>Morbi massa magna, malesuada a tellus eget, tincidunt rhoncus elit. Mauris aliquam mi sit amet neque suscipit commodo. Donec placerat ornare orci vitae finibus.</p>
    <p><a href="#">https://easybank.com/request&invitation/?id=098712345</a></p>
    `, // plain text body
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
    console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

