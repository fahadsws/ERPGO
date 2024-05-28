var nodemailer = require('nodemailer');

async function forgotpass(req, res) {
    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'swsapp11@gmail.com',
              pass: 'ibkp oicw oozj iqdb'
            }
          });
          
          var mailOptions = {
            from: 'swsapp11@gmail.com',
            to: 'fahadsws1234@gmail.com',
            subject: 'Account Recovery Request',
            text: `Dear,

            I hope this email finds you well. I am reaching out to request assistance with recovering my account. Unfortunately, I seem to have forgotten my login credentials, and despite several attempts, I have been unable to regain access.
            
            Below are the details of my account:
            

            Email Address associated with the account: [Your Email Address]
            Any other relevant information: [Any additional information you can provide to verify your identity or account ownership]
            I kindly ask for your support in recovering my account so that I can resume utilizing your services efficiently. If there are any additional steps or information required from my end to facilitate the recovery process, please do not hesitate to let me know.
            
            Thank you very much for your attention to this matter. I look forward to hearing from you soon.
            
            Warm regards,
            `
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
                res.status(500).json({ message: 'Email Sent Succefuly for Acount Recovery' });
            }
          });
  
    } catch (error) {
      console.error('Error processing forgot password request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  module.exports = forgotpass;
  
