
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
  
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});
  
const token = jwt.sign({
        data: 'Token Data'  
    }, 'ourSecretKey', { expiresIn: '10m' }  
);    
  
const mailConfigurations = {
  
    // It should be a string of sender/server email
    from: process.env.EMAIL_USERNAME,
  
    to: 'kazimhusaini12@gmail.com',
  
    // Subject of Email
    subject: 'Email Verification',
      
    // This would be the text of email body
    text: `Hi! There, You have recently visited 
           our website and entered your email.
           Please follow the given link to verify your email
           http://localhost:5000/verify/${token} 
           Thanks`
      
};
  
transporter.sendMail(mailConfigurations, function(error, info){
    if (error) throw Error(error);
    console.log('Email Sent Successfully');
    console.log(info);
});