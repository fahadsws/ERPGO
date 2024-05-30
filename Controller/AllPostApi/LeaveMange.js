const pool = require('../../DB/Database');
var nodemailer = require('nodemailer');

async function leavesumbit(req, res) {
    const {
        employee_id,
        leave_type_id,
        applied_on,
        start_date,
        end_date,
        total_leave_days,
        leave_reason,
        remark,
        created_by,
        responsebility
    } = req.body;


    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'swsapp11@gmail.com',
              pass: 'ibkp oicw oozj iqdb'
            }
          });
          
      
  
        if(!employee_id || !leave_reason ){
            return res.
            status(200).json({ status: 400, message: 'Please Field All Fields' });
        }


          
        pool.query(
            `INSERT INTO leaves (employee_id, leave_type_id, applied_on, start_date, end_date, total_leave_days, leave_reason, remark, created_by,status)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
            [
                employee_id,
                leave_type_id,
                applied_on,
                start_date,
                end_date,
                total_leave_days,
                leave_reason,
                remark[0].length === 0 ? null:`${remark}`,
                created_by,
                'pending'
            ],
            (err, result) => {
                if (err) {
                    console.error('Error executing SQL query:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                pool.query(`Select * from  employees where id = ?`,[employee_id],(error,results)=>{
                    if (error) {
                        console.error('Error executing SQL query:', err);
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }
                    const options = { day: "2-digit", month: "short", year: "numeric" };
                    const formattedStartDate = new Date(start_date).toUTCString("en-US", options).slice(4,17);
                    if (total_leave_days <= 1) {
                        var subject = remark[0].length === 0 ? `One day leave application for ${formattedStartDate} - ${results[0].name}` : `Hourly leave application on ${formattedStartDate} - ${results[0].name}`;
                        var text = remark[0].length === 0 ? `Respected HR Manager,
                    
                        I am writing this to inform you that I need to take a leave for ${formattedStartDate} because ${leave_reason}.
                        
                        You can contact me at [phone number] in case of any work-related emergencies.
                        
                        I will be thankful to you for considering my application.
                        
                        Thank You, 
                        
                        Date: ${new Date().toISOString()?.substring(0, 10)} 
                        Name: ${results[0].name}
                        Designation: 
                        Soham web Solution ` : `Respected HR Manager,
                    
                        I am writing this to inform you that I need to take an hourly leave on date ${formattedStartDate} from ${remark[0]} to ${remark[1]} because ${leave_reason}.
                        
                        You can contact me at [phone number] in case of any work-related emergencies.
                        
                        I will be thankful to you for considering my application.
                        
                        Thank You 
                        
                        Date: ${new Date().toISOString()?.substring(0, 10)} 
                        Name: ${results[0].name}
                        Designation: 
                        Soham web Solution `;
                    
                    } else {
                        var subject = remark[0].length === 0 ? `Leave request for ${total_leave_days} days from ${formattedStartDate} - ${results[0].name}` : `Hourly leave application on ${formattedStartDate} - ${results[0].name}`;
                        var text = remark[0].length === 0 ? `Respected HR Manager,
                    
                        I am writing to request your approval for a leave of absence for ${total_leave_days} Days from ${formattedStartDate} to ${end_date}. The reason for my leave is ${leave_reason}.
                        
                        I have completed all my pending tasks and handed over my responsibilities to ${responsebility ?responsebility:'No Buddy You can Contact Me'} who will cover for me during my absence. 
                        
                        You can contact me at [phone number] in case of any work-related emergencies. 
                        
                        I will be thankful to you for considering my application.
                        
                        Thank You, 
                        
                        Date: ${new Date().toISOString()?.substring(0, 10)} 
                        Name: ${results[0].name}
                        Designation: 
                        Soham web Solution` : `Respected HR Manager,
                    
                        I am writing this to inform you that I need to take an hourly leave on date ${start_date} from ${remark[0]} to ${remark[1]} because ${leave_reason}.
                        
                        You can contact me at [phone number] in case of any work-related emergencies.
                        
                        I will be thankful to you for considering my application.
                        
                        Thank You 
                        
                        Date: ${new Date().toISOString()?.substring(0, 10)} 
                        Name: ${results[0].name}
                        Designation: 
                        Soham web Solution `;
                    }
                    
                    var mailOptions = {
                        from: `"${results[0].email}" <fahadshaikh0401@gmail.com>`,
                        to: 'fahadsws1234@gmail.com',
                        subject: subject,
                        text: text
                    };
                    
                   
                    
                    
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        }else{
                            console.log('Email sent: ' + info);
                        }
                      });
                })
    
                return res.status(200).json({ status: 200, message: 'Leave Created Successfully' });
            }
        );
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = leavesumbit;
