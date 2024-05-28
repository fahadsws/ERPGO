const pool = require('../../DB/Database');
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function forgotpassword(req, res) {
    try {
      const { id, oldpassword, newpassword, confirmpassword } = req.body;
      const hashpassword = await bcrypt.hash(String(oldpassword), saltRounds);
      const newPasswordHash = await bcrypt.hash(String(newpassword), saltRounds);
  
      if (!oldpassword || !confirmpassword) {
        return res.status(400).json({ status: 400, message: 'Please Enter Old Password and New Password' });
      }
  
      if (newpassword !== confirmpassword) {
        return res.status(400).json({ status: 400, message: 'Confirm Password does not match New Password' });
      }
  
      pool.query(`SELECT * FROM users WHERE id = ?`, [id], async (err, result) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        
        if (await bcrypt.compare(oldpassword, result[0].password)) {
        }else{
          return res.status(400).json({ status: 400, message: 'Old Password is incorrect' });
        }
  
        pool.query(`UPDATE users SET password = ? WHERE id = ?`, [newPasswordHash, id], (error, finalResult) => {
          if (error) {
            console.error('Error executing SQL query:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
  
          return res.status(200).json({ status: 200, message: 'Password Changed Successfully' });
        });
      });
  
    } catch (error) {
      console.error('Error processing forgot password request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  module.exports = forgotpassword;
  
